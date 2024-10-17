import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar.js';
import './styles/style.css';
import ContextMenu from './ContextMenu';
import DownloadButton from './DownloadImage';
import TextUpdaterNode from './TextUpdaterNode.js';
import CustomNode from './CustomNode.js';
import Container from './Container.js';
import { Link } from 'react-router-dom'
// showing nodes on canvas load
const initialNodes = [];

const nodeTypes = {
  textUpdater: TextUpdaterNode,
  custom: CustomNode,
  container: Container,
};

// Assigning unique ids to nodes
let id = 0;
const getId = () => `dndnode_${id++}`;

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialNodes);
  const [contextMenu, setContextMenu] = useState(null);
  const [hideEdges, setHideEdges] = useState(false);
  const [selectedEdgeType, setSelectedEdgeType] = useState(null);
  const [clickedNodeId, setClickedNodeId] = useState(null);

  const [hideNodeBorders, setHideNodeBorders] = useState(false);
  // // Create a CSS class to hide the borders of the nodes
  const hideNodeBordersClass = hideNodeBorders ? 'hide-node-borders' : '';
  const [theme, setTheme] = useState('default'); // State for theme

  // We need to know where the containers are on the screen. We do this by calculating their absolute positions.
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === 'group' || node.type === 'container') {
          const absolutePosition = reactFlowInstance.screenToFlowPosition(node.position);
          return {
            ...node,
            positionAbsolute: absolutePosition,
          };
        }
        return node;
      })
    );
  }, [reactFlowInstance, nodes, setNodes]);
  // ///

  const toggleHideNodeBorders = () => {
    setHideNodeBorders((prevHideNodeBorders) => !prevHideNodeBorders);
  };

  // Open context menu
  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();
      setContextMenu({ nodeId: node.id, x: event.clientX, y: event.clientY });
    },
    [setContextMenu]
  );

  // Deleting node on right click from the context menu
  // const deleteNodeRight = useCallback(() => {
  //   if (!contextMenu) return;

  //   const nodeId = contextMenu.nodeId;
  //   setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
  //   setEdges((prevEdges) => prevEdges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  //   setContextMenu(null);
  // }, [contextMenu, elements, setElements]);

  const deleteNodeRight = useCallback(() => {
    if (!contextMenu) return;

    const nodeId = contextMenu.nodeId;

    // Delete the node and its associated edges
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));

    // Delete child nodes if the node is a container
    const containerNode = nodes.find((node) => node.id === nodeId);
    if (containerNode && containerNode.type === 'container') {
      const childNodes = nodes.filter((node) => node.parentNode === nodeId);
      childNodes.forEach((childNode) => {
        setEdges((prevEdges) => prevEdges.filter((edge) => edge.source !== childNode.id && edge.target !== childNode.id));
      });
      setNodes((prevNodes) => prevNodes.filter((node) => node.parentNode !== nodeId));
    }

    setContextMenu(null);
  }, [contextMenu, nodes, setNodes, setEdges]);


  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);


  // // Deleting node & associated edge on left click

  // const deleteNode = useCallback((nodeId) => {
  //   console.log('Deleting node with ID:', nodeId);
  //   setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
  //   setEdges((prevEdges) => prevEdges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  // }, [setNodes, setEdges]);

  // const onNodeClick = useCallback((event, node) => {
  //   if (event.button === 0) {
  //     setClickedNodeId(node.id);

  //     setNodes((prevNodes) =>
  //       prevNodes.map((n) =>
  //         n.id === node.id
  //           ? { ...n, style: { ...n.style, borderColor: 'red', borderWidth: 1 } } // Highlight the clicked node
  //           : { ...n, style: { ...n.style, borderColor: 'black', borderWidth: 1 } } // Reset the style of other nodes
  //       )
  //     );
  //   }
  // }, [deleteNode]);

  // // Function to delete the selected node and its associated edges
  // const deleteSelectedNode = useCallback(() => {
  //   if (clickedNodeId) {
  //     // Delete the node
  //     deleteNode(clickedNodeId);
  //   }
  // }, [clickedNodeId, deleteNode]);

  // // Event listener for keyboard events
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === 'Delete') {
  //       console.log('Delete key pressed');
  //       deleteSelectedNode();
  //     }
  //   };

  //   // Add event listener when component mounts
  //   document.addEventListener('keydown', handleKeyDown);

  //   // Remove event listener when component unmounts
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [deleteSelectedNode]);


  const deleteNode = useCallback((nodeId) => {
    console.log('Deleting node with ID:', nodeId);

    // Delete the node and its associated edges
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));

    // Delete child nodes if the node is a container
    const containerNode = nodes.find((node) => node.id === nodeId);
    if (containerNode && containerNode.type === 'container') {
      const childNodes = nodes.filter((node) => node.parentNode === nodeId);
      childNodes.forEach((childNode) => {
        setEdges((prevEdges) => prevEdges.filter((edge) => edge.source !== childNode.id && edge.target !== childNode.id));
      });
      setNodes((prevNodes) => prevNodes.filter((node) => node.parentNode !== nodeId));
    }
  }, [nodes, setNodes, setEdges]);

  const onNodeClick = useCallback((event, node) => {
    if (event.button === 0) {
      setClickedNodeId(node.id);

      setNodes((prevNodes) =>
        prevNodes.map((n) =>
          n.id === node.id
            ? { ...n, style: { ...n.style, borderColor: 'red', borderWidth: 1 } } // Highlight the clicked node
            : n
          // : { ...n, style: { ...n.style, borderColor: 'black', borderWidth: 1 } } // Reset the style of other nodes
        )
      );
    }
  }, []);

  // Function to delete the selected node and its associated edges
  const deleteSelectedNode = useCallback(() => {
    if (clickedNodeId) {
      // Delete the node
      deleteNode(clickedNodeId);
    }
  }, [clickedNodeId, deleteNode]);

  // Event listener for keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete') {
        console.log('Delete key pressed');
        deleteSelectedNode();
      }
    };

    // Add event listener when component mounts
    document.addEventListener('keydown', handleKeyDown);
    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [deleteSelectedNode]);



  // Connection validation
  const isValidConnection = useCallback((connection) => {
    const { source, target } = connection;

    if (!source || !target || !nodes || nodes.length === 0) {
      return false;
    }

    const sourceNode = nodes.find((node) => node.id === source);
    const targetNode = nodes.find((node) => node.id === target);

    if (!sourceNode || !targetNode) {
      return false;
    }

    console.log('Source node:', sourceNode);
    console.log('Target node:', targetNode);

    const sourceNodeType = sourceNode.type;
    const targetNodeType = targetNode.type;

    console.log('Source node type:', sourceNodeType);
    console.log('Target node type:', targetNodeType);

    // Define allowed connections based on node types
    const allowedConnections = {
      'input': ['default', 'textUpdater'],  // Input node can connect to Default node
      'default': ['output'],
      'textUpdater': ['default']// Default node can connect to Output node
    };

    // Check if the target node is in the list of allowed connections for the source node
    const isValid = allowedConnections[sourceNodeType]?.includes(targetNodeType);

    console.log('isValid:', isValid);

    return isValid;
  }, [nodes]);


  const onConnect = useCallback(
    (params) => {
      const { source, target, sourceHandle, targetHandle } = params;

      console.log('Params:', params);

      // Retrieve the actual node objects from the nodes array
      const sourceNode = nodes.find((node) => node.id === source);
      const targetNode = nodes.find((node) => node.id === target);

      console.log('Source node:', sourceNode);
      console.log('Target node:', targetNode);
      console.log('Source node type:', sourceNode?.type);
      console.log('Target node type:', targetNode?.type);

      // Check if the source and target node objects are found
      if (!sourceNode || !targetNode) {
        console.error('Source or target node not found:', sourceNode, targetNode);
        return;
      }

      const connection = { source: sourceNode.id, target: targetNode.id, sourceHandle, targetHandle };
      const isValid = isValidConnection(connection);

      console.log('Connection validity:', isValid);

      if (isValid) {

        const edgeData = { ...params };
        if (selectedEdgeType) {
          edgeData.data = { ...edgeData.data, label: selectedEdgeType.label };
          edgeData.label = selectedEdgeType.label;
          edgeData.style = selectedEdgeType.style;
          edgeData.markerEnd = selectedEdgeType.markerEnd;
        }
        setEdges((eds) => addEdge(edgeData, eds));
        // setEdges((eds) => addEdge({ ...params, connection }, eds));
      } else {
        console.error('Invalid connection:', sourceNode, targetNode);
        console.log('Showing alert for invalid connection...');
        // alert('Invalid connection!');
      }
    },
    [isValidConnection, nodes, setEdges, selectedEdgeType]
  );

  // Drag the nodes
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


  // Drop the nodes onto the canvas
  // const onDrop = useCallback(
  //   (event) => {
  //     event.preventDefault();

  //     const type = event.dataTransfer.getData('application/reactflow');

  //     if (typeof type === 'undefined' || !type) {
  //       return;
  //     }
  //     // Coordinates position of the node
  //     const position = reactFlowInstance.screenToFlowPosition({
  //       x: event.clientX,
  //       y: event.clientY,
  //     });
  //     // Create a new node object
  //     const newNode = {
  //       id: getId(),
  //       type, // Ensure that the correct type is being set here
  //       position,
  //       data: {
  //         label: `${type} node`,
  //         hideNodeBorders: hideNodeBorders,
  //       },
  //     };

  //     console.log('New node:', newNode); // Log the new node to check the type property
  //     // creates new array with the new node
  //     setNodes((nds) => nds.concat(newNode));
  //     setElements((nds) => nds.concat(newNode))
  //   },
  //   [reactFlowInstance],

  // );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      // const position = reactFlowInstance.project({ x: event.clientX, y: event.clientY });
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      let newNode = {
        id: getId(),
        type,
        position,
        data: {
          label: `${type} node`,
          hideNodeBorders: hideNodeBorders,
        },
      };

      // to find if the dropped node is inside any container
      const containerNode = nodes.find((node) => {
        if (node.type === 'group' || node.type === 'container') {
          const { positionAbsolute, style } = node;
          const width = style ? style.width : 0;
          const height = style ? style.height : 0;
          //  if the dropped node's position (position) falls within the boundaries of the current container node 
          if (positionAbsolute && width && height) {
            return (
              position.x > positionAbsolute.x &&
              position.x < positionAbsolute.x + width &&
              position.y > positionAbsolute.y &&
              position.y < positionAbsolute.y + height
            );
          }
        }
        return false;
      });
      // If we found a container, make the new node its child
      if (containerNode) {
        newNode = {
          ...newNode,
          parentNode: containerNode.id,
          extent: 'parent',
          position: {
            x: position.x - containerNode.positionAbsolute.x,
            y: position.y - containerNode.positionAbsolute.y,
          },
        };
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes, hideNodeBorders, setNodes]
  );

  // Close the context menu by setting its value to null if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setContextMenu(null), [setContextMenu]);

  // Changing node color

  // const changeNodeColor = useCallback((color) => {
  //   // if (!contextMenu) return;
  //   if (!contextMenu || hideNodeBorders) return;
  //   const nodeId = contextMenu.nodeId;
  //   setNodes((prevNodes) =>
  //     prevNodes.map((node) => {
  //       if (node.id === nodeId) {
  //         // return { ...node, data: { ...node.data, color } };
  //         return { ...node, style: { ...node.style, backgroundColor: color, color: 'white' } };
  //       }
  //       return node;
  //     })
  //   );
  //   setContextMenu(null);
  // }, [contextMenu, hideNodeBorders, setNodes]);


  // Changing node and icon colors
  const changeNodeColor = useCallback((color) => {
    if (!contextMenu) return;
    const nodeId = contextMenu.nodeId;

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === nodeId) {
          const newStyle = {
            ...node.style,
            backgroundColor: color,
            color: 'white',
            // '--icon-color': hideNodeBorders ? color : 'initial'
            '--icon-color': color
          };
          return { ...node, style: newStyle };
        }
        return node;
      })
    );
    setContextMenu(null);
  }, [contextMenu, hideNodeBorders, setNodes]);



  // Function to hide and show edges 
  const toggleEdgeVisibility = useCallback(() => {
    setHideEdges((prevHideEdges) => {
      const newValue = !prevHideEdges;
      return newValue;
    });
  }, []);

  // Edge styles
  const edgeStyles = [
    {
      label: 'Association',
      style: { stroke: 'gray', strokeWidth: 2 },
      markerEnd: { type: 'arrow', fill: '#f00' },
    },
    {
      label: 'Dependency',
      style: { stroke: 'gray', strokeWidth: 2, strokeDasharray: '5,5' },
      markerEnd: { type: 'arrow', fill: '#f00' },
    },
    {
      label: 'Composition ',
      style: { stroke: 'gray', strokeWidth: 2 },
      markerEnd: 'diamondF',
    },
    {
      label: 'Aggregation ',
      style: { stroke: 'gray', strokeWidth: 2 },
      markerEnd: 'diamond',
    },
  ];

  const handleEdgeSelect = (selectedStyle) => {
    setSelectedEdgeType(selectedStyle);
  };

  // Functions to bring node to front and send to back
  const bringToFront = (nodeId) => {
    setNodes((prevNodes) => {
      const maxZIndex = Math.max(...prevNodes.map(node => node.style?.zIndex || 0)) + 1;
      return prevNodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, style: { ...node.style, zIndex: maxZIndex } };
        }
        return node;
      });
    });
  };

  const sendToBack = (nodeId) => {
    setNodes((prevNodes) => {
      const minZIndex = Math.min(...prevNodes.map(node => node.style?.zIndex || 0)) - 1;
      return prevNodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, style: { ...node.style, zIndex: minZIndex } };
        }
        return node;
      });
    });
  };


  return (
    // <div className="dndflow">
    <div className={`dndflow ${theme}_bgcolor`}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100%', height: '100vh' }}>
          <ReactFlow
            key={elements.length}
            elements={elements}
            nodeTypes={nodeTypes}
            onNodeContextMenu={onNodeContextMenu}
            style={{ width: '100%', height: '100vh' }}
            nodes={nodes}
            edges={hideEdges ? [] : edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            isValidConnection={isValidConnection}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            className={hideNodeBordersClass}
          >
            {/* Filled diamond -- composition */}
            <svg>
              <defs>
                <marker id="diamondF" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                  <path d="M 0 5 L 5 0 L 10 5 L 5 10 Z" fill="#848884" className='marker' />
                </marker>
              </defs>
            </svg>
            {/* Unfilled diamond -- aggregation */}
            <svg>
              <defs>
                <marker id="diamond" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                  <path d="M 0 5 L 5 0 L 10 5 L 5 10 Z" fill="white" stroke="#1A192B" className='marker' />
                </marker>
              </defs>
            </svg>

            <Controls />
            <Background gap={25} />

            {/* show download button */}
            {/* <DownloadButton /> */}
            <DownloadButton reactFlowInstance={reactFlowInstance} theme={theme} />
          </ReactFlow>
          {/* Show context menu */}
          {contextMenu && (
            <ContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              onBringToFront={() => bringToFront(contextMenu.nodeId)} // Pass the bringToFront handler
              onSendToBack={() => sendToBack(contextMenu.nodeId)}
              onDelete={deleteNodeRight}
              onChangeColor={changeNodeColor}
              onClose={closeContextMenu}
            />
          )}

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 100, paddingRight: 15 }}>

          {/* Edges hide and show */}
          <button onClick={toggleEdgeVisibility} className={hideEdges ? 'hide-edges-button' : 'show-edges-button'}>
            {hideEdges ? 'Show Edges' : 'Hide Edges'}
          </button>

          {/* Toggle shape */}
          <button className='toggle-btn' onClick={toggleHideNodeBorders}>
            <p>Toggle Shape</p>
          </button>

          <div style={{ marginBottom: '10px' }}>
            <Link to="/">
              <button className='toggle-btn'>Switch to BPMN</button>
            </Link>
          </div>

          {/* Edge selection */}
          <div style={{ margin: 1 }}>
            <label htmlFor="edgeType" style={{ fontSize: 12, color: theme === 'dark' ? 'white' : 'black' }}>Select Edge Type: </label>
            <select id="edgeType" onChange={(e) => handleEdgeSelect(edgeStyles[e.target.value])}>
              {edgeStyles.map((style, index) => (
                <option key={index} value={index}>{style.label}</option>
              ))}
            </select>
          </div>

          {/* Theme selection */}
          <div style={{ margin: 1 }}>
            <label htmlFor="theme" style={{ fontSize: 12, color: theme === 'dark' ? 'white' : 'black' }}>Select Theme: </label>
            <select id="theme" style={{ padding: 2 }} onChange={(e) => setTheme(e.target.value)}>
              <option value="default">Default</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>


        </div>

        {/* Nodes menu */}
        <Sidebar />

      </ReactFlowProvider>
    </div>

  );
};

export default Flow;








