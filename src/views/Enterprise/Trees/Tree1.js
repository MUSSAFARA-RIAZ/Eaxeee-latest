import React, { useState } from 'react';
import TreeStructure from '../../../components/TreeStructure/TreeStructure';
// import TreeStructure from "../../../components/TreeStructure/TreeStructure";
import { getTreeNodes1 } from "../../../components/TreeStructure/NodeService/Data";
import { connect } from "react-redux";

function Tree1({ language, theme, setLanguage, setTheme }) {
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);

    const handleSetSelectedNodeData = (nodeKey) => {
        setSelectedNodeKey(nodeKey);
        console.log("Selected Node Key:", nodeKey);
    };

    return (
        <div className="MainComponent">
            <TreeStructure
                getTreeNodes={getTreeNodes1}
                language={language}
                theme={theme}
                setSelectedNodeData={handleSetSelectedNodeData}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    language: state.language,
    theme: state.theme,
    activeTree:state.activeTree,
    
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

    setTree: (tree) =>
        dispatch({
            type: "ACTIVETREE",
            value: tree,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tree1);
