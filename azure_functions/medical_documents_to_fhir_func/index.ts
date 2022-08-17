import { AzureFunction, Context } from "@azure/functions";
const axios = require('axios').default;


function delay(milliseconds : number) {
    return new Promise(resolve => setTimeout( resolve, milliseconds));
}

const blobTrigger: AzureFunction = async function (context: Context, myBlob: any): Promise<void> {
    context.log("Blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", myBlob.length, "Bytes");


    const documentsArr: [string] = myBlob.toString().match(/(.{1,5120})/gs);
    const documents = documentsArr.map((d: string, index) => ({
        text: d,
        id: index+1,
        language: "en",
        isLanguageDefaulted: true,
        isLanguageFinalized: false,
        isAutoLanguageDetectionEnabled: false
    }));

    const structuringEndpoint = 'https://' + process.env.TA_FHIR_STRUCTURING_RESOURCE_NAME + '.cognitiveservices.azure.com/language/analyze-text/jobs';
    const config = {
        headers: {
            'content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': process.env.TA_API_KEY,
            'apim-subscription-id': 'abc'
        },
        params: {
            'api-version': process.env.TA_API_VERSION
        }
    };
    // const data = {body: { documents: documents }};

    var fhirDoc;
    const data = {
        "tasks": [
            {
                "kind": "Healthcare",
                "parameters": {
                    "modelVersion": "latest",
                    "fhirVersion": process.env.TA_FHIR_API_VERSION
                }
            }
        ],
        "analysisInput": {
            "documents": documents
        }
    };

    try {
        console.log( "sending structuring request");
        const resp = await axios.post(structuringEndpoint, data, config);
        context.log(resp);
        let getUrlRaw = resp.headers['operation-location'];
        let getUrl = getUrlRaw.split("?",2)[0];
        console.log( "getUrl=" + getUrl);
        console.log( "getUrlRaw=" + getUrlRaw);

        var respGet;
        let i: number = 0;
        while (i < 10) {
            console.log( "trying to fetch structuring result. try:  " + i )
            respGet = await axios.get(getUrl, config);
            if (respGet.data.tasks.completed == '1')
                break;
            console.log( "structuring not completed");
            console.log( "respGet.data.tasks.completed =" + respGet.data.tasks.completed );
            await delay(500);

            i++;
        }
        if (i == 10) {
            console.log("structuring failed");
        }
        else {
            console.log("structuring succeeded");
            let text = respGet.data.tasks.items[0].results.documents[0].fhirBundle;
            let temp = JSON.stringify(text);
            fhirDoc = JSON.parse(temp);
            // fhirDocs = respGet.data.tasks.items[0].results.documents.map(d => JSON.parse(d.fhirBundle));
        }
    }
    catch (err) {
        context.log(err);
        throw err;
    }

    context.log(fhirDoc);

    if (fhirDoc == null) {
        context.done();
        return;
    }

    context.bindings.outputBlob = JSON.stringify(fhirDoc, null, 4);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: fhirDoc
    };

}

export default blobTrigger;
