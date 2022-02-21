import React from 'react';
import {Stack, Link } from "@fluentui/react";

const VisualizeTab: React.FC = () => {
    return (
        <>
            <Stack horizontal horizontalAlign={"space-between"} verticalAlign={"center"}>
                <h2>Reports</h2>
                <Link href={"https://msit.powerbi.com/groups/me/reports/015a962a-5c80-4bf6-8c3f-04cc42c96bae/ReportSection"} target={"_blank"}>Open in Power BI</Link>
            </Stack>

            { <iframe
                title="ta4h - Page 1"
                width="1140"
                height="541.25"
                src="https://msit.powerbi.com/reportEmbed?reportId=015a962a-5c80-4bf6-8c3f-04cc42c96bae&autoAuth=true&ctid=72f988bf-86f1-41af-91ab-2d7cd011db47&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9kZi1tc2l0LXNjdXMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D"
                frameBorder="0"
                allowFullScreen>
            </iframe> }
        </>
    );
};

export default VisualizeTab;
