import React from 'react';
import { Pivot, PivotItem } from "@fluentui/react";
import SetupTab from "./SetupTab";
import UploadTab from "./UploadTab";
import VisualizeTab from "./VisualizeTab";

const Body: React.FC = () => {
    return (
            <Pivot aria-label="Basic Pivot Example" style={{padding: "10px 10% "}}>
                <PivotItem
                    headerText="Setup"
                    headerButtonProps={{
                        'data-order': 1,
                        'data-title': 'Setup',
                    }}
                >
                    <SetupTab/>
                </PivotItem>
                <PivotItem headerText="Upload">
                    <UploadTab/>
                </PivotItem>
                <PivotItem headerText="Visualize">
                    <VisualizeTab/>
                </PivotItem>
            </Pivot>
    );
};

export default Body;
