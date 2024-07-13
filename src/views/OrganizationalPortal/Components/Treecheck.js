import React, { useState, useEffect, useRef } from "react";
import { Tree } from "primereact/tree";
import { ContextMenu } from "primereact/contextmenu";
import { Toast } from "primereact/toast";
import { NodeService } from "./service/NodeService";
import { connect } from "react-redux";
import { PrimeIcons } from "primereact/api";

function ContextMenuDemo({ getTreeNodes, props }) {
  console.log("shshshsh", props);
  const [nodes, setNodes] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState({});
  const [selectedNodeKey, setSelectedNodeKey] = useState(null);
  const toast = useRef(null);
  const cm = useRef(null);
  const menu = [
    {
      label: "View Key",
      icon: "pi pi-search",
      command: () => {
        toast.current.show({
          severity: "success",
          summary: "Node Key",
          detail: selectedNodeKey,
        });
      },
    },
    {
      label: "Add Node",
      icon: "pi pi-plus",
      command: () => {
        const label = prompt("Enter label for new node:");
        if (label) {
          const newChildData = {
            label,
            icon: "pi pi-fw pi-file",
            data: `${label} Document`,
          };
          NodeService.getTreeNodes(selectedNodeKey, newChildData).then((data) =>
            setNodes(data)
          );
        }
      },
    },
    {
      label: "Toggle",
      icon: "pi pi-sort",
      command: () => {
        let _expandedKeys = { ...expandedKeys };

        if (_expandedKeys[selectedNodeKey])
          delete _expandedKeys[selectedNodeKey];
        else _expandedKeys[selectedNodeKey] = true;

        setExpandedKeys(_expandedKeys);
      },
    },
  ];

  useEffect(() => {
    NodeService.getTreeNodes().then((data) => setNodes(data));
  }, []);

  const nodeTemplate = (node) => {
    const nodeStyle = {
      color:
        props.theme === "default"
          ? "#393a3a"
          : props.theme === "dark"
          ? "#cecece"
          : "",
      direction: props.language === "ar" ? "rtl" : "ltr",
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

      <ContextMenu model={menu} ref={cm} />
      <style>
        {`
              
              .p-tree-toggler:hover{
                background-color:transparent
              }
                   
    .p-treenode-content:hover{
        background-color:${
          props.theme === "dark"
            ? "rgba(165,209, 73, 0.5)"
            : "rgba(33,88, 164, 0.2)"
        }; 

    }
    .p-tree .p-tree-container .p-treenode:focus > .p-treenode-content {
    outline: 0 none;
   
    box-shadow:none;}
 
    .p-tree-toggler-icon {
        color: ${props.theme === "dark" ? "#cecece" : "#393a3a"};
      }

    .p-tree-toggler:hover .p-tree-toggler-icon {
        color: ${props.theme === "dark" ? "#a5d149" : "#2158a4"};
      }
                `}
      </style>
      <div className="card flex justify-content-center">
        <Tree
          style={{ background: "none", border: "none" }}
          value={nodes}
          expandedKeys={expandedKeys}
          onToggle={(e) => setExpandedKeys(e.value)}
          contextMenuSelectionKey={selectedNodeKey}
          onContextMenuSelectionChange={(e) => setSelectedNodeKey(e.value)}
          nodeTemplate={nodeTemplate}
          expandIcon={
            props.language === "en"
              ? PrimeIcons.CHEVRON_RIGHT
              : PrimeIcons.CHEVRON_LEFT
          }
          onContextMenu={(e) => cm.current.show(e.originalEvent)}
          onNodeClick={(e) => console.log("shshhs")}
          className="w-full md:w-30rem"
        />
      </div>
    </>
  );
}


const mapStateToProps = (state) => ({
  language: state.language,
  theme: state.theme,
});

const mapDispatchToProps = (dispatch) => ({
  setLanguage: (lang) =>
    dispatch({
      type: "TOGGLELANG",
      value: lang === "en" ? "ar" : "en",
    }),
  setTheme: (theme) =>
    dispatch({
      type: "UPDATETHEME",
      value: theme,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenuDemo);
