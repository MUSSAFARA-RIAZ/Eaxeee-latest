import React from "react";
import Impexbtn from "./Impexbtn";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AddIcon from "@mui/icons-material/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../ImpexComponents/Impex.module.css";
import ImpexDefaultTheme from "../ImpexComponents/ImpexDefault.module.css";
import ImpexDarkTheme from "../ImpexComponents/ImpexDark.module.css";
import ImpexLightTheme from "../ImpexComponents/ImpexLight.module.css";
import DropDown from "../ImpexComponents/DropDown.js";
import CustomButton from "../../../components/CustomButton/CustomButton.js";
import AdminTranslation from "../../../Utils/AdminTranslation/AdminTranslation.js";
import { Tooltip } from "@mui/material";
import {connect} from 'react-redux';


const ImportExportBox = ({ props }) => {
  console.log("In import export box",props.theme)
  return (
    <>
      <div
        className={`${styles.Impex_exportBox} ${
          props.theme === "default"
            ? ImpexDefaultTheme.Impex_exportBox
            : props.theme === "light"
            ? ImpexLightTheme.Impex_exportBox
            : ImpexDarkTheme.Impex_exportBox
        }`}
      >
        <FontAwesomeIcon icon="fa-regular fa-file-export" />
        <h1>Export</h1>
        <div>
        <div style={{marginTop:"20px"}} >
        <CustomButton 
        
         title={props.language==='en'? 'Export Template':AdminTranslation["Add"]}
                            variant="outlined"
                            // buttonTitleColor={props.theme === "default" ? `#0d7e8a` : props.theme === 'light' ? '#6d7175' : "#0d7e8a "}
                            buttonBorderColor={props.theme === "default" ? "#0d7e8a" : props.theme === 'light' ? '#6d7175' : "#0d7e8a "}
                           
                            type="submit"
                            Theme={props.theme}
                            // Theme={"asdasda"}
                            
                            loading={false}
                            disabled={false}
                            fullWidth={true}
                            loaderSize={25}
                            loaderColor="success"
                            loaderThickness={5} 
                            startIcon={<CloudUploadIcon/>}



                            />
                            </div>
<div style={{marginTop:"20px"}}>
<CustomButton 
       
        title={props.language==='en'? 'Export Data':AdminTranslation["Add"]}
                           variant="outlined"
                           buttonTitleColor={props.theme === "default" ? `#0d7e8a` : props.theme === 'light' ? '#6d7175' : "#0d7e8a "}
                           buttonBorderColor={props.theme === "default" ? "#0d7e8a" : props.theme === 'light' ? '#6d7175' : "#0d7e8a "}
                          
                           type="submit"
                           Theme={props.theme}

                           
                           loading={false}
                           disabled={false}
                           fullWidth={true}
                           loaderSize={25}
                           loaderColor="success"
                           loaderThickness={5} 
                           startIcon={<CloudUploadIcon/>}



                           />
    
        
      </div>
      </div>

      </div>

      <div
        className={`${styles.Impex_importBox} ${
          props.theme === "default"
            ? ImpexDefaultTheme.Impex_importBox
            : props.theme === "light"
            ? ImpexLightTheme.Impex_importBox
            : ImpexDarkTheme.Impex_importBox
        }`}
      >
        <h1>Import</h1>
        {/* DropDown Component */}
        <DropDown/>
       
        {/* <Impexbtn
            btntitle="Select File"
            starticon={<AddIcon />}
            tooltipTitle="The file must have all the sheets"
            // ref={buttonRef}  // Not sure what this ref is used for
          /> */}


          <CustomButton   title={props.language==='en'? 'Select File':AdminTranslation["Add"]}
                            variant="outlined"
                            buttonTitleColor={props.theme === "default" ? `#0d7e8a` : props.theme === 'light' ? '#6d7175' : "#0d7e8a "}
                            buttonBorderColor={props.theme === "default" ? "#0d7e8a" : props.theme === 'light' ? '#6d7175' : "#0d7e8a "}
                           
                            Theme={props.theme}
                            type="submit"
                            
                            loading={false}
                            disabled={false}
                            fullWidth={true}
                            loaderSize={25}
                            loaderColor="success"
                            loaderThickness={5} 
                            // ref={buttonRef} 
                            tooltipTitle="The file must have all the sheets"
                            startIcon={<AddIcon/>} />
                         
        <div style={{marginTop:"20px"}} >
        <CustomButton 
        
         title={props.language==='en'? 'Import Data':AdminTranslation["Add"]}
                            variant="outlined"
                            buttonTitleColor={props.theme === "default" ? `#0d7e8a` : props.theme === 'light' ? '#6d7175' : "#0d7e8a "}
                            buttonBorderColor={props.theme === "default" ? "#0d7e8a" : props.theme === 'light' ? '#6d7175' : "#0d7e8a "}
                           
                            type="submit"
                            
                            loading={false}
                            Theme={props.theme}

                            disabled={false}
                            fullWidth={true}
                            loaderSize={25}
                            loaderColor="success"
                            loaderThickness={5} 
                            startIcon={<CloudDownloadIcon/>}



                            />
                            </div>
      </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ImportExportBox);