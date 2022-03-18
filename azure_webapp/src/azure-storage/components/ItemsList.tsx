import { BlobItem } from '@azure/storage-blob';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import {
    DeletesViewStateContext,
    DownloadsViewStateContext,
    SharedViewStateContext
} from '../contexts/viewStateContext';
import { Icon, DefaultButton, DetailsList, SelectionMode, Stack, Text } from "@fluentui/react";
import moment from "moment";

const ItemsList: React.FC = () => {
    const sharedContext = useContext(SharedViewStateContext);
    const downloadsContext = useContext(DownloadsViewStateContext);
    const deletesContext = useContext(DeletesViewStateContext);
    const [items, setItems] = useState<BlobItem[]>([]);

    const getContentLengthString = (length: number) => {
        if (length < 1024) {
            return `${length} bytes`;
        } else if (length < (1024 * 1024)) {
            return `${round(length / 1024)} KBs`
        } else if (length < (1024 * 1024 * 1024)) {
            return `${round(length / (1024 * 1024 * 1024))} MBs`
        } else if (length < (1024 * 1024 * 1024 * 1024)) {
            return `${round(length / (1024 * 1024 * 1024 * 1024))} GBs`
        }
    }

    // @ts-ignore
    const round = (x:number) => Math.round(x);

    const downloadDocument = useCallback( async (name: string) => {
        downloadsContext.downloadItem(name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const deleteDocument = useCallback( async (name: string) => {
        deletesContext.deleteItem(name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getContainerItemsEffect = () => {
        const sub = sharedContext.itemsInContainer$
            .pipe(tap(items => setItems(items)))
            .subscribe();

        return () => sub.unsubscribe();
    };
    useEffect(getContainerItemsEffect, []);

    return (
        <>
            <DetailsList
                items={items ?? []}
                setKey="set"
                selectionMode={SelectionMode.none}
                columns={[
                    {
                        key: "name",
                        name: "Name",
                        fieldName: "name",
                        minWidth: 100
                    },
                    {
                        key: "lastModified",
                        name: "Last modified",
                        onRender: (item: BlobItem) =>
                            <Text>{moment(item.properties.lastModified.toISOString()).calendar()}</Text>,
                        minWidth: 200
                    },
                    {
                        key: "contentLength",
                        name: "Length",
                        onRender: (item: BlobItem) =>
                            <Text>{getContentLengthString(item.properties?.contentLength ?? 0)}</Text>,
                        minWidth: 80
                    },
                    {
                        key: "actions",
                        name: "Actions",
                        onRender: (item: BlobItem) => <Stack horizontal tokens={{childrenGap: 10}}>
                            <DefaultButton onClick={() => downloadDocument(item.name)}><Icon iconName={"download"}/> View</DefaultButton>
                            <DefaultButton onClick={() => deleteDocument(item.name)}><Icon iconName={"delete"}/> Delete</DefaultButton>
                        </Stack>,
                        minWidth: 200
                    }
                ]}
            />
        </>
    );
};

export default ItemsList;
