import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { connect } from "react-redux";
import LeftPane from "../Layout/Leftpane";
import RightPane from "../Layout/Rightpane";
import AdminTranslation from '../../Utils/AdminTranslation/AdminTranslation';
import CustomTabs from "../../components/CustomTabs/CustomTabs";

import { UserTabs } from "../Admin/UserManagement/UserManagement";
import { UserContent } from "../Admin/UserManagement/UserManagement";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import BackupIcon from '@mui/icons-material/Backup';
import RestoreIcon from '@mui/icons-material/Restore';

import { LicenseManagementContent, LicenseManagementTabs } from "../Admin/LicenseManagement/LicenseManagement";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import { RepositoryTabs, RepositoryContent } from "../Admin/RepositoryManagement/RepositoryManagement";



const Admin = (props) => {
  const { language } = props;

  const [view, setView] = useState(0);

  const handleMainTabs = (event, newValue) => {
    setView(newValue);
    console.log(newValue);

  };
  const [value, setValue] = useState(0);

  const tabs = [
    { label: language === 'en' ? 'User Management' : AdminTranslation["User Management"] },
    { label: language === 'en' ? 'License Management' : AdminTranslation["License Management"] },
    { label: language === 'en' ? 'Repository Management' : AdminTranslation["Repository Management"] }
  ];
  const usertabs = [
    { label: language === 'en' ? 'User Registration' : AdminTranslation["User Registration"], icon: <HowToRegIcon /> },
    { label: language === 'en' ? 'Password Management' : AdminTranslation["Password Management"], icon: <LockIcon /> },
    { label: language === 'en' ? 'Active Directory User' : AdminTranslation["Active Directory User"], icon: <AccountCircleIcon /> }

  ];
  const licensedtabs = [
    { label: language === 'en' ? 'Named User' : AdminTranslation["Named User"], icon: <AccountCircleIcon fontSize='small' /> },
    { label: language === 'en' ? 'Concurrent User' : AdminTranslation["Concurrent User"], icon: <SupervisedUserCircleIcon fontSize='small' /> }
  ];


  const handleMainChange = (event, newValue) => {
    setValue(newValue);
    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm", newValue);
  };



  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const repositorytabs = [
    { label: language === 'en' ? 'Clear' : AdminTranslation["Clear"], icon: <HowToRegIcon /> },
    { label: language === 'en' ? 'Backup' : AdminTranslation["Backup"], icon: <BackupIcon /> },
    { label: language === 'en' ? 'Restore' : AdminTranslation["Restore"], icon: <RestoreIcon /> }
  ];


  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />

      <LeftPane open={open} onClose={handleDrawerClose} props={props}>
      <div></div>
      <div>
        <CustomTabs value={view} onChange={handleMainTabs} tabs={tabs} orientation="vertical" />
        </div>


      </LeftPane>


      <RightPane
        open={open}
        props={props}
        handleDrawerOpen={handleDrawerOpen}



      >

        {view === 0 ? <UserTabs value={value} handleChange={handleMainChange} tabs={usertabs} /> : view === 1 ? <LicenseManagementTabs value={value} handleChange={handleMainChange} language={props.language} tabs={licensedtabs} /> :

          <RepositoryTabs tabs={repositorytabs} value={value} handleChange={handleMainChange} />


        }






        {view === 0 && <UserContent value={value} language={props.language} />}
        {view === 1 && <LicenseManagementContent value={value} language={props.language} />}
        {view === 2 && <RepositoryContent value={value} language={props.language} />}
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
