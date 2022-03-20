import React, { useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import { DownloadsViewStateContext } from '../contexts/viewStateContext';
import { BlobItemDownload } from '../types/azure-storage';
import {
  mergeStyleSets,
  FontWeights,
  Modal,
  ResponsiveMode,
  Stack,
  StackItem,
} from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    width: "80vw",
    height: "80vh"
  },
  header: [
    {
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flexGrow: 1,
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
  footer: {
    display: 'flex',
    alignItems: 'end',
    padding: '12px 12px 14px 24px',
  }
});

const ItemsDownloaded: React.FC = () => {
  const context = useContext(DownloadsViewStateContext);
  const [items, setItems] = useState<BlobItemDownload[]>([]);
  const [modalItem, setModalItem] = useState<BlobItemDownload>();
  const getDownloadedItems = () => {
    const sub = context.downloadedItems$
      .pipe(tap(items => setItems(items)))
      .subscribe();
    return () => sub.unsubscribe();
  };
  useEffect(getDownloadedItems, []);

  useEffect(() => {
    if (items.length > 0) {
      const item = items.slice(-1)[0];
      if (item) {
        setModalItem(item);
      } else {
        setModalItem(undefined);
      }
    }
    
  }, [items]);

  return (
    <div className="items-downloaded">
      <Modal  titleAriaId={modalItem?.filename}
              isOpen={!!modalItem}
              onDismiss={() => setModalItem(undefined)}
              isBlocking={true}
              responsiveMode={ResponsiveMode.large}
              containerClassName={contentStyles.container}>
        <Stack tokens={{childrenGap: 20}} styles={{root: {height: "100%", padding: 30}}}>
          <h2>{modalItem?.filename}</h2>
          <StackItem grow>
            <iframe src={modalItem?.url} style={{width: "100%", height: "100%", background: "#eaeaea"}}/>
          </StackItem>
          <Stack horizontal horizontalAlign='end'>
            <DefaultButton styles={{
                                      root: {
                                        color: "black",
                                        marginLeft: 'auto',
                                        marginTop: '4px',
                                        marginRight: '2px',
                                      }
                                    }} 
                            ariaLabel="Close popup modal" 
                            onClick={() => setModalItem(undefined)}>
                Close
              </DefaultButton>
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
};

export default ItemsDownloaded;
