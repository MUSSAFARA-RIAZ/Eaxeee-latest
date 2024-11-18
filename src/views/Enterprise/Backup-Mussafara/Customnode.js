// src/CustomNode.js

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const DEFAULT_HANDLE_STYLE = {
  width: 10,
  height: 10,
  bottom: -5,
};

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <div
        style={{
          background: '#DDD',
          padding: 25,
        }}
      >
        <div>Node</div>
        
        {/* First three existing handles */}
        <Handle
          type="source"
          id="red"
          position={Position.Bottom}
          style={{ ...DEFAULT_HANDLE_STYLE, left: '15%', background: 'red' }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="blue"
          style={{ ...DEFAULT_HANDLE_STYLE, left: '50%', background: 'blue' }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="orange"
          style={{ ...DEFAULT_HANDLE_STYLE, left: '85%', background: 'orange' }}
          isConnectable={isConnectable}
        />
        
        {/* Fourth handle added here */}
        <Handle
          type="source"
          id="green"
          position={Position.Right}  // Position on the right side
          style={{ ...DEFAULT_HANDLE_STYLE, top: '50%', background: 'green' }}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
});
