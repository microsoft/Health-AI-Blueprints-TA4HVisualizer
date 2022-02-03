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
    </div>
  );
};

export default ContainerList;
