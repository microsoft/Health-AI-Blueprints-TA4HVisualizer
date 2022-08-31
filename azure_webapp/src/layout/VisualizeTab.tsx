import React from 'react';
import {Stack, Link } from "@fluentui/react";

const VisualizeTab: React.FC = () => {
    return (
        <>
            <Stack horizontal horizontalAlign={"space-between"} verticalAlign={"center"}>
                <h2>Reportss</h2>
                <Link href={process.env.REPORT_URL_POWERBI} target={"_blank"}>Open in Power BI</Link>
            </Stack>

            {
            <iframe title="Clinical Insights_FHIR" width="1140" height="541.25"
                        src=process.env.REPORT_URL
                        frameBorder="0" allowFullScreen></iframe>
            }
        </>
    );
};

export default VisualizeTab;
