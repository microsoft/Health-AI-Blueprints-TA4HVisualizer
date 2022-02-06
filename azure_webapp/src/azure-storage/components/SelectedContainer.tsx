import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { tap } from 'rxjs/operators';
import { SharedViewStateContext, UploadsViewStateContext } from '../contexts/viewStateContext';
import { CommandBar, Stack } from "@fluentui/react";

const SelectedContainer: React.FC<React.HTMLProps<HTMLDivElement>> = ({
                                                                          children,
                                                                          ...rest
                                                                      }) => {
    const context = useContext(SharedViewStateContext);
    const uploadsViewStateContext = useContext(UploadsViewStateContext);
    const [containerName, setContainerName] = useState<string>();

    const setSelectedContainer = () => {
        const sub = context.selectedContainer$
            .pipe(tap(name => setContainerName(name)))
            .subscribe();

        return () => sub.unsubscribe();
    };
    useEffect(() => {
        context.getContainerItems("medical-texts-input");
        setSelectedContainer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const inputFileRef = useRef<HTMLInputElement>(null);

    const uploadDocuments = useCallback(() => {
        inputFileRef.current?.click();
    }, []);
    const uploadFiles = (files: FileList | null) =>
        files && uploadsViewStateContext.uploadItems(files);

    return containerName ? (
        <Stack>
            <input
                style={{ display: 'none', height: 0 }}
                ref={inputFileRef}
                type="file"
                multiple={true}
                onChange={e => uploadFiles(e.target.files)}
            />
            <Stack horizontal horizontalAlign={"space-between"}>
                <h3>Container Files</h3>
                <CommandBar styles={{root: {width: "100%", margin: 0}}} items={[]}
                            farItems={[
                                {
                                    key: 'newItem',
                                    text: 'Upload documents',
                                    onClick: uploadDocuments

                                },
                            ]}
                />
            </Stack>
            {children}
        </Stack>
) : (
        <></>
    );
};

export default SelectedContainer;
