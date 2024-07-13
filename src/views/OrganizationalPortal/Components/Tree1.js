// import React from 'react';
import TreeStructure from "./TreeStructure";
import {getTreeNodes1} from "../Components/NodeService/Data"
import { connect } from "react-redux";
// import "primereact/resources/themes/lara-light-cyan/theme.css";

function Tree1(props) {
 
  return (
    <div className="MainComponent">
      <TreeStructure getTreeNodes={getTreeNodes1} props={props} />
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Tree1);

