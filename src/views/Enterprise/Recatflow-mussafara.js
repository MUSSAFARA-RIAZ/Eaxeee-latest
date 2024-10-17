import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import LeftPane from "../Layout/Leftpane";
import RightPane from "../Layout/Rightpane";
import { UserTabs } from "./Components/Enterprise_iconsTab";
import DropDownInputField from "./Components/DropDownInputField";
import Iconbox from "./Components/Iconbox";
import ModalChangeColor from "./Components/Modals/ModalChangeColor";
import { Rnd } from "react-rnd";
import IconToolbar from "./Components/IconToolbar";
import ContextMenu from "./ContextMenu";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { getStraightPath } from "@xyflow/react"; // Import the path calculation function

// Custom connection line component with arrowhead
const CustomConnectionLine = ({ fromX, fromY, toX, toY, connectionLineStyle }) => {
  const [edgePath] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });

  return (
    <g>
      {/* Draw the edge path */}
      <path style={connectionLineStyle} fill="none" d={edgePath} />
      {/* Circle at the end of the line (you can change it to an arrow) */}
      <marker
        id="arrow"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
      </marker>
      {/* Apply the marker at the end of the path */}
      <path
        d={edgePath}
        fill="none"
        stroke="black"
        strokeWidth="2"
        markerEnd="url(#arrow)" // Attach the arrowhead marker
      />
    </g>
  );
};

const CanvasWithReactFlow = (props) => {
  const [open, setOpen] = useState(true);
  const [droppedImages, setDroppedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedImageColor, setSelectedImageColor] = useState("");
  const [selectedImageTitle, setSelectedImageTitle] = useState("");
  const [fullScreen, setfullScreen] = useState(false);
  const [isDroppable, setIsDroppable] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [clickedImageIndex, setClickedImageIndex] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [order, setOrder] = useState([]);

  const [isDragging, setIsDragging] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isBackgroundHidden, setIsBackgroundHidden] = useState(
    Array(droppedImages.length).fill(false)
  );

  // React Flow state
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    setOrder(droppedImages.map((_, index) => index));
  }, [droppedImages]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (selectedImage) {
        setMousePos({ x: event.clientX, y: event.clientY });
      }
      if (isDragging && draggingIndex !== null) {
        const canvasRect = document.getElementById("canvas").getBoundingClientRect();
        const x = event.clientX - canvasRect.left - offset.x;
        const y = event.clientY - canvasRect.top - offset.y;

        setDroppedImages((prev) =>
          prev.map((img, index) =>
            index === draggingIndex ? { ...img, x, y } : img
          )
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [selectedImage, isDragging, draggingIndex, offset]);

  const handleSelectImage = (imageSrc, backgroundColor, title) => {
    setSelectedImage(imageSrc);
    setSelectedImageColor(backgroundColor);
    setSelectedImageTitle(title);
  };

  const handleCanvasClick = (event) => {
    const canvasRect = event.target.getBoundingClientRect();

    if (selectedImage && isDroppable && event.button === 0) {
      const x = event.clientX - canvasRect.left;
      const y = event.clientY - canvasRect.top;

      // Add image as a node in React Flow
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
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              <span>{selectedImageTitle}</span>
            </div>
          ),
        },
        style: {
          backgroundColor: selectedImageColor,
          padding: "10px",
          borderRadius: "5px",
        },
      };
      setNodes((prevNodes) => [...prevNodes, newNode]);

      // Clear selected image
      setSelectedImage(null);
      setIsBackgroundHidden((prev) => [...prev, false]);
    }
    setContextMenu(null);
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    setSelectedImage(null);
  };

  const handleRectangleRightClick = (event, index) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX - 400,
      y: event.clientY - 100,
    });
    setClickedImageIndex(index);
  };

  const handleMenuClick = (action) => {
    switch (action) {
      case "delete":
        if (clickedImageIndex !== null) {
          setDroppedImages((prev) =>
            prev.filter((_, i) => i !== clickedImageIndex)
          );
          setIsBackgroundHidden((prev) =>
            prev.filter((_, i) => i !== clickedImageIndex)
          );
          setOrder((prev) =>
            prev.filter((index) => index !== clickedImageIndex)
          );
          setOrder((prev) =>
            prev.map((index) => (index > clickedImageIndex ? index - 1 : index))
          );
        }
        break;
      case "sendBack":
        if (clickedImageIndex !== null) {
          setOrder((prev) => {
            const newOrder = [...prev];
            const currentIndex = newOrder.indexOf(clickedImageIndex);
            if (currentIndex > 0) {
              [newOrder[currentIndex - 1], newOrder[currentIndex]] = [
                newOrder[currentIndex],
                newOrder[currentIndex - 1],
              ];
            }
            return newOrder;
          });
        }
        break;
      case "bringFront":
        if (clickedImageIndex !== null) {
          setOrder((prev) => {
            const newOrder = [...prev];
            const currentIndex = newOrder.indexOf(clickedImageIndex);
            if (currentIndex < newOrder.length - 1) {
              [newOrder[currentIndex + 1], newOrder[currentIndex]] = [
                newOrder[currentIndex],
                newOrder[currentIndex + 1],
              ];
            }
            return newOrder;
          });
        }
        break;
      case "changeColor":
        setIsColorModalOpen(true);
        break;
      default:
        break;
    }
    setContextMenu(null);
  };

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const getBackgroundColor = (item) => {
    return hoveredItem === item
      ? props.theme === "dark"
        ? "rgba(165, 209, 73, 0.5)"
        : "rgba(33, 88, 164, 0.2)"
      : "transparent";
  };

  const handleMouseEnterDropZone = () => {
    setIsDroppable(true);
  };

  const handleMouseLeaveDropZone = () => {
    setIsDroppable(false);
  };

  const handleChangeColor = (newColor) => {
    if (clickedImageIndex !== null && newColor) {
      setDroppedImages((prev) =>
        prev.map((image, index) =>
          index === clickedImageIndex
            ? { ...image, backgroundColor: newColor }
            : image
        )
      );
    }
    setIsColorModalOpen(false);
  };

  const handleHideBackground = () => {
    setIsBackgroundHidden((prev) => prev.map((hidden) => !hidden));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingIndex(null);
  };

  // React Flow Handlers
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: 'arrowclosed' } }, eds)),
    []
  );

  return (
    <div>
      <LeftPane open={open} onClose={() => setOpen(false)} props={props}>
        <div></div>
        <DropDownInputField props={props} />
      </LeftPane>

      <RightPane open={open} props={props} handleDrawerOpen={() => setOpen(true)}>
        <div></div>
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
            onContextMenu={handleRightClick}
            onMouseEnter={handleMouseEnterDropZone}
            onMouseLeave={handleMouseLeaveDropZone}
            onMouseUp={handleMouseUp}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              connectionMode="loose" // Set connection mode to easy
              fitView
              onClick={handleCanvasClick}
              onContextMenu={handleRightClick}
              style={{ width: "100%", height: "400px" }}
              connectionLineComponent={CustomConnectionLine} // Add custom connection line component
            >
              <MiniMap />
              <Controls />
              <Background />
            </ReactFlow>
          </div>
        </div>
      </RightPane>

      <IconToolbar props={props} />

      {isColorModalOpen && (
        <ModalChangeColor
          isOpen={isColorModalOpen}
          onClose={() => setIsColorModalOpen(false)}
          onChangeColor={handleChangeColor}
        />
      )}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onAction={handleMenuClick}
        />
      )}
    </div>
  );
};

export default CanvasWithReactFlow;
