import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { connect } from "react-redux";
import styles from "./Admin.module.css";
import LeftPane from "../Layout/Leftpane";
import RightPane from "../Layout/Rightpane";
import AdminTranslation from "../../Utils/AdminTranslation/AdminTranslation";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import { UserTabs } from "../Admin/UserManagement/UserManagement";
import { UserContent } from "../Admin/UserManagement/UserManagement";
import {
  LicenseManagementContent,
  LicenseManagementTabs,
} from "../Admin/LicenseManagement/LicenseManagement";
import {
  RepositoryTabs,
  RepositoryContent,
} from "../Admin/RepositoryManagement/RepositoryManagement";
import { MetaModelContent } from "./MetamodelManagement/MetamodelManagement";

const Admin = (props) => {
  const { language } = props;

  const [view, setView] = useState(0);
  const [value, setValue] = useState(0);

  const handleMainTabs = (event, newValue) => {
    setView(newValue);
    console.log(newValue);
  };

  const tabs = [
    {
      label:
        language === "en"
          ? "User Management"
          : AdminTranslation["User Management"],
    },
    {
      label:
        language === "en"
          ? "License Management"
          : AdminTranslation["License Management"],
    },
    {
      label:
        language === "en"
          ? "Repository Management"
          : AdminTranslation["Repository Management"],
    },
    {
      label:
        language === "en"
          ? "MetaModel Management"
          : AdminTranslation["Metamodel Management"],
    },
  ];
  const usertabs = [
    {
      label:
        language === "en"
          ? "User Registration"
          : AdminTranslation["User Registration"],
    },
    {
      label:
        language === "en"
          ? "Password Management"
          : AdminTranslation["Password Management"],
    },
    // {
    //   label:
    //     language === "en"
    //       ? "Directory User"
    //       : AdminTranslation["Directory User"],
    // },
  ];
  const licensedtabs = [
    {
      label: language === "en" ? "Named User" : AdminTranslation["Named User"],
    },
    {
      label:
        language === "en"
          ? "Concurrent User"
          : AdminTranslation["Concurrent User"],
    },
  ];

  const repositorytabs = [

    { label: language === "en" ? 'Architecture' : AdminTranslation["Architecture"] },
    { label: language === "en" ? 'Document' : AdminTranslation["Document"] },
    { label: language === "en" ? 'Process' : AdminTranslation["Process"] },
    { label: language === "en" ? 'Repository' : AdminTranslation["Repository"] },
  ];
  const metamodeltabs = [
    {
      label: language === "en" ? "Deployment" : AdminTranslation["Deployment"],
    },
    {
      label: language === "en" ? "Framework" : AdminTranslation["Framework"],
    },
  ];

  const handleMainChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />

      <LeftPane open={open} onClose={handleDrawerClose} props={props}>
        <div></div>
        <CustomTabs
          className={styles.adminCustomTabs}
          value={view}
          onChange={handleMainTabs}
          tabs={tabs}
          orientation="vertical"
          noindicator={true}
        />
      </LeftPane>

      <RightPane open={open} props={props} handleDrawerOpen={handleDrawerOpen}>
        <div>
          {view === 0 ? (
            <UserTabs
              value={value}
              handleChange={handleMainChange}
              tabs={usertabs}
              language={props.language}
              open={open}
            />
          ) : view === 1 ? (
            <LicenseManagementTabs
              value={value}
              handleChange={handleMainChange}
              tabs={licensedtabs}
              
            />
          ) : view === 2 ? (
            <RepositoryTabs
              tabs={repositorytabs}
              value={value}
              handleChange={handleMainChange}
            />
          ) : view === 3 ? (
            <RepositoryTabs
              tabs={metamodeltabs}
              value={value}
              handleChange={handleMainChange}
            />
          ) : null}
        </div>

        <div>
          {view === 0 && <UserContent value={value} />}
          {view === 1 && <LicenseManagementContent value={value} />}
          {view === 2 && (
            <RepositoryContent value={value} tabs={repositorytabs} />
          )}
          {view === 3 && (
            <MetaModelContent value={value} tabs={metamodeltabs} />
          )}

        </div>
      </RightPane>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.language,
    theme: state.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (lang) => {
      return dispatch({
        type: "TOGGLELANG",
        value: lang === "en" ? "ar" : "en",
      });
    },
    setTheme: (theme) => {
      return dispatch({
        type: "UPDATETHEME",
        value: theme,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
