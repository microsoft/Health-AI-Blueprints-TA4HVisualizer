import { Connection, Request } from "tedious";

module.exports = async function (context, myBlob) {
    context.log("JavaScript blob trigger function processed blob \n Blob:", context.bindingData.blobTrigger, "\n Blob Size:", myBlob.length, "Bytes");
    const sql = getSQL(context, myBlob);
    if (sql) {
        try {
            await executeSQL(sql);
        } catch (err) {
            context.log.error(err);
        }
    }

    context.log('Functions.BlobTriggerTA4HJsonToSql FINISHED')
    context.done();
};

function getSQL(context, myBlob) {
    let myBlobObj = '';
    try {
        myBlobObj = JSON.parse(myBlob.toString());
    }
    catch (e) {
        context.log(myBlob + " ignored. illegal json:" + e.message)
        return '';
    }

    if (!myBlobObj['output_id']) {
        context.log(myBlob + " ignored. illegal schema: output_id is missing");
        return '';
    }
    const output_id = myBlobObj['output_id'].hashCode();

    const tables = ['examinations', 'medications', 'symptoms', 'diagnoses', 'treatments'];
    const sqlCommand = tables
            .map(t => addAttributes(myBlobObj, t, output_id))
            .concat(addReports(myBlobObj, output_id))
            .join(';')

    if (sqlCommand.length <= 4) return '';
    // context.log(sqlCommand);
    return sqlCommand;
}
       

function addReports(myBlobObj, output_id) {
    return `INSERT INTO [dbo].reports VALUES (${output_id}, ${parsePotentiallyGroupedFloat(myBlobObj.output_date)}, ${myBlobObj.output_alg_version}, ${myBlobObj.patient?.dob || 0 }, '${myBlobObj.patient?.gender || 'U' }', ${parsePotentiallyGroupedFloat(myBlobObj.event_date)}, '${myBlobObj.output_id}')`
}

function addAttributes(myBlobObj, attribute, output_id) {
    if (!myBlobObj[attribute]) return '';         
    const arr = myBlobObj[attribute]; 
    let res = '';
    
    for (let i = 0; i < arr.length; i++) {
        let text = (arr[i].text || '').replace(/[^a-zA-Z ]/g, ""); 
        let name = (arr[i].name || '').replace(/[^a-zA-Z ]/g, ""); 
        let confidence_score = parseInt(arr[i].confidence_score || arr[i].confidenceScore || 0).toFixed(3) || 0; 
        let inner = `${output_id}, '${text}', '${name}', ${confidence_score}`;
        res += `(${inner}),`;
    }

    if (arr.length == 0) return '';	
    return `INSERT INTO [dbo].${attribute} VALUES ${res.slice(0, -1)}`;
}

const config = {
    authentication: {
        options: {
            userName: process.env.sql_username, 
            password: process.env.sql_password 
        },
        type: "default"
    },
    server: process.env.sql_server, 
    options: {
        database: process.env.sql_dbname, 
        encrypt: true
    }
};

// helper methods
function parsePotentiallyGroupedFloat(stringValue) {
    stringValue = stringValue.trim();
    let result = stringValue.replace(/[^0-9]/g, '');
     if (/[,\.]\d{2}$/.test(stringValue)) {
       result = result.replace(/(\d{2})$/, '.$1');
     }
     return parseFloat(result.substring(0, 8));
}

String.prototype['hashCode'] = function() {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
  

const executeSQL = sql => new Promise((resolve, reject) => {     
    // Create connection to database
    const connection = new Connection(config);
    const request = new Request(sql, (err) => {
        if (err) {
            reject(err);
        } else {
            resolve("[]");
        }       
    });    

    connection.on('connect', (err) => {
        if (err) {
            reject(err);
        }
        else {
            connection.execSql(request);
        }
    });   

    connection.connect();    
});
