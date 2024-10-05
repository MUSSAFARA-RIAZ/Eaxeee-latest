// import React from 'react';
import TreeStructure from "../../../components/TreeStructure/TreeStructure";
import {getTreeNodes3} from "../../../components/TreeStructure/NodeService/Data";
import { connect } from "react-redux";

function Table3(props) {
  return (
    <div className="MainComponent">
       <h1>Table3</h1>
    </div>
  );
}

const mapStateToProps = (state) => ({
  language: state.language,
  theme: state.theme,

  activeTable:state.activeTable,

  
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
  setTable:(table)=>
      dispatch({
          type: "ACTIVETABLE",
          value: table,
          }),

});

export default connect(mapStateToProps, mapDispatchToProps)(Table3);
