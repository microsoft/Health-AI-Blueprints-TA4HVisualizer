import { AzureFunction, Context } from "@azure/functions";
const axios = require('axios').default;


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

    const endpoint = process.env.TA_FHIR_STRUCTURING_ENDPOINT;
    const config = { headers: { 'Content-Type': 'application/json' }};

    try {
        const data = {body: { documents: documents }};
        const resp = await axios.post(endpoint, data, config);
        context.log(resp);
        context.log(JSON.parse(resp));
    }
    catch (err) {
        context.log(err);
    }
}

export default blobTrigger;
