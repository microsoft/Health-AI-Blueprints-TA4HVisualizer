# Health-AI-Blueprints-TA4HVisualizer

## Goal
Utilize the Visualizer tool to extract insights from unstructured medical text. Healthcare providers can use it to answer the following questions:

* Patients diagnosed with X are typically treated with Y
* The top 5 symptoms our doctors treat with medication X
* What percentage of women are diagnosed with X, Y and have symptoms Z or W?
* The three most common pathways for patients diagnosed with X 3 months before being treated by Y
* What are the most common examinations and what are their medical codes?
 <br>


## Dashboard
![Sample Dashboard](https://github.com/microsoft/Health-AI-Blueprints-TA4HVisualizer/blob/main/img11.png)

## High Level Architecture
![Architecture](https://github.com/microsoft/Health-AI-Blueprints-TA4HVisualizer/blob/main/img12.png)

## Deployment

### Steps at high level:
***1. Deploy "Green path" pipeline (step 1):***<br>
[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fmicrosoft%2FHealth-AI-Blueprints-TA4HVisualizer%2Fmain%2Fazuredeploy.json)
<br>(Deploys required Azure Resources: Web App, Storage Account, Function App, Text Analytics for Health and Health Data Services)<br>

***2. Complete "Green path" pipeline (step 2)***:<br>
<br>
**Before running Armed Template:**<br>
a. Go to "Azure Active Directory"<br>
b. Click App registrations<br>
c. Create new registration<br>
d. Create new secret and copy its value<br>
e. Add "Fhir Contributor" Role for created "App regestration" in "ta4h Fhir Service" resource<br>
<br>
**Run Armed Template:**<br>
[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fmicrosoft%2Fhealthcare-apis-samples%2Fblob%2Fmain%2Fsrc%2Ftemplates%2Fimporter.json)
That will open https://github.com/microsoft/healthcare-apis-samples/blob/main/src/templates/importer.json taken from open source 
https://github.com/microsoft/healthcare-apis-samples/tree/main/src/FhirImporter
<br>

**After running Armed Template:**<br>
a. Go to new created function.<br>
b. Open configuration<br>
c. Change value of AzureWebJobsStorage to a connection string taken from storage "fhirstorageXXX"<br>
d. Press Save and wait for approval<br>
<br>
***3. "Yellow path" pipeline (optional)***:<br>
https://github.com/microsoft/FHIR-Analytics-Pipelines/blob/main/FhirToDataLake/docs/Deployment.md
<br>
(Moves FHIR server data to Azure Data-Lake to perform analytics and ML)
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
