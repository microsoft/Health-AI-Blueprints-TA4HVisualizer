import React from 'react';
import SelectedContainer from "../azure-storage/components/SelectedContainer";
import ItemsList from "../azure-storage/components/ItemsList";
import ItemsUploaded from "../azure-storage/components/ItemsUploaded";
import ItemsDownloaded from "../azure-storage/components/ItemsDownloaded";
import ItemsDeleted from "../azure-storage/components/ItemsDeleted";
import { ScrollablePane } from "@fluentui/react";

const UploadTab: React.FC = () => {
    return (
        <>
            <h2>Upload medical documents</h2>
            <SelectedContainer className="container">
                <div style={{
                    height: "40vh",
                    position: 'relative',
                }}>
                    <ScrollablePane>

                        <ItemsList/>
                    </ScrollablePane>
                </div>

                <div className="item-details">
                    <ItemsUploaded/>
                    <ItemsDownloaded/>
                    <ItemsDeleted/>
                </div>
            </SelectedContainer>
        </>


    );
};

export default UploadTab;
