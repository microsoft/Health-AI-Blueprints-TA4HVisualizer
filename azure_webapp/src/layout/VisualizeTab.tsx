import React from 'react';
import {Stack, Link } from "@fluentui/react";

const VisualizeTab: React.FC = () => {
    return (
        <>
            <Stack horizontal horizontalAlign={"space-between"} verticalAlign={"center"}>
                <h2>Reports</h2>
                <Link href={"https://msit.powerbi.com/links/DzcgqNwbcN?ctid=72f988bf-86f1-41af-91ab-2d7cd011db47&pbi_source=linkShare"} target={"_blank"}>Open in Power BI</Link>
            </Stack>

            {
            <iframe title="Clinical Insights_FHIR" width="1140" height="541.25"
                        src="https://msit.powerbi.com/reportEmbed?reportId=165d7372-6d74-47e3-8907-258ecd39a000&autoAuth=true&ctid=72f988bf-86f1-41af-91ab-2d7cd011db47&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9kZi1tc2l0LXNjdXMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D"
                        frameBorder="0" allowFullScreen></iframe>
            }
        </>
    );
};

export default VisualizeTab;
