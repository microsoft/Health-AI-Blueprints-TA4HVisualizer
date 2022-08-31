import React from 'react';
import {Stack, Link } from "@fluentui/react";

const VisualizeTab: React.FC = () => {
    return (
        <>
            <Stack horizontal horizontalAlign={"space-between"} verticalAlign={"center"}>
                <h2>Reports</h2>
                <Link href={"https://msit.powerbi.com/links/kOk-vQai7G?ctid=72f988bf-86f1-41af-91ab-2d7cd011db47&pbi_source=linkShare"} target={"_blank"}>Open in Power BI</Link>
            </Stack>

            {
            <iframe title="Clinical Insights_FHIR" width="1140" height="541.25"
                        src="https://msit.powerbi.com/reportEmbed?reportId=81d3ba53-2dad-4072-9ad2-8a0a47e43be6&autoAuth=true&ctid=72f988bf-86f1-41af-91ab-2d7cd011db47"
                        frameBorder="0" allowFullScreen></iframe>
            }
        </>
    );
};

export default VisualizeTab;
