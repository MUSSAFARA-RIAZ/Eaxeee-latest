import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Tree } from "primereact/tree";
import { ContextMenu } from "primereact/contextmenu";
import { Toast } from "primereact/toast";
import { PrimeIcons } from "primereact/api";
import { connect } from "react-redux";

function TreeStructure({ getTreeNodes, language, theme, setSelectedNodeData }) {
  const [expandedKeys, setExpandedKeys] = useState({});
  const [nodes, setNodes] = useState([]);
  const [selectedNodeKey, setSelectedNodeKey] = useState(null);
  const toast = useRef(null);
  const cm = useRef(null);

  useEffect(() => {
    getTreeNodes().then((data) => setNodes(data));
  }, [getTreeNodes]);

  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (e) => {
    if (e.node.menu) {
      const contextMenuItems = e.node.menu.map((menuItem) => ({
        label: menuItem.label,
        icon: menuItem.icon,
        command: () => {
          toast.current.show({
            severity: "info",
            summary: menuItem.label,
            detail: "Menu item clicked",
          });
        },
      }));
      setContextMenu(contextMenuItems);
      cm.current.show(e.originalEvent);
    }
  };

  const nodeTemplate = (node) => {
    const nodeStyle = {
      color:
        theme === "default"
          ? "#393a3a"
          : theme === "dark"
          ? "#cecece"
          : "black",
      direction: language === "ar" ? "rtl" : "ltr",
    };

    return (
      <div className="p-tree-node-content" style={nodeStyle}>
        {node.label}
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <ContextMenu model={contextMenu} ref={cm} />
      <style>
      {`
        .p-contextmenu .p-menuitem-text {
                    font-size: 12px; 
                    margin-left: 8px;
        }

        .p-contextmenu {
                  width: 200px;
        }
        
        .p-contextmenu .p-menuitem-icon {
                 font-size: 12px; 
        }
              
        .p-tree-toggler:hover{
                background-color:transparent
        }
                   
        .p-treenode-content:hover{
            background-color:${
              theme === "dark" ? "rgba(165,209, 73, 0.5)" : "rgba(33,88, 164, 0.2)"
            }; 

        }
        .p-tree .p-tree-container .p-treenode:focus > .p-treenode-content {
        outline: 0 none;
        box-shadow:none;
        }

        .p-tree .p-treenode-content {
        padding: 0px 8px;
        }

        .p-tree-toggler-icon {
            color: ${theme === "dark" ? "#cecece" : "#393a3a"};
          }

        .p-tree-toggler:hover .p-tree-toggler-icon {
            color: ${theme === "dark" ? "#a5d149" : "#2158a4"};
          }
                    
      `}
      </style>
      <div>
        <Tree
          value={nodes}
          selectionMode={false}
          expandedKeys={expandedKeys}
          onToggle={(e) => setExpandedKeys(e.value)}
          contextMenuSelectionKey={selectedNodeKey}
          onContextMenuSelectionChange={(e) => setSelectedNodeKey(e.value)}
          onContextMenu={(e) => handleContextMenu(e)}
          nodeTemplate={nodeTemplate}
          expandIcon={
            language === "en"
              ? PrimeIcons.CHEVRON_RIGHT
              : PrimeIcons.CHEVRON_LEFT
          }
          onNodeClick={(e) => setSelectedNodeData(e.node.key)}
          style={{
            width: "380px",
            backgroundColor: "transparent",
            border: "none",
          }}
        />
      </div>
    </>
  );
}

TreeStructure.propTypes = {
  getTreeNodes: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  // setSelectedNodeData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
  theme: state.theme,
});

export default connect(mapStateToProps)(TreeStructure);
