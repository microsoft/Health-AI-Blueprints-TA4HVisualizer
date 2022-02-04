import React from 'react';
import { Text, Link } from "@fluentui/react";

const SetupTab: React.FC = () => {
    return (
        <>
            <h2>Any content 2</h2>
            <ol>
                <li>
                    <Text>Import the following <Link
                        href="https://github.com/pazinio/Health-AI-Blueprints-TA4HVisualizer/tree/main/powerbi/"
                        target={"_blank"}>PBIX file</Link></Text>
                </li>
                <li>
                    <Text>Choose embed or premium</Text>
                </li>
                <li>
                    <Text>Change SQL connection settings</Text>
                </li>
            </ol>
        </>
    );
};

export default SetupTab;
