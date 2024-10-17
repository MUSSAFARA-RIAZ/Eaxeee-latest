import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import LeftPane from "../Layout/Leftpane";
import RightPane from "../Layout/Rightpane";
import { EnterpriseContent, UserTabs } from "./Components/Enterprise_iconsTab";
import DropDownInputField from "./Components/DropDownInputField";
import Iconbox from "./Components/Iconbox";
import ModalChangeColor from "./Components/Modals/ModalChangeColor";
import { Rnd } from "react-rnd";
import IconToolbar from "./Components/IconToolbar";

import objectdefault from "../../Assets/Images/objectcharcoal.png";
import objectdark from "../../Assets/Images/objectpale.png";
import processdefault from "../../Assets/Images/processcharcoal.png";
import processdark from "../../Assets/Images/processpale.png";
import blueprintdefault from "../../Assets/Images/blueprintcharcoal.png";
import blueprintdark from "../../Assets/Images/blueprintpale.png";
import ContextMenu from "./ContextMenu";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { getStraightPath } from "@xyflow/react";
import { Tooltip } from "@mui/material";
import ArchitectureButton from "../../components/CustomButton/ArchitectureButton";
import { Image } from "@mui/icons-material";

const CustomConnectionLine = ({ fromX, fromY, toX, toY, connectionLineStyle }) => {
  const [edgePath] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });

  return (
    <g>
      <path style={connectionLineStyle} fill="none" d={edgePath} />
      <marker
        id="arrow"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="black" stroke="black" strokeWidth="1.5" />
      </marker>
      <path
        d={edgePath}
        fill="red"
        stroke="black"
        strokeWidth="2.5"
        markerEnd="url(#arrow)"
      />
    </g>
  );
};

const Architecture = (props) => {
  const [open, setOpen] = useState(true);
  const [droppedImages, setDroppedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedImageColor, setSelectedImageColor] = useState("");
  const [selectedImageTitle, setSelectedImageTitle] = useState("");
  const [isDroppable, setIsDroppable] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [fullScreen, setfullScreen] = useState(false);

  // Track mouse movement to move the image with the pointer
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (selectedImage) {
        setMousePos({ x: event.clientX, y: event.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [selectedImage]);

  // Handle image selection
  const handleSelectImage = (imageSrc, backgroundColor, title) => {
    setSelectedImage(imageSrc);
    setSelectedImageColor(backgroundColor);
    setSelectedImageTitle(title);
  };

  // Paste the image node on left click, continue selection until right click
  // Handle left-click to paste and right-click to deselect image
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(true); // New state for background visibility

  const handleHideBackground = (visible) => {
    setIsBackgroundVisible(visible);
  };

  const handleCanvasClick = (event) => {
    const canvasRect = event.target.getBoundingClientRect();

    if (selectedImage && isDroppable && event.button === 0) {
      const x = event.clientX - canvasRect.left;
      const y = event.clientY - canvasRect.top;

      const newNode = {
        id: `${nodes.length + 1}`,
        type: "default",
        position: { x, y },
        data: {
          label: (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={selectedImage}
                alt="Dropped"
                style={{
                  position: "absolute",
                  width: "29px",
                  height: "24px",
                  margin: "auto",
                  top: 0,
                  right: 0,
                }}
              />
              <span style={{ fontSize: "12px", color: "black", textAlign: "center", display: "flex" }}>
                {selectedImageTitle}
              </span>
            </div>
          ),
        },
        style: {
          backgroundColor: isBackgroundVisible ? selectedImageColor : "transparent", // Conditional background color
          padding: "10px",
          borderRadius: "5px",
        },
      };

      setNodes((prevNodes) => [...prevNodes, newNode]);
    }

    if (event.button === 2) {
      setSelectedImage(null);
    }

    setContextMenu(null);
  };


  // Add a right-click handler on the canvas to also clear selected image
  useEffect(() => {
    const handleRightClickOnCanvas = (event) => {
      if (event.button === 2) {
        setSelectedImage(null); // Deselect image on right-click anywhere on the canvas
        event.preventDefault(); // Prevent the default right-click context menu
      }
    };

    const canvas = document.getElementById("canvas");
    canvas.addEventListener("contextmenu", handleRightClickOnCanvas);

    return () => {
      canvas.removeEventListener("contextmenu", handleRightClickOnCanvas);
    };
  }, []);


  const handleRightClick = (event, nodeId) => {
    event.preventDefault();
    setSelectedNodeId(nodeId);
    setContextMenu({ x: event.clientX, y: event.clientY });

    // Clear the selected image on right-click
    setSelectedImage(null);
  };


  const bringToFront = (nodeId) => {
    setNodes((prevNodes) => {
      const maxZIndex = Math.max(...prevNodes.map((node) => node.style?.zIndex || 0)) + 1; // Get the maximum zIndex
      return prevNodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, style: { ...node.style, zIndex: maxZIndex } }; // Assign the new max zIndex to the node
        }
        return node; // Return the node unchanged
      });
    });
  };

  const sendToBack = (nodeId) => {
    setNodes((prevNodes) => {
      const minZIndex = Math.min(...prevNodes.map((node) => node.style?.zIndex || 0)) - 1; // Get the minimum zIndex
      return prevNodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, style: { ...node.style, zIndex: minZIndex } }; // Assign the new min zIndex to the node
        }
        return node; // Return the node unchanged
      });
    });
  };


  const handleMenuClick = (action) => {
    switch (action) {
      case "delete":
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== selectedNodeId));
        break;
      case "sendBack":
        sendToBack(selectedNodeId);
        break;
      case "bringFront":
        bringToFront(selectedNodeId);
        break;
      case "changeColor":
        setColorModalOpen(true); // Open the color change modal
        break;
      default:
        break;
    }
  };

  const handleColorChange = (newColor) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === selectedNodeId
          ? { ...node, style: { ...node.style, backgroundColor: newColor } }
          : node
      )
    );
    setColorModalOpen(false); // Close modal after color change
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

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const handleHideRectangle = () => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => ({
        ...node,
        style: {
          ...node.style,
          backgroundColor: null, // Set the background color to null
        },
      }))
    );
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds)),
    []
  );
  const [value, setValue] = useState(0);
  console.log("colormodal open", colorModalOpen);
  const objectsrc = props.theme === "dark" ? objectdark : objectdefault;
  const processsrc = props.theme === "dark" ? processdark : processdefault;
  const artifactsrc = props.theme === "dark" ? blueprintdark : blueprintdefault;
  const tabs = [
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
  const handleMainChange = (event, newValue) => {
    setValue(newValue);
  };

  const view = 0;

  return !fullScreen ? (
    <div>
      <LeftPane open={open} onClose={() => setOpen(false)} props={props}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <UserTabs
            value={value}
            handleChange={handleMainChange}
            tabs={tabs}
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
      <RightPane open={open} props={props} handleDrawerOpen={() => setOpen(true)}>
        <div style={{ display: "flex", width: "100%", }}>
          <div
            style={{
              width: "25%",
              display: "flex",
              alignItems: "center",
              marginLeft: open ? "25px" : "50px",
            }}
          >
            Architecture 1 : Diagram 2
          </div>

          <div
            style={{
              width: "90%",
              marginLeft: "2%",

              display: "flex",
              justifyContent: "center",


            }}
          >
            {/* <ArchitectureButton
              title="Hide Rectangle "
              startIcon={<Image />}
              Theme={props.theme}
              onClick={handleHideRectangle}

            /> */}
            <IconToolbar   theme={props.theme}/>

          </div>
        </div>
        <div style={{ display: "flex", flex: 1 }}>
          <Iconbox onSelectImage={handleSelectImage} props={props} />

          <div
            id="canvas"
            style={{
              width: "100%",
              minHeight: "400px",
              position: "relative",
              overflow: "auto",
            }}
            onClick={handleCanvasClick}
            onMouseEnter={() => setIsDroppable(true)}
            onMouseLeave={() => setIsDroppable(false)}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              connectionMode="loose"
              onNodeContextMenu={(event, node) => handleRightClick(event, node.id)}
              style={{ width: "100%", height: "400px" }}
              connectionLineComponent={CustomConnectionLine}
            >
              {/* <MiniMap /> */}
              <Controls />
              <Background />
            </ReactFlow>
            <Rnd
              default={{
                x: open ? 850 : 1240,
                y: 20,

              }}
              bounds="parent"
              position={{ x: open ? 850 : 1240, y: 20 }}
            >
              <button onClick={() => setfullScreen(false)} >Minimize</button>
              <button onClick={() => setfullScreen(true)} >Full Screen</button>

            </Rnd>

            <ContextMenu
              contextMenu={contextMenu}
              fullScreen={fullScreen}
              handleMenuClick={handleMenuClick}
              getBackgroundColor={getBackgroundColor}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              theme={props.theme}
            />
            {colorModalOpen && (
              <ModalChangeColor
                open={colorModalOpen}  // Add the open prop here
                onClose={() => setColorModalOpen(false)}
                onChangeColor={handleColorChange}
                theme={props.theme}
                language={props.language}
              // initialColor={nodes.find(node => node.id === selectedNodeId)?.style?.backgroundColor}
              />
            )}


          </div>
        </div>
      </RightPane>
    </div>
  ) : (
    <>


      <div style={{ display: "flex", width: "100%", }}>
        <div
          style={{
            width: "25%",
            display: "flex",
            alignItems: "center",
            marginLeft: open ? "25px" : "50px",
          }}
        >
          Architecture 1 : Diagram 2
        </div>

        <div
          style={{
            width: "90%",
            marginLeft: "2%",

            display: "flex",          // Make the container a flexbox

            justifyContent: "center",
            // border: "2px solid red",

          }}
        >
          <IconToolbar
            theme={props.theme}
            handleHideBackground={handleHideBackground}
          />

        </div>
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        <Iconbox onSelectImage={handleSelectImage} props={props} />

        <div
          id="canvas"
          style={{
            width: "100%",
            minHeight: "400px",
            position: "relative",
            overflow: "auto",
          }}
          onClick={handleCanvasClick}
          onMouseEnter={() => setIsDroppable(true)}
          onMouseLeave={() => setIsDroppable(false)}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            connectionMode="loose"
            onNodeContextMenu={(event, node) => handleRightClick(event, node.id)}
            style={{ width: "100%", height: "400px" }}
            connectionLineComponent={CustomConnectionLine}
          >
            {/* <MiniMap /> */}
            <Controls />
            <Background />
          </ReactFlow>
          <Rnd
            default={{
              x: open ? 850 : 1240,
              y: 20,

            }}
            bounds="parent"
            position={{ x: open ? 850 : 1240, y: 20 }}
          >
            <button onClick={() => setfullScreen(false)} >Minimize</button>
            <button onClick={() => setfullScreen(true)} >Full Screen</button>

          </Rnd>

          <ContextMenu
            contextMenu={contextMenu}
            fullScreen={fullScreen}
            handleMenuClick={handleMenuClick}
            getBackgroundColor={getBackgroundColor}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            theme={props.theme}
          />
          {colorModalOpen && (
            <ModalChangeColor
              open={colorModalOpen}  // Add the open prop here
              onClose={() => setColorModalOpen(false)}
              onChangeColor={handleColorChange}
              theme={props.theme}
              language={props.language}
            // initialColor={nodes.find(node => node.id === selectedNodeId)?.style?.backgroundColor}
            />
          )}


        </div>
      </div>

    </>
  )
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
