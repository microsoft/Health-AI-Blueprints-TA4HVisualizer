import { ContainerItem } from '@azure/storage-blob';
import React, { useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import { SharedViewStateContext } from '../contexts/viewStateContext';

const ContainerList: React.FC = () => {
  const context = useContext(SharedViewStateContext);
  const [items, setItems] = useState<ContainerItem[]>([]);

  const getContainersEffect = () => {
    const sub = context.containers$
      .pipe(tap(items => setItems(items)))
      .subscribe();

    return () => sub.unsubscribe();
  };
  useEffect(getContainersEffect, []);
  const onContainerClick = (name: string) => context.getContainerItems(name);

  return (
    <div className="container-list">
      {/* <h3>Containers</h3> */}
      {items.filter(item => item.name === 'medical-texts-input').map((item, i) => (
        <div key={i}>          
          {item.name}
           <button onClick={() => onContainerClick(item.name)}>View/Upload</button>
        </div>
      ))}

    Reports    
    <button onClick={()=> window.open("https://msit.powerbi.com/groups/me/reports/015a962a-5c80-4bf6-8c3f-04cc42c96bae/ReportSection", "_blank")}>Visualization</button>
      {/* <iframe 
          title="ta4h - Page 1" 
          width="1140" 
          height="541.25" 
          src="https://msit.powerbi.com/reportEmbed?reportId=015a962a-5c80-4bf6-8c3f-04cc42c96bae&autoAuth=true&ctid=72f988bf-86f1-41af-91ab-2d7cd011db47&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9kZi1tc2l0LXNjdXMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D" 
          frameBorder="0" 
          allowFullScreen>
      </iframe> */}
    </div>
  );
};

export default ContainerList;
