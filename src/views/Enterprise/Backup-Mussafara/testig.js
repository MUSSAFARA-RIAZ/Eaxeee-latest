import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import LeftPane from "../../Layout/Leftpane";
import RightPane from "../../Layout/Rightpane";
import { UserTabs } from "../Components/Enterprise_iconsTab";
import DropDownInputField from "../Components/DropDownInputField";
import Iconbox from "../Components/Iconbox";
import ModalChangeColor from "../Components/Modals/ModalChangeColor";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ImageIcon from '@mui/icons-material/Image';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LoopIcon from '@mui/icons-material/Loop';
import SaveIcon from '@mui/icons-material/Save';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import darktheme from "../../Themes/dark_theme.module.css";
import lighttheme from "../../Themes/light_theme.module.css";
import defaulttheme from "../../Themes/default_theme.module.css";
import { fontSize } from "@mui/system";
import { Rnd } from "react-rnd"
// import SaveIcon from '@mui/icons-material/Save';

const Architecture = (props) => {
  const [open, setOpen] = useState(true);
  const [droppedImages, setDroppedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedImageColor, setSelectedImageColor] = useState("");
  const [selectedImageTitle, setSelectedImageTitle] = useState("");
  const [isDroppable, setIsDroppable] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [clickedImageIndex, setClickedImageIndex] = useState(null);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [activeColor, setActiveColor] = useState('');

  // New state for dragging
  const [isDragging, setIsDragging] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // New state for background visibility
  const [isBackgroundHidden, setIsBackgroundHidden] = useState(Array(droppedImages.length).fill(false));

  // New state for order
  const [order, setOrder] = useState([]);

  useEffect(() => {
    // Initialize order on droppedImages change
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

      setDroppedImages((prev) => [
        ...prev,
        {
          src: selectedImage,
          x,
          y,
          backgroundColor: selectedImageColor,
          title: selectedImageTitle,
        },
      ]);
      // Update background hidden state
      setIsBackgroundHidden((prev) => [...prev, false]); // Initially, the background is not hidden
    }
    setContextMenu(null); // Hide context menu
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    setSelectedImage(null); // Unselect image on right-clicking canvas
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
          // Remove the image from droppedImages
          setDroppedImages((prev) => {
            const newDroppedImages = prev.filter((_, i) => i !== clickedImageIndex);
            return newDroppedImages;
          });

          // Remove the corresponding entry from isBackgroundHidden
          setIsBackgroundHidden((prev) => prev.filter((_, i) => i !== clickedImageIndex));

          // Update order by filtering out the deleted index
          setOrder((prev) => prev.filter((index) => index !== clickedImageIndex));

          // Adjust the indices in order
          setOrder((prev) => prev.map((index) => index > clickedImageIndex ? index - 1 : index));
        }
        break;
      case "sendBack":
        if (clickedImageIndex !== null) {
          setOrder((prev) => {
            const newOrder = [...prev];
            const currentIndex = newOrder.indexOf(clickedImageIndex);
            if (currentIndex > 0) {
              // Move to back by swapping with previous index
              [newOrder[currentIndex - 1], newOrder[currentIndex]] = [newOrder[currentIndex], newOrder[currentIndex - 1]];
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
              // Move to front by swapping with next index
              [newOrder[currentIndex + 1], newOrder[currentIndex]] = [newOrder[currentIndex], newOrder[currentIndex + 1]];
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
  const [hoveredItem, setHoveredItem] = useState(null);

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
    // Toggle visibility for all rectangles
    setIsBackgroundHidden((prev) => prev.map((hidden) => !hidden));
  };


 
  console.log("isbackground hidden", isBackgroundHidden);
  const [fullScreen, setfullScreen]=useState(false);
  const [isDraggingLine, setIsDraggingLine] = useState(false);
  const [lineStart, setLineStart] = useState({ x: 0, y: 0 });
  const [lineEnd, setLineEnd] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, rectIndex) => {
    // Start dragging from the center of the rectangle
    const rect = droppedImages[rectIndex];
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;

    setLineStart({ x: centerX+500, y: centerY+500 });
    setLineEnd({ x: centerX, y: centerY });
    setIsDraggingLine(true);
  };

  console.log("linend",lineEnd);
  

  const handleMouseMove = (e) => {
    if (isDraggingLine) {
      // Update the line end position while dragging
      setLineEnd({ x: e.clientX+100, y: e.clientY+100 });
    }
  };

  const handleMouseUp = () => {
    // Stop drawing the line on mouse up
    setIsDraggingLine(false);
  };

  useEffect(() => {
    // Add event listeners for mouse movement and mouse up
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Clean up event listeners when component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingLine]);


  return (

      !fullScreen ? (
        <div>

        <LeftPane open={open} onClose={() => setOpen(false)} props={props}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <UserTabs
              value={0}
              handleChange={() => { }}
              tabs={[]}
              language={props.language}
              theme={props.theme}
              onClick={() => props.settree("tree1")}
            />
          </div>
          <div>
            <DropDownInputField props={props} />
          </div>
        </LeftPane>
  
        <RightPane open={open} props={props} handleDrawerOpen={() => setOpen(true)}>
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "40%", display: "flex", alignItems: "center", marginLeft: open ? "25px" : "50px" }}>
              Architecture 1 : Diagram 2
            </div>
  
            <div style={{ width: "60%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
  
  
              <LoopIcon className={`${props.theme === "default"
                ? defaulttheme.default_themebtntextcolor
                : props.theme === "dark"
                  ? darktheme.dark_themebtntextcolor
                  : lighttheme.light_themebtntextcolor
                } ${props.theme === "default"
                  ? defaulttheme.default_themebtnbordercolor
                  : props.theme === "dark"
                    ? darktheme.dark_themebtnbordercolor
                    : lighttheme.light_themebtnbordercolor
  
                }`} sx={{ fontSize: "30px" }} />
              <FilterAltIcon className={`${props.theme === "default"
                ? defaulttheme.default_themebtntextcolor
                : props.theme === "dark"
                  ? darktheme.dark_themebtntextcolor
                  : lighttheme.light_themebtntextcolor
                } ${props.theme === "default"
                  ? defaulttheme.default_themebtnbordercolor
                  : props.theme === "dark"
                    ? darktheme.dark_themebtnbordercolor
                    : lighttheme.light_themebtnbordercolor
  
                }`} sx={{ fontSize: "30px" }} />
              <ImageIcon className={`${props.theme === "default"
                ? defaulttheme.default_themebtntextcolor
                : props.theme === "dark"
                  ? darktheme.dark_themebtntextcolor
                  : lighttheme.light_themebtntextcolor
                } ${props.theme === "default"
                  ? defaulttheme.default_themebtnbordercolor
                  : props.theme === "dark"
                    ? darktheme.dark_themebtnbordercolor
                    : lighttheme.light_themebtnbordercolor
  
                }`} sx={{ fontSize: "30px" }} onClick={handleHideBackground} />
              <ZoomOutMapIcon className={`${props.theme === "default"
                ? defaulttheme.default_themebtntextcolor
                : props.theme === "dark"
                  ? darktheme.dark_themebtntextcolor
                  : lighttheme.light_themebtntextcolor
                } ${props.theme === "default"
                  ? defaulttheme.default_themebtnbordercolor
                  : props.theme === "dark"
                    ? darktheme.dark_themebtnbordercolor
                    : lighttheme.light_themebtnbordercolor
  
                }`} sx={{ fontSize: "30px" }} />
              <ZoomInIcon className={`${props.theme === "default"
                ? defaulttheme.default_themebtntextcolor
                : props.theme === "dark"
                  ? darktheme.dark_themebtntextcolor
                  : lighttheme.light_themebtntextcolor
                } ${props.theme === "default"
                  ? defaulttheme.default_themebtnbordercolor
                  : props.theme === "dark"
                    ? darktheme.dark_themebtnbordercolor
                    : lighttheme.light_themebtnbordercolor
  
                }`} sx={{ fontSize: "30px" }} />
              <ZoomOutIcon className={`${props.theme === "default"
                ? defaulttheme.default_themebtntextcolor
                : props.theme === "dark"
                  ? darktheme.dark_themebtntextcolor
                  : lighttheme.light_themebtntextcolor
                } ${props.theme === "default"
                  ? defaulttheme.default_themebtnbordercolor
                  : props.theme === "dark"
                    ? darktheme.dark_themebtnbordercolor
                    : lighttheme.light_themebtnbordercolor
  
                }`} sx={{ fontSize: "30px" }} />
  
              <ToggleOnIcon className={`${props.theme === "default"
                ? defaulttheme.default_themebtntextcolor
                : props.theme === "dark"
                  ? darktheme.dark_themebtntextcolor
                  : lighttheme.light_themebtntextcolor
                } ${props.theme === "default"
                  ? defaulttheme.default_themebtnbordercolor
                  : props.theme === "dark"
                    ? darktheme.dark_themebtnbordercolor
                    : lighttheme.light_themebtnbordercolor
  
                }`} sx={{ fontSize: "30px" }} />
              <SaveIcon className={`${props.theme === "default"
                ? defaulttheme.default_themebtntextcolor
                : props.theme === "dark"
                  ? darktheme.dark_themebtntextcolor
                  : lighttheme.light_themebtntextcolor
                } ${props.theme === "default"
                  ? defaulttheme.default_themebtnbordercolor
                  : props.theme === "dark"
                    ? darktheme.dark_themebtnbordercolor
                    : lighttheme.light_themebtnbordercolor
  
                }`} sx={{ fontSize: "30px" }} />
  
  
  
  
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
              onContextMenu={handleRightClick}
              onMouseEnter={handleMouseEnterDropZone}
              onMouseLeave={handleMouseLeaveDropZone}
              onMouseUp={handleMouseUp}
            >
            <button onClick={()=>setfullScreen(false)}>Minimize</button>
            <button onClick={()=>setfullScreen(true)}>Full Screen</button>
              {order.map((index) => {
                const image = droppedImages[index];
                return (
                  <Rnd
    key={index}
    size={{ width: image.width || 140, height: image.height || 60 }} // Set default width and height
    position={{ x: image.x, y: image.y }}
    onDragStop={(e, d) => {
      setDroppedImages((prev) =>
        prev.map((img, idx) =>
          idx === index ? { ...img, x: d.x, y: d.y } : img
        )
      );
    }}
    onResizeStop={(e, direction, ref, delta, position) => {
      setDroppedImages((prev) =>
        prev.map((img, idx) =>
          idx === index
            ? {
                ...img,
                width: ref.style.width,
                height: ref.style.height,
                ...position,
              }
            : img
        )
      );
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: isBackgroundHidden[index]
          ? "transparent"
          : image.backgroundColor,
        border: isBackgroundHidden[index] ? "none" : image.backgroundColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        padding: "5px",
        cursor: 'move',
        position: 'relative', // Ensure that the inner elements are positioned relative to this container
      }}
      onContextMenu={(e) => handleRectangleRightClick(e, index)}
    >
      {/* Center Marker */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '10px',  // Width of the center marker
          height: '10px', // Height of the center marker
          // backgroundColor: 'red', // Color of the center marker
          borderRadius: '50%', // Makes it a circle
          transform: 'translate(-50%, -50%)', // Center the marker
          zIndex: 10 // Ensure it's on top of other elements
        }}
      />
  
      {isBackgroundHidden[index] ? (
        <>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <img
              src={image.src}
              alt={`Dropped ${index}`}
              style={{
                position: isBackgroundHidden[index] ? "relative" : "absolute",
                width: "29px",
                height: "24px",
                margin: "auto",
                top: 0,
                right: 0,
              }}
            />
            <div style={{ fontSize: "12px", color: "black", textAlign: "center", display: "flex" }}>
              {image.title}
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ fontSize: "12px", color: "black", textAlign: "center" }}>
            {image.title}
          </div>
          <img
            src={image.src}
            alt={`Dropped ${index}`}
            style={{
              position: "absolute",
              width: "29px",
              height: "24px",
              top: 4,
              right: 0,
            }}
          />
        </>
      )}
    </div>
  </Rnd>
  
                );
              })}
  
              {selectedImage && isDroppable && (
                <img
                  src={selectedImage}
                  alt="Moving"
                  style={{
                    position: "fixed",
                    left: mousePos.x,
                    top: mousePos.y,
                    width: "30px",
                    height: "30px",
                    pointerEvents: "none",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
  
              {contextMenu && (
                <div
                  style={{
                    position: "absolute",
                    left: contextMenu.x,
                    top: contextMenu.y,
                    backgroundColor: "#ffffff",
                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                    // padding: "20px",
                    borderRadius: "6px",
                    //  background-color:${
                    //   props.theme === "dark"
                    //     ? "rgba(165,209, 73, 0.5)"
                    //     : "rgba(33,88, 164, 0.2)"
                    // }; 
                  }}
                >
                  <ul style={{ listStyle: "none", padding: 10, margin: 0 }}>
                    <li
                      onClick={() => handleMenuClick("delete")}
                      onMouseEnter={() => handleMouseEnter("delete")}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        cursor: "pointer",
                        backgroundColor: getBackgroundColor("delete"),
                        color: "#4b5563",
                        marginBottom: "5px",
  
                      }}
                    >
                      Delete
                    </li>
                    <li
                      onClick={() => handleMenuClick("sendBack")}
  
  
                      onMouseEnter={() => handleMouseEnter("sendBack")}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        backgroundColor: getBackgroundColor("sendBack"),
                        cursor: "pointer",
                        color: "#4b5563",
                        marginBottom: "5px",
                      }}
                    >
                      Send to Back
                    </li>
                    <li
                      onClick={() => handleMenuClick("bringFront")}
                      onMouseEnter={() => handleMouseEnter("bringFront")}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        backgroundColor: getBackgroundColor("bringFront"),
                        cursor: "pointer",
                        color: "#4b5563",
                        marginBottom: "5px",
                      }}
                    >
                      Bring to Front
                    </li>
  
                    <li
                      onClick={() => handleMenuClick("changeColor")}
                      onMouseEnter={() => handleMouseEnter("changeColor")}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        backgroundColor: getBackgroundColor("changeColor"),
                        cursor: "pointer",
                        color: "#4b5563",
                        marginBottom: "5px",
                      }}
                    >
                      Change Color
                    </li>
  
                  </ul>
                </div>
              )}
  
              {isColorModalOpen && (
                <ModalChangeColor
                  open={isColorModalOpen}
                  handleClose={() => setIsColorModalOpen(false)}
                  onChangeColor={handleChangeColor}
                  language={props.language}
                  theme={props.theme}
                />
              )}
            </div>
  
          </div>
        </RightPane>
      </div>
      ):(
        <div
        id="canvas"
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          overflow: "auto",
        }}
      >
        {order.map((index) => {
          const image = droppedImages[index];
          return (
            <Rnd
              key={index}
              size={{ width: image.width, height: image.height }}
              position={{ x: image.x, y: image.y }}
              onDragStop={(e, d) => {
                setDroppedImages((prev) =>
                  prev.map((img, idx) =>
                    idx === index ? { ...img, x: d.x, y: d.y } : img
                  )
                );
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                setDroppedImages((prev) =>
                  prev.map((img, idx) =>
                    idx === index
                      ? {
                          ...img,
                          width: ref.style.width,
                          height: ref.style.height,
                          ...position,
                        }
                      : img
                  )
                );
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: image.backgroundColor,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  position: "relative",
                  cursor: "move",
                }}
                onMouseDown={(e) => handleMouseDown(e, index)} // Start line on mouse down
              >
                {/* Center Marker */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "10px",
                    height: "10px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                />
                {/* Content inside rectangle */}
                <div style={{ fontSize: "12px", color: "black" }}>
                  Rectangle {index + 1}
                </div>
              </div>
            </Rnd>
          );
        })}
  
        {/* Dotted line rendering */}
        {isDraggingLine && (
          <div
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              pointerEvents: "none", // Prevent interference with other elements
              zIndex: 9999,
            }}
          >
            <svg width="100%" height="100%">
              <line
                x1={lineStart.x}
                y1={lineStart.y}
                x2={lineEnd.x}
                y2={lineEnd.y}
                stroke="black"
                strokeDasharray="5,5"
                strokeWidth="2"
              />
            </svg>
          </div>
        )}
      </div>
      )
    
  
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
