import TreeStructure from "../../components/TreeStructure/TreeStructure";
import {getTreeNodes2} from "../../components/TreeStructure/NodeService/Data";
import { connect } from "react-redux";

function Tree2(props) {
  return (
    <div className="MainComponent">
      <TreeStructure getTreeNodes={getTreeNodes2} props={props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Tree2);