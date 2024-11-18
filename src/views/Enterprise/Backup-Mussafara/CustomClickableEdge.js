import { Handle, Position } from 'react-flow-renderer';

const CustomClickableEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, onEdgeClick }) => {
    const middleX = (sourceX + targetX) / 2;
    const middleY = (sourceY + targetY) / 2;
  
    const handleEdgeClick = (event) => {
      if (onEdgeClick) {
        onEdgeClick(id, event); // Trigger a callback passed from the parent
      }
    };
  
    return (
      <>
        <path
          id={id}
          className="react-flow__edge-path"
          style={{ stroke: 'black', strokeWidth: 2 }}
          d={`M${sourceX},${sourceY}L${targetX},${targetY}`} // Custom edge path
          onClick={handleEdgeClick}  // Add click handler to the edge
        />
  
        {/* Handle at the middle of the edge */}
        <Handle
          type="source"
          id="handle-1"
          position={Position.Top}
          style={{
            background: 'red',
            transform: `translate(-50%, -50%)`, // Center the handle on the edge
            left: `${middleX}px`,
            top: `${middleY}px`,
          }}
          isConnectable={true}
        />
        
        {/* Another handle */}
        <Handle
          type="source"
          id="handle-2"
          position={Position.Left}
          style={{
            background: 'green',
            transform: `translate(-50%, -50%)`,
            left: `${middleX}px`,
            top: `${middleY}px`,
          }}
          isConnectable={true}
        />
  
        {/* Additional handle */}
        <Handle
          type="target"
          id="handle-3"
          position={Position.Right}
          style={{
            background: 'blue',
            transform: `translate(-50%, -50%)`,
            left: `${middleX}px`,
            top: `${middleY}px`,
          }}
          isConnectable={true}
        />
  
        {/* Handle at the end of the edge */}
        <Handle
          type="target"
          id="handle-4"
          position={Position.Bottom}
          style={{
            background: 'yellow',
            transform: `translate(-50%, -50%)`,
            left: `${middleX}px`,
            top: `${middleY}px`,
          }}
          isConnectable={true}
        />
      </>
    );
  };
  
