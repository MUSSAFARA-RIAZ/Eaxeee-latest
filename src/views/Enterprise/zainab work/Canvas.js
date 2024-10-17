import React, { useState } from 'react';
import Iconbox from '../Components/Iconbox'; // Assuming you have the Iconbox component
import { Box } from '@mui/material';

const Canvas = (props) => {
  const [selectedImage, setSelectedImage] = useState(null); // Selected image from the Iconbox
  const [droppedImages, setDroppedImages] = useState([]); // To track dropped images
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // Current mouse position
  const [isDroppable, setIsDroppable] = useState(false); // Whether the image can be dropped

  // Track mouse position
  const handleMouseMove = (event) => {
    setMousePos({
      x: event.clientX,
      y: event.clientY,
    });
  };

  // Handle when the user clicks on the canvas to drop the image
  const handleCanvasClick = (event) => {
    if (selectedImage) {
      const canvasBounds = event.currentTarget.getBoundingClientRect();
      setDroppedImages((prev) => [
        ...prev,
        {
          src: selectedImage,
          x: event.clientX - canvasBounds.left, // Adjust the x position relative to the canvas
          y: event.clientY - canvasBounds.top,  // Adjust the y position relative to the canvas
        },
      ]);
      setSelectedImage(null); // Reset the selected image after dropping
    }
  };

  // Handle when the user right-clicks to unselect the image
  const handleRightClick = (event) => {
    event.preventDefault(); // Prevent context menu
    setSelectedImage(null); // Clear selected image
  };

  // Handle mouse entering the drop zone
  const handleMouseEnterDropZone = () => {
    setIsDroppable(true);
  };

  // Handle mouse leaving the drop zone
  const handleMouseLeaveDropZone = () => {
    setIsDroppable(false);
  };

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <Iconbox onSelectImage={setSelectedImage} props={props} />
      <div
        style={{
          width: '100%',
          minHeight: "400px",
          position: "relative",
          overflow: "auto",
          border: "3px solid green",
        }}
        onMouseMove={handleMouseMove}
        onClick={handleCanvasClick}
        onContextMenu={handleRightClick} // Right-click unselect
        onMouseEnter={handleMouseEnterDropZone}
        onMouseLeave={handleMouseLeaveDropZone}
      >
        {/* Render dropped images */}
        {droppedImages.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={`Dropped ${index}`}
            style={{
              position: 'absolute',
              left: image.x,
              top: image.y,
              width: '50px',
              height: '50px',
              pointerEvents: 'none', // Make sure dropped images can't be dragged
            }}
            draggable={false} // Ensure images are not draggable
          />
        ))}

        {/* Display the selected image following the mouse */}
        {selectedImage && isDroppable && (
          <img
            src={selectedImage}
            alt="Moving"
            style={{
              position: 'fixed',
              left: mousePos.x,
              top: mousePos.y,
              width: '50px',
              height: '50px',
              pointerEvents: 'none', // Avoid interfering with clicking
              transform: 'translate(-50%, -50%)',
            }}
            draggable={false} // Ensure the image is not draggable
          />
        )}
      </div>
    </div>
  );
};

export default Canvas;
