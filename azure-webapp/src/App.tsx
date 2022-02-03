import React from 'react';
import ContainerList from './azure-storage/components/ContainerList';
import InputFile from './azure-storage/components/InputFile';
import ItemsDeleted from './azure-storage/components/ItemsDeleted';
import ItemsDownloaded from './azure-storage/components/ItemsDownloaded';
import ItemsList from './azure-storage/components/ItemsList';
import ItemsUploaded from './azure-storage/components/ItemsUploaded';
import SelectedContainer from './azure-storage/components/SelectedContainer';
import Header from './layout/Header';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const App: React.FC = () => (
  <>
    <Header />
    <hr />
    <ContainerList />
    <hr />
    <SelectedContainer className="container">
      <InputFile />
      <ItemsList />
      <div className="item-details">
        <ItemsUploaded />
        <ItemsDownloaded />
        <ItemsDeleted />
      </div>
    </SelectedContainer>
      <Tabs>
          <TabList>
              <Tab>Title 1</Tab>
              <Tab>Title 2</Tab>
          </TabList>

          <TabPanel>
              <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
              <h2>Any content 2</h2>
          </TabPanel>
      </Tabs>
      );
  </>
);

export default App;
