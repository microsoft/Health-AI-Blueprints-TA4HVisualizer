import { AzureFunction, Context } from "@azure/functions";
import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";


const blobTrigger: AzureFunction = async function (context: Context, myBlob: any): Promise<void> {
    
    context.log("Blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", myBlob.length, "Bytes");

    // You will need to set these environment variables or edit the following values
    const endpoint = process.env.taEndpoint;
    const apiKey = process.env.taApiKey;
    const algVersion = 0.1;
    
    const documents = myBlob.toString().match(/(.{1,5120})/gs);

    async function callTextAnalytics() {
        context.log("== Recognize Healthcare Entities Sample ==");

        const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

        const poller = await client.beginAnalyzeHealthcareEntities(documents, "en", {
            includeStatistics: true
        });

        poller.onProgress(() => {
            context.log(
            `Last time the operation was updated was on: ${poller.getOperationState().lastModifiedOn}`
            );
        });
        context.log(
            `The analyze healthcare entities operation was created on ${
            poller.getOperationState().createdOn
            }`
        );
        context.log(
            `The analyze healthcare entities operation results will expire on ${
            poller.getOperationState().expiresOn
            }`
        );

        const results: any = await poller.pollUntilDone();
        let consolidatedOutput = {
            "entities" : []
        };

        for await (const result of results) {
           // context.log(result);
            for (const entity of result.entities) {
                consolidatedOutput.entities.push(entity);
            }
        }
        return consolidatedOutput;
        
    }

    function trimDataSources(dataSources: any){
        let trimmedDataSources = [];
        dataSources.forEach(ds => {
            if (ds.name === "UMLS"){
                trimmedDataSources.push(ds);
            }
        });
        return trimmedDataSources;
    }

    function mapAndClean(entity: any){
        const tempEntity = {
            text: entity.text,
            category: entity.category,
            confidenceScore: entity.confidenceScore,
            name: '',
            codes: []
        };

        if (entity.normalizedText){
            tempEntity.name = entity.normalizedText;
        }

        if (entity.dataSources){
            tempEntity.codes = [];
            entity.dataSources.forEach((ds: any) => {
                tempEntity.codes.push({"coding_system":ds.name, "code": ds.entityId})
            });
        }

        return tempEntity;
    }
    
    const textAnalyticsResponse: any = await callTextAnalytics().catch((err) => {
        context.log("The sample encountered an error:", err);
    });

    let responseMessage : any = {
        output_id: context.bindingData.blobTrigger,
        output_date: new Date().toJSON().slice(0,19).replace('T',':'),
        output_alg_version: algVersion,
        patient: {
            dob: "19410830",
            gender: null
        },
        event_date: "20151113"
    }

    let categorisedOutput = {
        'symptoms': [],
        'diagnoses': [],
        'examinations': [],
        'treatments': [],
        'medications': [],
    }

    textAnalyticsResponse.entities.forEach(entity => {
        // remove unused terminologies if present
        if (entity.dataSources){
            entity.dataSources = trimDataSources(entity.dataSources);
        }
        // map and clean
        entity = mapAndClean(entity);
        
        // remove entity length as it is not needed
        delete entity.length;
        
        // categorise entities found in lab report into categorisedOutput object
        if (entity.assertion){
            // deal with negative cases
        } else if (entity.category === "Gender"){
            if (entity.codes[0].code === "C0043210") {
                responseMessage.patient.gender = "F";
            } else {
                responseMessage.patient.gender = "M";
            }
        } else if (entity.category === "ExaminationName"){
            categorisedOutput.examinations.push(entity);
        } else if (entity.category === "Diagnosis"){
            categorisedOutput.diagnoses.push(entity);
        } else if (entity.category === "SymptomOrSign"){
            categorisedOutput.symptoms.push(entity);
        } else if (entity.category === "TreatmentName"){
            categorisedOutput.treatments.push(entity);
        } else if (entity.category === "MedicationClass" || entity.category === "MedicationName"){
            categorisedOutput.medications.push(entity);
        }
    });
    
    // sort entities by confidence score
    Object.keys(categorisedOutput).forEach((key) =>{
        if (categorisedOutput[key].length > 0){
            categorisedOutput[key].sort(function (x, y) {
                return y.confidenceScore - x.confidenceScore;
            });
        }
    });

    responseMessage.symptoms = categorisedOutput.symptoms;
    responseMessage.diagnoses = categorisedOutput.diagnoses;
    responseMessage.examinations = categorisedOutput.examinations;
    responseMessage.treatments = categorisedOutput.treatments;
    responseMessage.medications = categorisedOutput.medications;

    context.bindings.outputBlob = JSON.stringify(responseMessage, null, 4);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
};



export default blobTrigger;
