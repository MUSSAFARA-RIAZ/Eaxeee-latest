import React, { useEffect } from "react";
import { connect } from "react-redux";
import CustomTabs from "../../../components/CustomTabs/CustomTabs";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from "primereact/api";
import Tree1 from "../Trees/Tree1";
import Tree2 from "../Trees/Tree2";
import Tree3 from "../Trees/Tree3";
import Tree4 from "../Trees/Tree4";
import Tree5 from "../Trees/Tree5";
import Table1 from "../Tables/Table1";
import Table2 from "../Tables/Table2";
import Table3 from "../Tables/Table3";
import Table4 from "../Tables/Table4";
import Table5 from "../Tables/Table5";

function UserTabs(props) {
  const { value, handleChange, tabs, setActiveTree } = props;

  const handleTabClick = (index) => {
    const treeName = `Tree${index + 1}`;
    setActiveTree(treeName);
  };

  // console.log("value in custom tabs", value);

  return (
    <CustomTabs
      value={value}
      onChange={(event, newValue) => {
        handleChange(event, newValue);
        handleTabClick(newValue);
      }}
      tabs={tabs}
      language={props.language}
      theme={props.theme}
    />
  );
}
function QuickAccessTabs(props) {
  const { value, handleChange, tabs, setActiveTable } = props;

  const handleTabClick = (index) => {
    const treeName = `Table${index + 1}`;
    setActiveTable(treeName);
  };

  // console.log("value in custom tabs", value);

  return (
    <CustomTabs
      value={value}
      onChange={(event, newValue) => {
        handleChange(event, newValue);
        handleTabClick(newValue);
      }}
      tabs={tabs}
      language={props.language}
      theme={props.theme}
    />
  );
}

function EnterpriseContent(props) {
  console.log("props in enterprise content",props);

  const { activeTree} = props;
  
 

  useEffect(() => {
    console.log("Active tree:", activeTree);
  }, [activeTree]);

  const renderTree = () => {
    switch (activeTree) {
      case "Tree1":
        return <Tree1 {...props} />;
      case "Tree2":
        return <Tree2 {...props} />;
      case "Tree3":
        return <Tree3 {...props} />;
      case "Tree4":
        return <Tree4 {...props} />;
      case "Tree5":
        return <Tree5 {...props} />;
      default:
        return null;
    }
  };
 


  return (
    <div>
      <PrimeReactProvider>
        {renderTree()}
      
      </PrimeReactProvider>
    </div>
  );
}

function QuickAccessContent(props) {
  console.log("props in enterprise content",props);

  const { activeTable } = props;
 
  
 

  useEffect(() => {
    console.log("activetable",activeTable)
    
  }, [activeTable]);

  
  const renderTable = () => {
    switch (activeTable) {
      case "Table1":
        return <Table1 {...props} />;
      case "Table2":
        return <Table2 {...props} />;
      case "Table3":
        return <Table3 {...props} />;
      case "Table4":
        return <Table4 {...props} />;
      case "Table5":
        return <Table5 {...props} />;
      default:
        return null;
    }
  };


  return (
    <div>
      <PrimeReactProvider>
        
        {renderTable()}
      </PrimeReactProvider>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    theme: state.theme,
    route: state.route,
    activepage: state.activepage,
    subpage: state.subpage,
    activeTree: state.activeTree,
    activeTable:state.activeTable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (lang) => dispatch({ type: "TOGGLELANG", value: lang === "en" ? "ar" : "en" }),
    setTheme: (theme) => dispatch({ type: "UPDATETHEME", value: theme }),
    setRoute: (route) => dispatch({ type: "UPDATEROUTE", value: route }),
    setActivePage: (pageName) => dispatch({ type: "SETACTIVEPAGE", value: pageName }),
    setSubPage: (subpage) => dispatch({ type: "SETSUBPAGE", value: subpage }),
    setActiveTree: (activeTree) => dispatch({ type: "ACTIVETREE", value: activeTree }),
    setActiveTable: (activeTable) => dispatch({ type: "ACTIVETABLE", value: activeTable }),

  };
};

const ConnectedUserTabs = connect(mapStateToProps, mapDispatchToProps)(UserTabs);
const ConnectedQuickAccessTabs = connect(mapStateToProps, mapDispatchToProps)(QuickAccessTabs);
const ConnectedEnterpriseContent = connect(mapStateToProps, mapDispatchToProps)(EnterpriseContent);
const QuickEnterpriseContent = connect(mapStateToProps, mapDispatchToProps)(QuickAccessContent);



export { ConnectedUserTabs as UserTabs, ConnectedQuickAccessTabs as QuickAccessTabs, ConnectedEnterpriseContent as EnterpriseContent, QuickEnterpriseContent as QuickAccessContent };
