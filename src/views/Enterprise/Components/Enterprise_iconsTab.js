import React, { useEffect } from "react";
import { connect } from "react-redux";
import CustomTabs from "../../../components/CustomTabs/CustomTabs";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from "primereact/api";
import Tree1 from "../Tree1";
import Tree2 from "../Tree2";
import Tree3 from "../Tree3";
import Tree4 from "../Tree4";
import Tree5 from "../Tree5";

function UserTabs(props) {
  const { value, handleChange, tabs, setActiveTree } = props;

  const handleTabClick = (index) => {
    const treeName = `Tree${index + 1}`;
    setActiveTree(treeName);
  };

  console.log("value in custom tabs", value);

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
  const { activeTree } = props;
 

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

const mapStateToProps = (state) => {
  return {
    language: state.language,
    theme: state.theme,
    route: state.route,
    activepage: state.activepage,
    subpage: state.subpage,
    activeTree: state.activeTree,
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
  };
};

const ConnectedUserTabs = connect(mapStateToProps, mapDispatchToProps)(UserTabs);
const ConnectedEnterpriseContent = connect(mapStateToProps, mapDispatchToProps)(EnterpriseContent);

export { ConnectedUserTabs as UserTabs, ConnectedEnterpriseContent as EnterpriseContent };
