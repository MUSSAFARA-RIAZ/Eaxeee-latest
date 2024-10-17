import React from 'react';
import TextUpdaterNode from './TextUpdaterNode';
import CustomNode from './CustomNode';
import Container from './Container';

export default () => {

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>

      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        <p>Input Node</p>
      </div>


      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>

      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>

      <div style={{ borderWidth: 1,borderRadius:8,padding:4, borderColor: 'black', borderStyle: 'solid',cursor: 'grab' }}>
        <TextUpdaterNode onDragStart={(event) => onDragStart(event, 'textUpdater')} draggable />
      </div>

      <br></br>

      <div style={{ borderWidth: 1,borderRadius:8, borderColor: 'black', borderStyle: 'solid', padding: 4, cursor: 'grab', width: 'fit-content' }}>
        <CustomNode onDragStart={(event) => onDragStart(event, 'custom')} draggable/>
      </div>

      <br></br>
      <div style={{ borderWidth: 1, borderColor: 'black', borderStyle: 'solid', padding: 2, cursor: 'grab', width: 'fit-content' }}>
        <Container onDragStart={(event) => onDragStart(event, 'container')} draggable />
      </div>

    </aside>
  );
};







