import React, { useState } from "react";

const ContextMenu = ({
    contextMenu,
    fullScreen,
    handleMenuClick,
    getBackgroundColor,
    handleMouseEnter,
    handleMouseLeave,
    theme,
}) => {
    const [hoveredItem, setHoveredItem] = useState(null);

    if (!contextMenu) return null; // If no context menu, return null

    return (
        <div
            style={{
                position: "absolute",
                left: contextMenu.x - 400,
                top: contextMenu.y - 100,
                backgroundColor: "#ffffff",
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
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
    );
};

export default ContextMenu;
