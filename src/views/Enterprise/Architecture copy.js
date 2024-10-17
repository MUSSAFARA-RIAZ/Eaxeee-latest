import React, { useState, useEffect } from "react";
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
// import SaveIcon from '@mui/icons-material/Save';

const Architecture = (props) => {
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




  useEffect(() => {
 
    setOrder(droppedImages.map((_, index) => index));
  }, [droppedImages]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (selectedImage) {
        setMousePos({ x: event.clientX, y: event.clientY });
      }
      if (isDragging && draggingIndex !== null) {
        const canvasRect = document
          .getElementById("canvas")
          .getBoundingClientRect();
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
         
          setDroppedImages((prev) => {
            const newDroppedImages = prev.filter(
              (_, i) => i !== clickedImageIndex
            );
            return newDroppedImages;
          });


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
        // Dsa bh lagai jasakty thy xD 
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
    // Toggle visibility for all rectangles
    setIsBackgroundHidden((prev) => prev.map((hidden) => !hidden));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingIndex(null);
  };



  return !fullScreen ? (
    <div>
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

      <RightPane
        open={open}
        props={props}
        handleDrawerOpen={() => setOpen(true)}
      >
        <div style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              width: "40%",
              display: "flex",
              alignItems: "center",
              marginLeft: open ? "25px" : "50px",
            }}
          >
            Architecture 1 : Diagram 2
          </div>

          <div
            style={{
              width: "60%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
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
            onContextMenu={handleRightClick}
            onMouseEnter={handleMouseEnterDropZone}
            onMouseLeave={handleMouseLeaveDropZone}
            onMouseUp={handleMouseUp}
          >
            <button onClick={() => setfullScreen(false)}>Minimize</button>
            <button onClick={() => setfullScreen(true)}>Full Screen</button>
            {order.map((index) => {
              const image = droppedImages[index];
              return (
                <Rnd
                  key={index}
                  size={{
                    width: image.width || 140,
                    height: image.height || 60,
                  }} // Set default width and height
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
                      border: isBackgroundHidden[index]
                        ? "none"
                        : image.backgroundColor,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                      padding: "5px",
                      cursor: "move",
                      position: "relative", 
                    }}
                    onContextMenu={(e) => handleRectangleRightClick(e, index)}
                  >
                   {/* center pointtt mark  */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "10px", 
                        height: "10px", 
                        // backgroundColor: 'red', 
                        borderRadius: "50%", 
                        transform: "translate(-50%, -50%)", 
                        zIndex: 10, 
                      }}
                    />

                    {isBackgroundHidden[index] ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <img
                            src={image.src}
                            alt={`Dropped ${index}`}
                            style={{
                              position: isBackgroundHidden[index]
                                ? "relative"
                                : "absolute",
                              width: "29px",
                              height: "24px",
                              margin: "auto",
                              top: 0,
                              right: 0,
                            }}
                          />
                          <div
                            style={{
                              fontSize: "12px",
                              color: "black",
                              textAlign: "center",
                              display: "flex",
                            }}
                          >
                            {image.title}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "black",
                            textAlign: "center",
                          }}
                        >
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
              <ContextMenu
                contextMenu={contextMenu}
                handleMenuClick={handleMenuClick}
                getBackgroundColor={getBackgroundColor}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                fullScreen={fullScreen}
                theme={props.theme}
              />
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
  ) : (
    <>
      <div style={{ display: "flex", width: "100%", padding: "10px" }}>
        <div
          style={{
            width: "40%",
            display: "flex",
            alignItems: "center",
            marginLeft: open ? "25px" : "50px",
          }}
        >
          Architecture 1 : Diagram 2
        </div>

        <div
          style={{
            width: "60%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
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
         
            backgroundColor: "#e0e0e0",
            height: "100vh",
            position: "relative",
            overflow: "auto",
          }}
          onClick={handleCanvasClick}
          onContextMenu={handleRightClick}
          onMouseEnter={handleMouseEnterDropZone}
          onMouseLeave={handleMouseLeaveDropZone}
          onMouseUp={handleMouseUp}
        >
          <button onClick={() => setfullScreen(false)}>Minimize</button>
          <button onClick={() => setfullScreen(true)}>Full Screen</button>
          {order.map((index) => {
            const image = droppedImages[index];
            return (
              <Rnd
                key={index}
                size={{ width: image.width || 140, height: image.height || 60 }} 
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
                    border: isBackgroundHidden[index]
                      ? "none"
                      : image.backgroundColor,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                    padding: "5px",
                    cursor: "move",
                    position: "relative", 
                  }}
                  onContextMenu={(e) => handleRectangleRightClick(e, index)}
                >
                  {/* Center Marker */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "10px", 
                      height: "10px", 
                     
                      borderRadius: "50%", 
                      backgroundColor: "yellow",
                      transform: "translate(-50%, -50%)", 
                      zIndex: 10, 
                    }}
                  />

                  {isBackgroundHidden[index] ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src={image.src}
                          alt={`Dropped ${index}`}
                          style={{
                            position: isBackgroundHidden[index]
                              ? "relative"
                              : "absolute",
                            width: "29px",
                            height: "24px",
                            margin: "auto",
                            top: 0,
                            right: 0,
                          }}
                        />
                        <div
                          style={{
                            fontSize: "12px",
                            color: "black",
                            textAlign: "center",
                            display: "flex",
                          }}
                        >
                          {image.title}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
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
            <ContextMenu
              contextMenu={contextMenu}
              handleMenuClick={handleMenuClick}
              getBackgroundColor={getBackgroundColor}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              fullScreen={fullScreen}
              theme={props.theme}
            />
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
    </>
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
