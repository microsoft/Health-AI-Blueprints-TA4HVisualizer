"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const ai_text_analytics_1 = require("@azure/ai-text-analytics");
const blobTrigger = function (context, myBlob) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log("Blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", myBlob.length, "Bytes");
        // You will need to set these environment variables or edit the following values
        const endpoint = process.env.TA_ENDPOINT;
        const apiKey = process.env.TA_API_KEY;
        const algVersion = 0.1;
        const documents = myBlob.toString().match(/(.{1,5120})/gs);
        function callTextAnalytics() {
            var e_1, _a;
            return __awaiter(this, void 0, void 0, function* () {
                context.log("== Recognize Healthcare Entities Sample ==");
                const client = new ai_text_analytics_1.TextAnalyticsClient(endpoint, new ai_text_analytics_1.AzureKeyCredential(apiKey));
                const poller = yield client.beginAnalyzeHealthcareEntities(documents, "en", {
                    includeStatistics: true
                });
                poller.onProgress(() => {
                    context.log(`Last time the operation was updated was on: ${poller.getOperationState().lastModifiedOn}`);
                });
                context.log(`The analyze healthcare entities operation was created on ${poller.getOperationState().createdOn}`);
                context.log(`The analyze healthcare entities operation results will expire on ${poller.getOperationState().expiresOn}`);
                const results = yield poller.pollUntilDone();
                let consolidatedOutput = {
                    "entities": []
                };
                try {
                    for (var results_1 = __asyncValues(results), results_1_1; results_1_1 = yield results_1.next(), !results_1_1.done;) {
                        const result = results_1_1.value;
                        // context.log(result);
                        for (const entity of result.entities) {
                            consolidatedOutput.entities.push(entity);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (results_1_1 && !results_1_1.done && (_a = results_1.return)) yield _a.call(results_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return consolidatedOutput;
            });
        }
        function trimDataSources(dataSources) {
            let trimmedDataSources = [];
            dataSources.forEach(ds => {
                if (ds.name === "UMLS") {
                    trimmedDataSources.push(ds);
                }
            });
            return trimmedDataSources;
        }
        function mapAndClean(entity) {
            const tempEntity = {
                text: entity.text,
                category: entity.category,
                confidenceScore: entity.confidenceScore,
                name: '',
                assertion: entity.assertion,
                codes: []
            };
            if (entity.normalizedText) {
                tempEntity.name = entity.normalizedText;
            }
            if (entity.dataSources) {
                tempEntity.codes = [];
                entity.dataSources.forEach((ds) => {
                    tempEntity.codes.push({ "coding_system": ds.name, "code": ds.entityId });
                });
            }
            return tempEntity;
        }
        const textAnalyticsResponse = yield callTextAnalytics().catch((err) => {
            context.log("The sample encountered an error:", err);
        });
        let responseMessage = {
            output_id: context.bindingData.blobTrigger,
            output_date: new Date().toJSON().slice(0, 19).replace('T', ':'),
            output_alg_version: algVersion,
            patient: {
                dob: "19410830",
                gender: null
            },
            event_date: "20151113"
        };
        let categorisedOutput = {
            'symptoms': [],
            'diagnoses': [],
            'examinations': [],
            'treatments': [],
            'medications': [],
        };
        textAnalyticsResponse.entities.forEach(entity => {
            // remove unused terminologies if present
            if (entity.dataSources) {
                entity.dataSources = trimDataSources(entity.dataSources);
            }
            // map and clean
            entity = mapAndClean(entity);
            // remove entity length as it is not needed
            delete entity.length;
            // categorise entities found in lab report into categorisedOutput object
            if (entity.assertion && entity.assertion.certainty) {
                entity.certainty = entity.assertion.certainty;
            }
            if (entity.codes && entity.codes[0] && entity.codes[0].coding_system === 'UMLS') {
                entity.umls = entity.codes[0].code;
            }
            else if (entity.category === "Gender") {
                if (entity.codes[0].code === "C0043210") {
                    responseMessage.patient.gender = "F";
                }
                else {
                    responseMessage.patient.gender = "M";
                }
            }
            else if (entity.category === "ExaminationName") {
                categorisedOutput.examinations.push(entity);
            }
            else if (entity.category === "Diagnosis") {
                categorisedOutput.diagnoses.push(entity);
            }
            else if (entity.category === "SymptomOrSign") {
                categorisedOutput.symptoms.push(entity);
            }
            else if (entity.category === "TreatmentName") {
                categorisedOutput.treatments.push(entity);
            }
            else if (entity.category === "MedicationClass" || entity.category === "MedicationName") {
                categorisedOutput.medications.push(entity);
            }
        });
        // sort entities by confidence score
        Object.keys(categorisedOutput).forEach((key) => {
            if (categorisedOutput[key].length > 0) {
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
    });
};
exports.default = blobTrigger;
//# sourceMappingURL=index.js.map