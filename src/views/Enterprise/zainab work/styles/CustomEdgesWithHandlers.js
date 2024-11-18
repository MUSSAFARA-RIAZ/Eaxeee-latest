import React, { useEffect, useRef, useState } from 'react'; 
import { getBezierPath, useReactFlow, Position } from 'reactflow';
import uniqid from 'uniqid';


const HIDDEN_NODE_SIZE = 20;

const CustomEdgeWithHandlers = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  style = {},
}) => {
  const { setNodes,  } = useReactFlow();
  const [isHovering, setIsHovering] = useState(false);

  const midpointX = (sourceX + targetX) / 2;
  const midpointY = (sourceY + targetY) / 2;

  const midid = useRef(uniqid());

  const hiddenNode = {
    id: `midnode-${ midid.current }`,
    type: 'midpointNode',
    position: { 
      x: midpointX - HIDDEN_NODE_SIZE/2, 
      y: midpointY - HIDDEN_NODE_SIZE/2 
    },
    data: { 
      label: '',
      parentEdgeId: id
    },
    draggable: false,
    style: { 
      width: HIDDEN_NODE_SIZE,
      height: HIDDEN_NODE_SIZE,
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      borderRadius: '50%',
    }
  };

  // useEffect(() => {
  //  // console.log('sourceX', sourceX);
  //   // setNodes((nodes) => {
  //   //   // console.log(nodes)
  //   //   // Check if node already exists to prevent duplicates
  //   //   if (!nodes.find(n => n.id === `midnode-${id}`)) {
  //   //     return [...nodes, hiddenNode];
  //   //   }
  //   //   return nodes;
  //   // });
  // }, [sourceX,
  //   sourceY,
  //   targetX,
  //   targetY,])

  const handleMouseEnter = () => {
    setIsHovering(true);
    setNodes((nodes) => {
      // console.log(nodes)
      // Check if node already exists to prevent duplicates
      if (!nodes.find(n => n.id === `midnode-${midid.current}`)) {
        return [...nodes, hiddenNode];
      }
      return nodes;
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setNodes((nodes) => nodes.filter(node => node.id !== `midnode-${midid.current}`));
  };

  // return (
  //   <>
  //     <path
  //       id={id}
  //       style={style}
  //       className="react-flow__edge-path"
  //       d={getBezierPath({ sourceX, sourceY, targetX, targetY })}
  //       markerEnd={markerEnd}
  //     />
      
  //     <circle
  //       cx={midpointX}
  //       cy={midpointY}
  //       r={5}
  //       fill={isHovering ? '#ff0000' : '#666'}
  //       stroke="#fff"
  //       strokeWidth={2}
  //       onMouseEnter={handleMouseEnter}
  //       onMouseLeave={handleMouseLeave}
  //       style={{ cursor: 'crosshair' }}
  //       className="nodrag"
  //     />
  //   </>
  // );

  return (
    <>
    
     
      <path
       id={id}
       style={style}
        className="react-flow__edge-path"
       d={getBezierPath({ sourceX, sourceY, targetX, targetY })}
       markerEnd={markerEnd}
      />
      {/* Optionally, render midpoint node or label */}
      <circle onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} cx={midpointX} cy={midpointY} r={5} fill="red" />
   
  
    </>
  );
};

export default CustomEdgeWithHandlers;