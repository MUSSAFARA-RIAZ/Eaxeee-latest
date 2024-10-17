import React, { useState } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

function CustomNode({ isConnectable, onDragStart, draggable, nodeType }) {
  const [text, setText] = useState('Business Application 2');
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  return (
    <>
      <NodeResizer minWidth={180} minHeight={50} />
      <div className='custom-node' id='custom'>
        <div className='toggle-shape' onDragStart={onDragStart} draggable={draggable} onDoubleClick={handleDoubleClick}>
          {isEditing ? (
            <input
              type="text"
              value={text}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              autoFocus
            />
          ) : (
            <p className='node-text node-text-dark'>{text}</p>
          )}
          <AccessAlarmIcon className='icon-custom icon'/>
        </div>
        <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
        <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
      </div>
    </>
  );
}

export default CustomNode;








