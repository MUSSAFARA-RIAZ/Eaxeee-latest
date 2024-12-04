
import { connect } from "react-redux";

function Table2(props) {
  return (
    <div className="MainComponent">
      <h1>Table2</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Table2);