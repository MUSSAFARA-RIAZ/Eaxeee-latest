// import React from 'react';
import TreeStructure from "../../components/TreeStructure/TreeStructure";
import {getTreeNodes4} from "../../components/TreeStructure/NodeService/Data";
import {connect} from "react-redux"

function Tree4(props) {
  return (
    <div className="MainComponent">
      <TreeStructure getTreeNodes={getTreeNodes4} props={props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Tree4);
