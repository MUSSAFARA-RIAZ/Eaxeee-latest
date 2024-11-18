import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import LeftPane from "../Layout/Leftpane";
import RightPane from "../Layout/Rightpane";
import { EnterpriseContent, UserTabs } from "./Components/Enterprise_iconsTab";
import DropDownInputField from "./Components/DropDownInputField";
import Iconbox from "./Components/Iconbox";
import ModalChangeColor from "./Components/Modals/ModalChangeColor";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { Tooltip, Tabs, Tab, Button, Menu, MenuItem } from "@mui/material";
import objectdefault from "../../Assets/Images/objectcharcoal.png";
import objectdark from "../../Assets/Images/objectpale.png";
import processdefault from "../../Assets/Images/processcharcoal.png";
import processdark from "../../Assets/Images/processpale.png";
import blueprintdefault from "../../Assets/Images/blueprintcharcoal.png";
import blueprintdark from "../../Assets/Images/blueprintpale.png";

import ContextMenu from "./ContextMenu";
import IconToolbar from "./Components/IconToolbar";

import { Rnd } from "react-rnd";

import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { Select, FormControl } from '@mui/material';
// import { Handle } from 'react-flow-renderer';


import { NodeResizer, Handle, Position } from "reactflow";
import CustomEdgeWithHandlers from "./CustomEdgesWithHandlers";


const HIDDEN_NODE_SIZE = 20;

const MidpointNode = ({ data }) => {
  return (
    <div style={{
      width: HIDDEN_NODE_SIZE,
      height: HIDDEN_NODE_SIZE,
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      borderRadius: '50%',
      position: 'relative'
    }}>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={true}
        style={{
          width: 8,
          height: 8,
          background: '#fff'
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={true}
        style={{
          width: 8,
          height: 8,
          background: '#fff'
        }}
      />
    </div>
  );
};

const Architecture = (props) => {
  const [open, setOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const edgeTypes = {
    customWithHandlers: CustomEdgeWithHandlers,
  };

  const [isDroppable, setIsDroppable] = useState(false);
  const [contextMenu, setContextMenu] = useState(false);
  const [diagrams, setDiagrams] = useState([]);
  const [activeDiagramId, setActiveDiagramId] = useState(1);

  const [selectedImageColor, setSelectedImageColor] = useState("");
  const [selectedImageTitle, setSelectedImageTitle] = useState("");
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [activeCatalogId, setActiveCatalogId] = useState(null);
  const [minimized, setMinimized] = useState(false);

  const [catalogs, setCatalogs] = useState([]);
  const [activeTool, setActiveTool] = useState('Diagram');
  const [architecture, setArchitecture] = useState("");
  const [addArtifactEnabled, setAddArtifactEnabled] = useState(false);
  const [savedTabs, setSavedTabs] = useState({});
  const [textMode, setTextMode] = useState(false);
  const [texts, setTexts] = useState([]);
  const [savedArtifacts, setSavedArtifacts] = useState({});

  const [matrices, setMatrices] = useState([]);
  const [navigations, setNavigations] = useState([]);
  const [viewpoints, setViewpoints] = useState([]);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(true);
  const [roadmaps, setRoadmaps] = useState([]);
  const [activeMatrixId, setActiveMatrixId] = useState(null);
  const [activeNavigationId, setActiveNavigationId] = useState(null);
  const [activeViewpointId, setActiveViewpointId] = useState(null);
  const [artifacts, setArtifacts] = useState([]);
  const [activeRoadmapId, setActiveRoadmapId] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const objectsrc = props.theme === "dark" ? objectdark : objectdefault;
  const processsrc = props.theme === "dark" ? processdark : processdefault;
  const artifactsrc = props.theme === "dark" ? blueprintdark : blueprintdefault;
  const [value, setValue] = useState(0);
  const [tabs, setTabs] = React.useState([
    ...diagrams.map((diagram) => ({ type: 'diagram', id: diagram.id })),
    ...catalogs.map((catalog) => ({ type: 'catalog', id: catalog.id })),
    ...matrices.map((matrix) => ({ type: 'matrix', id: matrix.id })),
    ...navigations.map((navigation) => ({ type: 'navigation', id: navigation.id })),
    ...viewpoints.map((viewpoint) => ({ type: 'viewpoint', id: viewpoint.id })),
    ...roadmaps.map((roadmap) => ({ type: 'roadmap', id: roadmap.id })),
  ]);
  const view = 0;
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [titleCountMap, setTitleCountMap] = useState({});



  const [editingId, setEditingId] = useState(null);
  const leftpanetabs = [
    {
      icon: (
        <Tooltip title="Object">
          <img src={objectsrc} alt="Object Default" style={{ width: '24px', height: '24px' }} />
        </Tooltip>
      )
    },
    { icon: (<Tooltip title="Artifacts"><img src={artifactsrc} alt="Object Default" style={{ width: '24px', height: '24px' }} /></Tooltip>) },
    { icon: (<Tooltip title="Process"><img src={processsrc} alt="Object Default" style={{ width: '24px', height: '24px' }} /></Tooltip>) },
    { icon: (<Tooltip title="Documents"><DescriptionOutlinedIcon /></Tooltip>) },
  ];

  const handleAddDiagram = () => {
    const newDiagramId = diagrams.length + 1;
    const newDiagram = {
      id: newDiagramId,
      type: "diagram",
      content: `Diagram ${newDiagramId} Content`,
      nodes: [],
      edges: [],
      containers: [],  // Initialize containers array
      texts: [],       // Initialize texts array
    };
    setArtifacts([...artifacts, newDiagram]);
    setActiveTab(`diagram-${newDiagramId}`);
    setDiagrams([...diagrams, newDiagram]);

    setActiveDiagramId(newDiagramId);

    // Clear the canvas states for containers and texts
    setContainers([]);
    setTexts([]);

    handleMenuClose();
  };

  const handleAddCatalog = () => {
    const newCatalogId = catalogs.length + 1;
    const newCatalog = { id: newCatalogId, type: "catalog", content: `Catalog ${newCatalogId} Content` };
    setArtifacts([...artifacts, newCatalog]);
    setActiveTab(`catalog-${newCatalogId}`);
    setCatalogs([...catalogs, newCatalog]);
    handleMenuClose();

  };

  const [contextMenuOptions, setContextMenuOptions] = useState(null);
  const [isContainerMode, setIsContainerMode] = useState(false);
  const [containers, setContainers] = useState([]);
  const DEFAULT_HANDLE_STYLE = {
    width: 10,
    height: 10,
    bottom: -5,
  };

  // State to store the options
  const handleCanvasClick = (event) => {
    const canvasRect = event.target.getBoundingClientRect();
    const activeDiagram = diagrams.find((diag) => diag.id === activeDiagramId);

    if (event.button === 0) {
      if (isContainerMode) {
        // Container mode code remains unchanged
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;
        const newContainer = { x, y, width: 200, height: 150, id: Date.now() };

        setDiagrams((prevDiagrams) =>
          prevDiagrams.map((diagram) =>
            diagram.id === activeDiagramId
              ? { ...diagram, containers: [...(diagram.containers || []), newContainer] }
              : diagram
          )
        );
        setIsContainerMode(false);
      } else if (textMode) {
        // Text mode code remains unchanged
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;
        const newText = { id: Date.now(), x, y, text: '' };

        setTexts((prev) => [...prev, newText]);
        setDiagrams((prevDiagrams) =>
          prevDiagrams.map((diagram) =>
            diagram.id === activeDiagramId
              ? { ...diagram, texts: [...diagram.texts, newText] }
              : diagram
          )
        );

        setEditingId(newText.id);
        setTextMode(false);
      } else if (selectedImage && isDroppable && activeDiagram) {
        // Add a new node with handles embedded directly
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;

        const baseTitle = selectedImageTitle;
        const currentCount = titleCountMap[baseTitle] || 0;
        const newCount = currentCount + 1;
        const formattedCount = String(newCount).padStart(3, '0');
        const newTitle = `${baseTitle} ${formattedCount}`;

        setTitleCountMap((prev) => ({ ...prev, [baseTitle]: newCount }));

        const newNode = {
          id: `${activeDiagram.nodes.length + 1}`,
          type: "default", // Use default node type
          position: { x, y },
          data: {
            label: (
              <>
                <NodeResizer minWidth={100} minHeight={40} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'black',
                      textAlign: 'center',
                      width: '100px',
                    }}
                  >
                    {newTitle}
                  </span>
                  <img
                    src={selectedImage}
                    alt="Dropped"
                    style={{
                      width: '29px',
                      height: '24px',
                      position: 'absolute',
                      top: 2,
                      right: 0,
                    }}
                  />
                </div>
                {/* Handles added directly here */}
                <div>
                  <Handle
                    type="source"
                    id="red"
                    position={Position.Left}
                    style={{ ...DEFAULT_HANDLE_STYLE, top: '50%', background: 'red' }}
                    isConnectable={true}
                  />
                  <Handle
                    type="source"
                    id="blue"
                    position={Position.Top}
                    style={{ ...DEFAULT_HANDLE_STYLE, left: '50%', background: 'blue' }}
                    isConnectable={true}
                  />
                  <Handle
                    type="source"
                    id="orange"
                    position={Position.Bottom}
                    style={{ ...DEFAULT_HANDLE_STYLE, left: '50%', background: 'blue' }}
                    isConnectable={true}
                  />
                  <Handle
                    type="source"
                    id="green"
                    position={Position.Right}
                    style={{ ...DEFAULT_HANDLE_STYLE, top: '50%', background: 'green' }}
                    isConnectable={true}
                  />
                </div>


              </>
            ),
          },
          style: {
            backgroundColor: isBackgroundVisible ? selectedImageColor : 'transparent',
            padding: '10px',
            width: '150px',
            borderRadius: '5px',
          },
        };

        const updatedDiagrams = diagrams.map((diagram) => {
          if (diagram.id === activeDiagramId) {
            return { ...diagram, nodes: [...diagram.nodes, newNode] };
          }
          return diagram;
        });

        setDiagrams(updatedDiagrams);
      }
    }
    setContextMenu(null);
  };


  const handleCanvasRightClick = (event, isText = false) => {
    event.preventDefault();




    setSelectedImage(null);


    setTextMode(false);

    console.log("Right-clicked on canvas, closing node context menu if open");
  };

  const handleRightClick = (event, nodeId) => {
    console.log("event in handle right click", event);

    event.preventDefault();


    setSelectedNodeId(nodeId);

    setContextMenu({ x: event.clientX, y: event.clientY });

    setSelectedImage(null);

    setContextMenuOptions("node");
  };
  const [showContainer, setShowContainer] = useState(false);

  // This handles selecting a new image from the icon box ----> and also extract if the clicked image has a title textt
  const handleSelectImage = (imageSrc, backgroundColor, title) => {
    setContextMenu(false);

    if (title === 'Text') {
      setTextMode(true);

    } else if (title === 'Container') {
      // Toggle showContainer to display the container

      setIsContainerMode(true);
    } else {
      setSelectedImage(imageSrc);
      setSelectedImageColor(backgroundColor);
      setSelectedImageTitle(title);
      setTextMode(false);

    }
  };


  const onNodesChange = useCallback(
    (changes) => {

      setDiagrams(prevDiagrams => prevDiagrams.map(diagram => {
        if (diagram.id === activeDiagramId) {
          return { ...diagram, nodes: applyNodeChanges(changes, diagram.nodes || []) };
        }
        return diagram;
      }));
    },
    [activeDiagramId]
   );

  

  

  const onEdgesChange = useCallback(
    (changes) => {
      alert('hi')
      setDiagrams(prevDiagrams => prevDiagrams.map(diagram => {
        if (diagram.id === activeDiagramId) {
          return { ...diagram, edges: applyEdgeChanges(changes, diagram.edges || []) };
        }
        return diagram;
      }));
    },
    [activeDiagramId]
  );



  const onConnect = useCallback(
    (params) => {
      const { source, target } = params;
      let newEdge;

      if (params.sourceHandle === 'midpoint' && params.targetHandle === 'midpoint') {
       

        newEdge = {
          ...params,
          markerEnd: { type: 'arrowclosed' },
          id: params.id,
          type: 'mindpoint', 
        }

      }
      else {
        
        newEdge = {
          ...params,
          id: params.id,
          type: 'customWithHandlers',
          markerEnd: { type: 'arrowclosed' },
        };
      }

      const updatedDiagrams = diagrams.map((diagram) => {
        if (diagram.id === activeDiagramId) {
          return {
            ...diagram,
            edges: [...diagram.edges, newEdge], 
          };
        }
        return diagram;
      });

      setDiagrams(updatedDiagrams);
    },
    [diagrams, activeDiagramId, setDiagrams]
  );





  const onConnectCenterPoints = (params) => {
    // Extract params and add a new edge based on center-point connection
    // const newEdge = {
    //   id: `edge-${Date.now()}`,            // Unique ID for the new edge
    //   source: params.source,               // Correct source (node or element ID)
    //   sourceHandle: params.sourceHandle,   // Handle for the source point (center)
    //   targetX: params.targetX,             // X coordinate of the target (drop point)
    //   targetY: params.targetY,             // Y coordinate of the target (drop point)
    //   target: null,                         // Target node is not assigned yet
    //   targetHandle: null,                  // Target handle is also not assigned
    //   type: 'customWithHandlers',
    //   markerEnd: { type: 'arrowclosed' },  // Arrow end marker
    // };

    // console.log("Creating new edge:", newEdge);

    // // Now, update the diagrams state with the new edge
    // setDiagrams((prevDiagrams) =>
    //   prevDiagrams.map((diagram) =>
    //     diagram.id === activeDiagramId
    //       ? { ...diagram, edges: [...diagram.edges, newEdge] }
    //       : diagram
    //   )
    // );
  };






  const activeDiagram = diagrams.find(
    (diagram) => diagram.id === activeDiagramId
  );


  const handleMainChange = (event, newValue) => {
    setValue(newValue);
  };



  const bringToFront = (nodeId) => {
    setDiagrams((prevDiagrams) =>
      prevDiagrams.map((diagram) => {
        if (diagram.id === activeDiagramId) {
          const maxZIndex = Math.max(...diagram.nodes.map((node) => node.style?.zIndex || 0)) + 1;
          return {
            ...diagram,
            nodes: diagram.nodes.map((node) => {
              if (node.id === nodeId) {
                return { ...node, style: { ...node.style, zIndex: maxZIndex } };
              }
              return node;
            }),
          };
        }
        return diagram; // Return the diagram unchanged
      })
    );

  };

  const sendToBack = (nodeId) => {
    setDiagrams((prevDiagrams) =>
      prevDiagrams.map((diagram) => {
        if (diagram.id === activeDiagramId) {
          const minZIndex = Math.min(...diagram.nodes.map((node) => node.style?.zIndex || 0)) - 1;
          return {
            ...diagram,
            nodes: diagram.nodes.map((node) => {
              if (node.id === nodeId) {
                return { ...node, style: { ...node.style, zIndex: minZIndex } };
              }
              return node;
            }),
          };
        }
        return diagram;
      })
    );
  };
  const [showHideBorder, setShowHideBorder] = useState(false);
  const handleHideBorder = () => {
    if (contextMenu?.id) {
      setTexts((prev) =>
        prev.map((t) => (t.id === contextMenu.id ? { ...t, borderColor: "transparent" } : t))
      );
    }
  };


  const handleMenuClick = (action) => {
    switch (action) {
      case "hideBorder":
        handleHideBorder(); // Make sure this is called correctly
        setContextMenu(null); // Optionally close the context menu after the action
        break;


      case "delete":
        setDiagrams((prevDiagrams) =>
          prevDiagrams.map((diagram) => {
            if (diagram.id === activeDiagramId) {
              return {
                ...diagram,
                nodes: diagram.nodes.filter((node) => node.id !== selectedNodeId),
              };
            }
            return diagram;
          })
        );
        setContextMenu(false)

        break;
      case "sendBack":
        sendToBack(selectedNodeId);
        setContextMenu(false)
        break;
      case "bringFront":
        bringToFront(selectedNodeId);
        setContextMenu(false)
        break;
      case "changeColor":
        // Optionally, you can open the color change modal here
        setColorModalOpen(true);
        setContextMenu(false)
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


  const handleColorChange = (newColor) => {




    setDiagrams((prevDiagrams) =>
      prevDiagrams.map((diagram) => {
        if (diagram.id === activeDiagramId) {
          return {
            ...diagram,
            nodes: diagram.nodes.map((node) =>
              node.id === selectedNodeId
                ? { ...node, style: { ...node.style, backgroundColor: newColor } }
                : node
            ),
          };
        }
        return diagram; // Return the diagram unchanged
      })
    );
    setColorModalOpen(false); // Close modal after color change
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleAddMatrix = () => {
    const newMatrixId = matrices.length + 1;
    const newMatrix = { id: newMatrixId, content: `Matrix ${newMatrixId} Content` };
    setMatrices([...matrices, newMatrix]);
    setActiveMatrixId(newMatrixId);
    setActiveTab(`matrix-${newMatrixId}`);
    setActiveTool("matrix");
    handleMenuClose();
  };

  const handleAddNavigation = () => {
    const newNavigationId = navigations.length + 1;
    const newNavigation = { id: newNavigationId, content: `Navigation ${newNavigationId} Content` };
    setNavigations([...navigations, newNavigation]);
    setActiveNavigationId(newNavigationId);
    setActiveTab(`navigation-${newNavigationId}`);
    setActiveTool("navigation");
    handleMenuClose();
  };

  const handleAddViewpoint = () => {
    const newViewpointId = viewpoints.length + 1;
    const newViewpoint = { id: newViewpointId, content: `Viewpoint ${newViewpointId} Content` };
    setViewpoints([...viewpoints, newViewpoint]);
    setActiveViewpointId(newViewpointId);
    setActiveTab(`viewpoint-${newViewpointId}`)


    setActiveTool("viewpoint");
    handleMenuClose();
  };

  const handleAddRoadmap = () => {
    const newRoadmapId = roadmaps.length + 1;
    const newRoadmap = { id: newRoadmapId, content: `Roadmap ${newRoadmapId} Content` };
    setRoadmaps([...roadmaps, newRoadmap]);
    setActiveRoadmapId(newRoadmapId);
    setActiveTab(`roadmap-${newRoadmapId}`);
    setActiveTool("roadmap");
    handleMenuClose();
  };



  const handleCloseTab = (tabId) => {
    setTabs((prevTabs) => {
      const updatedTabs = prevTabs.filter((tab) => `${tab.type}-${tab.id}` !== tabId);


      if (activeTab === tabId) {
        const closingTabIndex = prevTabs.findIndex((tab) => `${tab.type}-${tab.id}` === tabId);
        let newActiveTab = null;

        if (updatedTabs.length > 0) {

          if (closingTabIndex === prevTabs.length - 1) {
            newActiveTab = `${updatedTabs[updatedTabs.length - 1].type}-${updatedTabs[updatedTabs.length - 1].id}`;
          } else {

            newActiveTab = `${updatedTabs[closingTabIndex]?.type}-${updatedTabs[closingTabIndex]?.id}`;
          }
        }


        setActiveTab(newActiveTab);
      }

      return updatedTabs;
    });
  };




  useEffect(() => {
    setTabs([
      ...diagrams.map((diagram) => ({ type: 'diagram', id: diagram.id })),
      ...catalogs.map((catalog) => ({ type: 'catalog', id: catalog.id })),
      ...matrices.map((matrix) => ({ type: 'matrix', id: matrix.id })),
      ...navigations.map((navigation) => ({ type: 'navigation', id: navigation.id })),
      ...viewpoints.map((viewpoint) => ({ type: 'viewpoint', id: viewpoint.id })),
      ...roadmaps.map((roadmap) => ({ type: 'roadmap', id: roadmap.id })),
    ]);
  }, [diagrams, catalogs, matrices, navigations, viewpoints, roadmaps]);
  const handleCloseAllTabs = () => {
    setTabs([]);
    setActiveTab(null);
  };

  const handleArchitectureChange = (event) => {
    const selectedArchitecture = event.target.value;
    setArchitecture(event.target.value);

    // Save the current state of tabs and artifacts for the old architecture
    if (architecture) {
      setSavedTabs((prevSavedTabs) => ({
        ...prevSavedTabs,
        [architecture]: [...tabs],
      }));
      setSavedArtifacts((prevSavedArtifacts) => ({
        ...prevSavedArtifacts,
        [architecture]: { diagrams, catalogs, matrices, navigations, viewpoints, roadmaps }, // Save ->all artifacts
      }));
    }

    // Update the new architecture and check if there is saved state to load
    setArchitecture(selectedArchitecture);
    setAddArtifactEnabled(!!selectedArchitecture);

    if (selectedArchitecture) {

      const savedTabsForArchitecture = savedTabs[selectedArchitecture] || [];
      const savedArtifactsForArchitecture = savedArtifacts[selectedArchitecture] || {
        diagrams: [],
        catalogs: [],
        matrices: [],
        navigations: [],
        viewpoints: [],
        roadmaps: [],
      };


      setTabs(savedTabsForArchitecture);
      setDiagrams(savedArtifactsForArchitecture.diagrams || []);
      setCatalogs(savedArtifactsForArchitecture.catalogs || []);
      setMatrices(savedArtifactsForArchitecture.matrices || []);
      setNavigations(savedArtifactsForArchitecture.navigations || []);
      setViewpoints(savedArtifactsForArchitecture.viewpoints || []);
      setRoadmaps(savedArtifactsForArchitecture.roadmaps || []);
      setActiveTab(savedTabsForArchitecture.length ? savedTabsForArchitecture[0] : null); // Set first tab as active if any
    } else {

      setTabs([]);
      setDiagrams([]);
      setCatalogs([]);
      setMatrices([]);
      setNavigations([]);
      setViewpoints([]);
      setRoadmaps([]);
      setActiveTab(null);
    }
  };



  const handleTextfield = (e, id) => {
    e.preventDefault(); // Prevent the default context menu from appearing
    setContextMenu({
      id: id,
      x: e.clientX,
      y: e.clientY,
    });
    setContextMenuOptions("textField");
  };

  const onNodeClick = (event, node) => {
    setSelectedNodeId(node.id);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' && selectedNodeId) {
        // Filter out the node with selectedNodeId from activeDiagram.nodes
        const updatedDiagrams = diagrams.map((diagram) => {
          if (diagram.id === activeDiagramId) {
            return {
              ...diagram,
              nodes: diagram.nodes.filter((node) => node.id !== selectedNodeId),
            };
          }
          return diagram;
        });

        setDiagrams(updatedDiagrams);
        setSelectedNodeId(null); // Clear the selection after deletion
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedNodeId, diagrams, activeDiagramId]);



  const [text, setText] = useState("Container");
  const [isEditing, setIsEditing] = useState(false)
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e, id) => {
    const newTextValue = e.target.value;

    // Update texts locally
    setTexts((prev) =>
      prev.map((textItem) =>
        textItem.id === id ? { ...textItem, text: newTextValue } : textItem
      )
    );

    // Update texts in the active diagram
    setDiagrams(prevDiagrams =>
      prevDiagrams.map(diagram =>
        diagram.id === activeDiagramId
          ? {
            ...diagram,
            texts: diagram.texts.map((textItem) =>
              textItem.id === id ? { ...textItem, text: newTextValue } : textItem
            )
          }
          : diagram
      )
    );
  };



  const handleBlur = () => {
    setIsEditing(false);
  };
  useEffect(() => {
    const activeDiagram = diagrams.find(diagram => diagram.id === activeDiagramId);

    if (activeDiagram) {
      setContainers(activeDiagram.containers || []);
      setTexts(activeDiagram.texts || []);
    }
  }, [activeDiagramId, diagrams]);

  const handleContainerTextChange = (e, containerId) => {
    const newTextValue = e.target.value;

    // Update container text in the active diagram
    setDiagrams(prevDiagrams =>
      prevDiagrams.map(diagram =>
        diagram.id === activeDiagramId
          ? {
            ...diagram,
            containers: diagram.containers.map(container =>
              container.id === containerId ? { ...container, text: newTextValue } : container
            )
          }
          : diagram
      )
    );
  };

  // Validate connections

  const isValidConnection = useCallback((connection) => {
    const isMidpointSource = connection.source?.startsWith('midnode-');
    const isMidpointTarget = connection.target?.startsWith('midnode-');

    return (isMidpointSource && isMidpointTarget) ||
      (!isMidpointSource && !isMidpointTarget);
  }, []);

  const nodeTypes = {
    midpointNode: MidpointNode,
  };


  return (
    <div>
      <LeftPane open={open} onClose={() => setOpen(false)} props={props}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <UserTabs
            value={value}
            handleChange={handleMainChange}
            tabs={leftpanetabs}
            language={props.language}
            theme={props.theme}
            onClick={() => props.settree("tree1")}
          />
        </div>
        <div>
          <DropDownInputField props={props} />
        </div>
        <div>
          {view === 0 && (
            <EnterpriseContent value={value} language={props.language} />
          )}
        </div>
      </LeftPane>

      <RightPane
        open={open}
        props={props}
        handleDrawerOpen={() => setOpen(true)}
      >
        <div style={{ display: "flex", width: "100%" }}>
          {/* <div style={{
            width: "25%",
            display: "flex",
            alignItems: "center",
            marginLeft: open ? "25px" : "50px",
          }}>
            Architecture Diagrams
          </div> */}
          <div style={{
            width: "25%",
            display: "flex",
            alignItems: "center",
            marginLeft: open ? "25px" : "50px",
          }}>
            <FormControl
              variant="outlined"
              size="small"
              sx={{
                minWidth: 220,
              }}

            >
              <Select
                value={architecture}
                onChange={handleArchitectureChange}
                displayEmpty
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"

                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  <em>Select Architecture</em> {/* Placeholder option */}
                </MenuItem>
                <MenuItem value="Eaxee">Eaxee</MenuItem>
                <MenuItem value="Noneaxee">Noneaxee</MenuItem>
                <MenuItem value="archimate">archimate</MenuItem>
              </Select>
            </FormControl>
          </div>


          <div style={{
            width: "75%",
            display: "flex",
            justifyContent: "flex-end",

            // border:"2px solid red"
          }}>
            {/* Button with Menu */}

            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => { handleAddDiagram(); handleMenuClose(); }}>Diagram</MenuItem>
              <MenuItem onClick={handleAddCatalog}>Catalog</MenuItem>
              <MenuItem onClick={handleAddMatrix}>Matrix</MenuItem>
              <MenuItem onClick={handleAddNavigation}>Navigation</MenuItem>
              <MenuItem onClick={handleAddViewpoint}>Viewpoint</MenuItem>
              <MenuItem onClick={handleAddRoadmap}>Roadmap</MenuItem>
            </Menu>
            {/* <button onClick={handleCloseAllTabs}>Close All</button> */}
            <IconToolbar
              theme={props.theme}
              handleMenuOpen={handleMenuOpen}
              handleCloseAllTabs={handleCloseAllTabs}
              disabled={!addArtifactEnabled}

            />


          </div>
        </div>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          {tabs.map((tab) => (
            <Tab
              key={`${tab.type}-${tab.id}`}
              value={`${tab.type}-${tab.id}`}
              onClick={() => {
                if (tab.type == "diagram") {
                  setActiveDiagramId(tab.id);
                }
              }}
              label={
                <span>
                  {`${tab.type.charAt(0).toUpperCase() + tab.type.slice(1)} ${tab.id}`}
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent switching tabs when closing
                      handleCloseTab(`${tab.type}-${tab.id}`);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </span>
              }
            />
          ))}
        </Tabs>







        <div style={{ display: "flex", flex: 1 }}>
          {typeof activeTab === "string" && activeTab?.startsWith("catalog-") ? (
            <div>{catalogs.find((cat) => `catalog-${cat.id}` === activeTab)?.content}</div>
          ) : typeof activeTab === "string" && activeTab?.startsWith("matrix-") ? (
            <div>{matrices.find((mat) => `matrix-${mat.id}` === activeTab)?.content}</div>
          ) : typeof activeTab === "string" && activeTab?.startsWith("navigation-") ? (
            <div>{navigations.find((nav) => `navigation-${nav.id}` === activeTab)?.content}</div>
          ) : typeof activeTab === "string" && activeTab?.startsWith("viewpoint-") ? (
            <div>{viewpoints.find((view) => `viewpoint-${view.id}` === activeTab)?.content}</div>
          ) : typeof activeTab === "string" && activeTab?.startsWith("roadmap-") ? (
            <div>{roadmaps.find((road) => `roadmap-${road.id}` === activeTab)?.content}</div>
          ) : typeof activeTab === "string" && activeTab?.startsWith("diagram-") ? (
            activeDiagram && (
              <>
                <Iconbox onSelectImage={handleSelectImage} props={props} />
                <div
                  id="canvas"
                  style={{ width: "100%", position: "relative", transition: "all 0.3s ease" }}

                  onClick={handleCanvasClick}
                  onContextMenu={handleCanvasRightClick}
                  onMouseEnter={() => setIsDroppable(true)}
                  onMouseLeave={() => setIsDroppable(false)}
                >
                  <Rnd
                    default={{
                      x: open ? 850 : 1240,
                      y: 20,
                    }}
                    bounds="parent"
                    position={{ x: open ? 850 : 1240, y: 20 }}
                  >
                    {/* <DiagramButton /> */}
                  </Rnd>



                  <ReactFlow
                    nodes={minimized ? [] : activeDiagram.nodes}
                    edges={minimized ? [] : activeDiagram.edges}
                    edgeTypes={{
                      customWithHandlers: (props) => (
                        <CustomEdgeWithHandlers {...props} onConnectCenterPoints={onConnectCenterPoints} />
                      ),
                    }}
                    defaultEdgeOptions={{
                      type: 'custom'
                    }}
                    deleteKeyCode={['Backspace', 'Delete']}
                    onNodesChange={onNodesChange}
                    nodeTypes={nodeTypes}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    isConnectable={false}
                    connectionMode="loose"
                    style={{ width: '100%', height: '100%' }}
                    onNodeContextMenu={(event, node) => handleRightClick(event, node.id)}
                    onNodeClick={onNodeClick}
                  >

                    <Controls />
                    <Background />
                    {containers.map((container, index) => (
                      <Rnd
                        key={container.id} // Ensure unique key per container
                        default={{
                          x: container.x,
                          y: container.y,
                          width: container.width,
                          height: container.height
                        }}
                        bounds="parent"
                        onDragStop={(e, data) => {
                          // Update container position only in the active diagram
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
                          border: '1px solid black',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'black',
                          fontSize: '16px',
                          position: 'absolute',
                          flexDirection: 'column'
                        }}
                      >
                        <div
                          style={{
                            width: '100%',
                            padding: '5px',
                            backgroundColor: 'lightgray',
                            borderBottom: '1px solid black',
                            cursor: 'pointer',
                            position: 'absolute',
                            top: '0',
                            textAlign: 'center'
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
                                width: '100%',
                                textAlign: 'center',
                                border: 'none',
                                outline: 'none'
                              }}
                            />
                          ) : (
                            <span>{container.text || 'Container'}</span>
                          )}
                        </div>
                      </Rnd>
                    ))}

                  </ReactFlow>




                  {colorModalOpen && (
                    <ModalChangeColor
                      open={colorModalOpen}
                      onClose={() => setColorModalOpen(false)}
                      onChangeColor={handleColorChange}
                      theme={props.theme}
                      language={props.language}
                    // initialColor={nodes.find(node => node.id === selectedNodeId)?.style?.backgroundColor}
                    />
                  )}

                  {texts.map(({ id, x, y, text, borderColor = "black" }) => (
                    <Rnd
                      key={id}
                      position={{ x, y }}
                      onDragStop={(e, data) => {
                        setTexts((prev) =>
                          prev.map((t) => (t.id === id ? { ...t, x: data.x, y: data.y } : t))
                        );
                        // Update the position in `diagrams` for the active diagram
                        setDiagrams((prevDiagrams) =>
                          prevDiagrams.map((diagram) =>
                            diagram.id === activeDiagramId
                              ? {
                                ...diagram,
                                texts: diagram.texts.map((t) =>
                                  t.id === id ? { ...t, x: data.x, y: data.y } : t
                                ),
                              }
                              : diagram
                          )
                        );
                      }}
                      bounds="parent"
                      style={{ cursor: "move" }}
                    >
                      {editingId === id ? (
                        <input
                          type="text"
                          value={text}
                          onBlur={() => setEditingId(null)}
                          onChange={(e) => handleTextChange(e, id)}
                          autoFocus
                          style={{
                            width: "100%",
                            height: "100%",
                            padding: "5px",
                            fontSize: "12px",
                            textAlign: "center",
                            border: `1px solid ${borderColor}`,
                            backgroundColor: "white",
                          }}
                          aria-label="Edit text"
                        />
                      ) : (
                        <div
                          onDoubleClick={() => setEditingId(id)}
                          onContextMenu={(e) => handleTextfield(e, id)}
                          style={{
                            width: "100%",
                            height: "100%",
                            padding: "5px",
                            fontSize: "12px",
                            textAlign: "center",
                            border: `1px solid ${borderColor}`,
                            backgroundColor: "transparent",
                            cursor: "text",
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") setEditingId(id);
                          }}
                        >
                          {text || "Type here..."}
                        </div>
                      )}
                    </Rnd>
                  ))}

                  <ContextMenu
                    contextMenu={contextMenu}

                    handleMenuClick={handleMenuClick}
                    getBackgroundColor={getBackgroundColor}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    showHideBorder={contextMenuOptions === "textField"}
                    theme={props.theme}
                  />



                </div>
              </>
            )
          ) : null}
        </div>




      </RightPane>


    </div>
  );
};
const mapStateToProps = (state) => ({
  language: state.language,
  theme: state.theme,
  userdetail: state.userdetail,
});

const mapDispatchToProps = (dispatch) => ({
  settree: (data) => dispatch({ type: "SET_TREE", payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Architecture);