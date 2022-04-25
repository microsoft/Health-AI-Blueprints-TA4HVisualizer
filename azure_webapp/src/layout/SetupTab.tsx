import React from 'react';
import { Text, Link } from "@fluentui/react";

const SetupTab: React.FC = () => {
    return (
        <>
            <h2>Setup your Power BI reports</h2>
            <ol>
                <li>
                    <Text>Get started with a pre-built dashboard to your FHIR server by downloading the following <Link
                        href="https://github.com/microsoft/Health-AI-Blueprints-TA4HVisualizer/raw/main/powerbi/ta4h.pbix"
                        target={"_blank"}>PBIX file</Link> </Text>
                </li>
                <li>
                    <Text>Edit and adjust it according to your requirements, update FHIR Server connection settings and publish it using Power BI desktop</Text>
                </li>
                <li>
                    <Text>Edit VisualizeTab.tsx file to embed your Power BI reports within the Visualizer App</Text>
                </li>
                <li>
                    <Text>please note: Power BI Premium License is required to embed reports within Azure Web Apps</Text>
                </li>
            </ol>
        </>
    );
};

export default SetupTab;
