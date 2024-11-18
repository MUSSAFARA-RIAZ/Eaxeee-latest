import React, { useState, useEffect, useCallback } from 'react'; 
import { getBezierPath } from 'reactflow';

const SNAP_RADIUS = 15; 

const CustomEdgeWithHandlers = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  style = {},
  onConnectCenterPoints,
  existingEdges, 
}) => {
  const [isDraggingCenter, setIsDraggingCenter] = useState(false);
  const [centerConnectionStart, setCenterConnectionStart] = useState(null);
  const [currentMousePosition, setCurrentMousePosition] = useState({ x: 0, y: 0 });
  const [edgePath, setEdgePath] = useState(null);

  const midpointX = (sourceX + targetX) / 2;
  const midpointY = (sourceY + targetY) / 2;

  const updateEdgePath = useCallback((targetX, targetY) => {
    const draggedPath = getBezierPath({
      sourceX: centerConnectionStart?.x || midpointX,
      sourceY: centerConnectionStart?.y || midpointY,
      targetX,
      targetY,
    });
    
    setEdgePath(draggedPath);
  }, [centerConnectionStart, midpointX, midpointY]);

  const handleCenterMouseDown = (event) => {
    event.stopPropagation();
    setIsDraggingCenter(true);
    setCenterConnectionStart({ x: midpointX, y: midpointY });
    setCurrentMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    if (isDraggingCenter) {
      
      setCurrentMousePosition({ x: event.clientX, y: event.clientY });
      
      updateEdgePath(event.clientX, event.clientY);
    }
  };

  const handleMouseUp = (event) => {
    if (isDraggingCenter) {
      const { clientX, clientY } = event;

      // Snap to the closest edge center point if available
      const snapToPoint = findNearestCenterPoint(clientX, clientY);

      if (onConnectCenterPoints) {
        onConnectCenterPoints({
          source: 'center',
          sourceHandle: 'center',
          targetX: snapToPoint ? snapToPoint.x : clientX,
          targetY: snapToPoint ? snapToPoint.y : clientY,
        });
      }

      // Complete the drag operation
      setIsDraggingCenter(false);
      setCenterConnectionStart(null);
    }
  };

  const findNearestCenterPoint = (targetX, targetY) => {
    for (let edge of existingEdges) {
      const edgeMidpointX = (edge.sourceX + edge.targetX) / 2;
      const edgeMidpointY = (edge.sourceY + edge.targetY) / 2;
      const distance = Math.sqrt(
        Math.pow(edgeMidpointX - targetX, 2) + Math.pow(edgeMidpointY - targetY, 2)
      );

      if (distance <= SNAP_RADIUS) {
        return { x: edgeMidpointX, y: edgeMidpointY };
      }
    }
    return null;
  };

  useEffect(() => {
    if (isDraggingCenter) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingCenter]);

  const draggedBezierPath = isDraggingCenter
    ? getBezierPath({
        sourceX: centerConnectionStart?.x || midpointX,
        sourceY: centerConnectionStart?.y || midpointY,
        targetX: currentMousePosition.x,
        targetY: currentMousePosition.y,
      })
    : null;

  return (
    <>
      {/* Main--- between nodes */}
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={getBezierPath({ sourceX, sourceY, targetX, targetY })}
        markerEnd={markerEnd}
      />

      {/* midpoint of edgess */}
      <circle
        cx={midpointX}
        cy={midpointY}
        r={5}
        fill="red"
        style={{ cursor: 'pointer', pointerEvents: 'all' }}
        onMouseDown={handleCenterMouseDown}
      />

     {/* yeh center to center  */}
      {isDraggingCenter && (
        <path
          d={draggedBezierPath}
          className="react-flow__edge-path"
          style={style}
          markerEnd={markerEnd}
        />
      )}
    </>
  );
};

export default CustomEdgeWithHandlers;
