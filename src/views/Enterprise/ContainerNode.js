import { Rnd } from "react-rnd";

import ReactFlow, {
    Background,
    Controls,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    useReactFlow,
    ReactFlowProvider
} from "reactflow";

import { useState, useRef, useCallback, useEffect } from "react";
import ContextMenu from "./ContextMenu";

const initialNodes = [
  
];


const initialEdges = [];



const ContainerNode = ({ _nodes,_edges, updateContainerNodes, updateContainerEdges, selectedNodeForContainer, setSelectedNodeForContainer, container, setDiagrams, activeDiagramId, setEditingId, editingId, handleContainerTextChange, theme }) => {


    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [nodes, setNodes] = useState(_nodes);
    const [edges, setEdges] = useState(_edges);


    useEffect(() => {
        updateContainerNodes(activeDiagramId, nodes)
    },[nodes])

    useEffect(() => {
        updateContainerEdges(activeDiagramId, edges)
    },[edges])
    

    const [isDraggable, setIsDraggable] = useState(true);

    const ref = useRef();

    const onNodesChange = (changes) =>
        setNodes((nds) => applyNodeChanges(changes, nds));
    
    const onEdgesChange = (changes) => setEdges((eds) => applyEdgeChanges(changes, eds));

    const onConnect = (params) =>  setEdges((eds) => addEdge(params, eds));

    const onEdgeClick = (event, edge) => setEdges((eds) => eds.filter((e) => e.id !== edge.id));

    const [selectedNodeId, setSelectedNodeId]  = useState(null);
    const onNodeClick = (event, node) => {
        console.log('hello');
        setSelectedNodeId(node.id);
    }

    const onPaneClick = useCallback((event) => {

        console.log('pane clicked', selectedNodeForContainer);
       
        if (selectedNodeForContainer) {
            console.log(selectedNodeForContainer);
            let position;
            if (reactFlowInstance.screenToFlowPosition) {
                console.log('yes')
                position = reactFlowInstance.screenToFlowPosition({
                    x: event.clientX,
                    y: event.clientY,
                });
            }
            else {

                console.log('no')
                position = {
                    x: event.clientX,
                    y: event.clientY,
                };
            }
            let newNode = selectedNodeForContainer;
            newNode.position = position;

            setNodes((nds) => nds.concat(newNode));

            reactFlowInstance.zoomOut();
            reactFlowInstance.zoomOut();
            

            setSelectedNodeForContainer(null);
        }



        

    return;
   

    
}, [nodes, setNodes, reactFlowInstance, selectedNodeForContainer, setSelectedNodeForContainer]);


const isCursorInsideFlow = (e) => {
    if (ref.current) {
        const { left, top, right, bottom } = ref.current.getBoundingClientRect();
        const cursorX = e.clientX;
        const cursorY = e.clientY;

        //if in rflow
        return cursorX >= left && cursorX <= right && cursorY >= top && cursorY <= bottom;
    }
    return false;
};

useEffect(() => {
    const handleMouseMove = (e) => {
        if (isCursorInsideFlow(e)) {
            setIsDraggable(false);
        } else {
            setIsDraggable(true); 
        }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
    };
}, []);

const [rndHeight, setRndHeight] = useState(container.height);
const [rndWidth, setRndWidth] = useState(container.width);

const toggleRndHeight = useCallback(() => {
    setRndHeight((h) => {
        if(h === 35) {
            return 350
        }
        else{
            return 35;
        }
    });
    console.log('yousuf')
}, [rndHeight])

const [contextMenu, setContextMenu] = useState(false);

const handleMenuClick = (action) => {
    switch (action) {
      case "hideBorder":
       break;


      case "delete":
        setNodes((nds) => {
            console.log('dlltttt' , nds);
            return nds.filter((nd) => nd.id !== selectedNodeId)
        });
        setContextMenu(false)

        break;

      case "sendBack":
        
        break;
      case "bringFront":
        
        break;
      case "changeColor":
       
        break;
      default:
        break;
    }
  };

  const getBackgroundColor = (action) => {
    return contextMenu && contextMenu.hoveredItem === action ? "#f0f0f0" : "#ffffff";
  };

  const handleMouseEnter = (item) => {
    setContextMenu((prev) => ({ ...prev, hoveredItem: item }));
  };

  const handleMouseLeave = () => {
    setContextMenu((prev) => ({ ...prev, hoveredItem: null }));
  };

  const handleRightClick = (event, node) => {
    console.log("111 event in handle right click", node.id);

    event.preventDefault();


    setSelectedNodeId(node.id);

    setContextMenu({ x: event.clientX, y: event.clientY });


  };

return (

    <Rnd
        key={container.id} 
        default={{
            x: container.x,
            y: container.y,
        }}
        bounds="parent"
        disableDragging={!isDraggable}
        onDragStop={(e, data) => {
            setDiagrams(prevDiagrams =>
                prevDiagrams.map(diagram =>
                    diagram.id === activeDiagramId
                        ? {
                            ...diagram,
                            containers: diagram.containers.map(cont =>
                                cont.id === container.id ? { ...cont, x: data.x, y: data.y } : cont
                            )
                        }
                        : diagram
                )
            );
        }}
        style={{
            position: "absolute",
            border: '1px solid black',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
            zIndex: 1000, 
            fontSize: '16px',

            flexDirection: 'column',
        }}
        size={{
            height: rndHeight,
            width : rndWidth
        }}
        onResize={(e, direction, ref, delta, position) => {
        setRndHeight(ref.style.height)
        setRndWidth(ref.style.width)
      }}
    >
        <ReactFlowProvider>
            <FlowComponent
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgeClick={onEdgeClick}
                onEdgesChange={onEdgesChange}
                setReactFlowInstance={setReactFlowInstance}
                _ref={ref}
                onConnect={onConnect}
                onPaneClick={onPaneClick}
                onNodeClick={onNodeClick}
                onNodeContextMenu={handleRightClick}
            />
        </ReactFlowProvider>
        <div
            onMouseDownCapture={() => !isDraggable && setIsDraggable(true)}
            style={{
                width: '100%',
                padding: '5px',
                backgroundColor: 'lightgray',
                borderBottom: '1px solid black',
                cursor: 'pointer',
                position: 'absolute',
                top: '0',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'between',
                height: '35px'
            }}
            onDoubleClick={() => setEditingId(container.id)}
        >
            {editingId === container.id ? (
                <input
                    type="text"
                    value={container.text || ""}
                    onChange={(e) => handleContainerTextChange(e, container.id)}
                    onBlur={() => setEditingId(null)}
                    autoFocus
                    style={{
                        backgroundColor: 'white',
                        width: '95%',
                        textAlign: 'center',
                        border: 'none',
                        outline: 'none'
                    }}
                />
            ) : (
                <div style={{ width: '905%' }}>{container.text || 'Type here...'}</div>
            )}
           {
            nodes.length > 0 &&
            <div onClick={toggleRndHeight}>
                min
            </div>
           }
        </div>

        <ContextMenu
                    contextMenu={contextMenu}
                    handleMenuClick={handleMenuClick}
                    getBackgroundColor={getBackgroundColor}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    showHideBorder={true}
                    theme={theme}
                    
                  />
    </Rnd>
)
}

const FlowComponent = ({ _ref, nodes, edges, onNodesChange, onEdgesChange, onConnect, onPaneClick, onEdgeClick, setReactFlowInstance, onNodeClick, onNodeContextMenu }) => {
    const reactFlowInstance = useReactFlow();


    useEffect(() => {
        setReactFlowInstance(reactFlowInstance);

        reactFlowInstance.setViewport({
            zoom: 0.1,  
            x: 0,      
            y: 0        
          });
          
    }, [reactFlowInstance])


    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            ref={_ref}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onPaneClick={onPaneClick}
            onEdgeClick={onEdgeClick}
            onNodeClick={onNodeClick}
            onNodeContextMenu={onNodeContextMenu}
            fitView
        >
            <Background />
            <Controls />
        </ReactFlow>
    );
};

export default ContainerNode;