import React from "react";

const ContextMenu = ({
    contextMenu,
    handleMenuClick,
    getBackgroundColor,
    handleMouseEnter,
    handleMouseLeave,
    showHideBorder, // This prop controls whether to show the Hide Border option
}) => {
    // Return null if `contextMenu` is not defined
    if (!contextMenu) return null;

    console.log("showHideBorder======>", showHideBorder);

    return (
        <div
            style={{
                position: "absolute",
                left: contextMenu.x - 400,
                top: contextMenu.y - 150,
                backgroundColor: "#ffffff",
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                zIndex: 1000, // Ensure it appears above other elements
            }}
        >
            <ul style={{ listStyle: "none", padding: 10, margin: 0 }}>
                {showHideBorder ? (
                    <li
                        onClick={() => handleMenuClick("hideBorder")}
                        onMouseEnter={() => handleMouseEnter("hideBorder")}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            backgroundColor: getBackgroundColor("hideBorder"),
                            cursor: "pointer",
                            color: "#4b5563",
                            marginBottom: "5px",
                        }}
                    >
                        Hide Border
                    </li>
                ) : (
                    <>
                        <li
                            onClick={() => handleMenuClick("delete")}
                            onMouseEnter={() => handleMouseEnter("delete")}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                backgroundColor: getBackgroundColor("delete"),
                                cursor: "pointer",
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
                    </>
                )}
            </ul>
        </div>
    );
};

export default ContextMenu;
