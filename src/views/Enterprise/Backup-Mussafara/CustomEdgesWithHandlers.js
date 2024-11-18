import React from 'react';
import { getBezierPath } from 'reactflow';

// Props: sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style, markerEnd
const CustomEdgeWithHandlers = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <text x={labelX} y={labelY} className="edge-label">
        Midpoint
      </text>
    </>
  );
};

export default CustomEdgeWithHandlers;
