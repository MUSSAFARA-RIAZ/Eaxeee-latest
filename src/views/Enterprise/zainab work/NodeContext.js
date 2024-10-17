// NodeContext.js
import React, { createContext, useContext, useState } from 'react';

const NodeContext = createContext();

export const NodeProvider = ({ children }) => {
  const [hideNodeBorders, setHideNodeBorders] = useState(false);

  return (
    <NodeContext.Provider value={{ hideNodeBorders, setHideNodeBorders }}>
      {children}
    </NodeContext.Provider>
  );
};

export const useNodeContext = () => useContext(NodeContext);
