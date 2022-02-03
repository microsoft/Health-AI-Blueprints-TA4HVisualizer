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
      <Tabs>
          <TabList>
              <Tab>Setup</Tab>
              <Tab>Upload</Tab>
              <Tab>Visualize</Tab>
          </TabList>

          <TabPanel>
              <h2>Setup power BI</h2>

              <h2> Step1</h2>
              <div>Import the following <p><a href="https://github.com/pazinio/Health-AI-Blueprints-TA4HVisualizer/tree/main/powerbi/">PBIX file</a></p></div>

              <h2> Step2</h2>
              <div> Choose embed or premium</div>

              <h2> Step3</h2>
              <div> change SQL connection settings</div>


          </TabPanel>

          <TabPanel>
              <h2>Any content 2</h2>
              <SelectedContainer className="container">
                  <InputFile />
                  <ItemsList />
                  <div className="item-details">
                      <ItemsUploaded />
                      <ItemsDownloaded />
                      <ItemsDeleted />
                  </div>
              </SelectedContainer>
              <ContainerList />
          </TabPanel>

          <TabPanel>
              <button onClick={()=> window.open("https://msit.powerbi.com/groups/me/reports/015a962a-5c80-4bf6-8c3f-04cc42c96bae/ReportSection", "_blank")}>Open in Power BI</button>
              { <iframe
                      title="ta4h - Page 1"
                      width="1140"
                      height="541.25"
                      src="https://msit.powerbi.com/reportEmbed?reportId=015a962a-5c80-4bf6-8c3f-04cc42c96bae&autoAuth=true&ctid=72f988bf-86f1-41af-91ab-2d7cd011db47&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9kZi1tc2l0LXNjdXMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D"
                      frameBorder="0"
                      allowFullScreen>
                </iframe> }
          </TabPanel>
      </Tabs>
      );
  </>
);

export default App;
