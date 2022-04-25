# Health-AI-Blueprints-TA4HVisualizer

## Goal
Utilize the Visualizer tool to extract insights from unstructured medical text. Healthcare providers can use it to answer the following questions:

* Patients diagnosed with X are typically treated with Y
* The top 5 symptoms our doctors treat with medication X
* What percentage of women are diagnosed with X, Y and have symptoms Z or W?
* The three most common pathways for patients diagnosed with X 3 months before being treated by Y
* What are the most common examinations and what are their medical codes?
 <br>


### Dashboard:
![Sample Dashboard](https://github.com/microsoft/Health-AI-Blueprints-TA4HVisualizer/blob/main/img11.png)

### High Level Architecture:
![Architecture](https://github.com/microsoft/Health-AI-Blueprints-TA4HVisualizer/blob/main/img12.png)

## Deployment

### Steps at high level: 

**1. Deploy "Green path" pipeline(step 1):**<br>
[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fpazinio%2FHealth-AI-Blueprints-TA4HVisualizer%2Fmain%2Fazuredeploy.json)
<br>To deploy the Azure Web App, Azure Storage Account, Azure Text Analytics for Health, Azure Health Dat Services and Azure Function App, use the button below to deploy through the Azure Portal. <br>

**2. "Green path" pipeline(step 2): Azure Function deployment to import JSON files to your FHIR Server**:<br>
https://github.com/microsoft/healthcare-apis-samples/tree/main/src/FhirImporter

**3. Adding Azure Synapse (optional): Azure Function deployment to move FHIR data to Azure Data-Lake to perform analytics and ML**:<br>
https://github.com/microsoft/FHIR-Analytics-Pipelines/blob/main/FhirToDataLake/docs/Deployment.md

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
