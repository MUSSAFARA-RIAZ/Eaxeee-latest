import React from 'react'

const Testing = ({ position, onDelete, onUpdate }) => {
  if (!position) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        background: "white",
        border: "1px solid #ccc",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        /*
           position: "absolute",
        left: fullScreen ? contextMenu.x + 300 : contextMenu.x,
        top: fullScreen ? contextMenu.y+20 : contextMenu.y,
        backgroundColor: "#ffffff",
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "6px",
        
        
        
         */
      }}
    >
      <div onClick={onUpdate}>Update</div>
      <div onClick={onDelete}>Delete</div>
    </div>
  );
};
export default Testing;
