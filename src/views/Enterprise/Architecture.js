import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import LeftPane from "../Layout/Leftpane";
import RightPane from "../Layout/Rightpane";
import { UserTabs } from "./Components/Enterprise_iconsTab";
import DropDownInputField from "./Components/DropDownInputField";
import Iconbox from "./Components/Iconbox";

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

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (selectedImage) {
        setMousePos({ x: event.clientX, y: event.clientY });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [selectedImage]);

  const handleSelectImage = (imageSrc, backgroundColor, title) => {
    setSelectedImage(imageSrc);
    setSelectedImageColor(backgroundColor);
    setSelectedImageTitle(title);
  };

  const handleCanvasClick = (event) => {
    if (selectedImage && isDroppable && event.button === 0) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setDroppedImages((prev) => [
        ...prev,
        { src: selectedImage, x, y, backgroundColor: selectedImageColor, title: selectedImageTitle },
      ]);
    }
    // Hide context menu if the canvas is clicked
    setContextMenu(null);
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    // Unselect the image only if right-clicking on the canvas
    setSelectedImage(null);
  };

  const handleRectangleRightClick = (event, index) => {
    event.preventDefault();
    
    // Get the bounding rectangle of the clicked rectangle
    const rect = event.currentTarget.getBoundingClientRect();
    console.log("rect",rect);
    // 
// bottom
// : 
// 357
// height
// : 
// 60
// left
// : 
// 829
// right
// : 
// 969
// top
// : 
// 297
// width
// : 
// 140
// x
// : 
// 829
// y
// : 
// 297
  
    // Calculate the new position for the context menu
    const offsetX = 100; // Adjust as needed
    const offsetY = -70; // Adjust as needed
  
    // Set context menu position based on the rectangle's position with an offset
    setContextMenu({
      mouseX: rect.left - 260 ,
      mouseY: rect.top + offsetY,
    });
    
    setClickedImageIndex(index);
  };
  

  const handleMenuClick = (action) => {
    switch (action) {
      case "delete":
        if (clickedImageIndex !== null) {
          setDroppedImages((prev) => prev.filter((_, i) => i !== clickedImageIndex));
        }
        break;
      case "sendBack":
        // Code to send the rectangle to the back
        break;
      case "bringFront":
        // Code to bring the rectangle to the front
        break;
      case "changeColor":
        // Code to change the color
        break;
      default:
        break;
    }
    setContextMenu(null); // Close the context menu after an action is performed
  };

  const handleMouseEnterDropZone = () => {
    setIsDroppable(true);
  };

  const handleMouseLeaveDropZone = () => {
    setIsDroppable(false);
  };

  return (
    <>
      <LeftPane open={open} onClose={() => setOpen(false)} props={props}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <UserTabs
            value={0}
            handleChange={() => {}}
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
          <div style={{ width: "60%" }}></div>
        </div>

        <div style={{ display: "flex", flex: 1 }}>
          <Iconbox onSelectImage={handleSelectImage} props={props} />
          <div
            style={{
              width: "100%",
              minHeight: "400px",
              position: "relative",
              overflow: "auto",
            }}
            onClick={handleCanvasClick}
            onContextMenu={handleRightClick} // Right-click on the canvas
            onMouseEnter={handleMouseEnterDropZone}
            onMouseLeave={handleMouseLeaveDropZone}
          >
            {droppedImages.map((image, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: image.x,
                  top: image.y,
                  width: "140px",
                  height: "60px",
                  backgroundColor: image.backgroundColor,
                  borderWidth: "5px",
                  borderStyle: "solid",
                  borderColor: image.backgroundColor,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  padding: "5px",
                }}
                onContextMenu={(e) => handleRectangleRightClick(e, index)} // Right-click on the rectangle
              >
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
                    top: 0,
                    right: 0,
                  }}
                />
              </div>
            ))}

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

            {/* Render context menu if open */}
            {contextMenu && (
              <div
                style={{
                  position: "absolute",
                  top: contextMenu.mouseY,
                  left: contextMenu.mouseX,
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  padding: "10px",
                  zIndex: 1000,
                }}
              >
                <div onClick={() => handleMenuClick("bringFront")}>Bring to Front</div>
                <div onClick={() => handleMenuClick("sendBack")}>Send to Back</div>
                <div onClick={() => handleMenuClick("delete")}>Delete Cell</div>
                <div onClick={() => handleMenuClick("changeColor")}>Change Color</div>
              </div>
            )}
          </div>
        </div>
      </RightPane>
    </>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
  theme: state.theme,
  subPage: state.subPage,
});

export default connect(mapStateToProps)(Architecture);
