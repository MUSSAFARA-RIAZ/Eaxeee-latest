import React from "react";
import DropDown from "./ImpexComponents/DropDown";
import Messagesection from "./ImpexComponents/Messagesection";
import Impexbtn from "./ImpexComponents/Impexbtn";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AddIcon from "@mui/icons-material/Add";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../Impex/ImpexComponents/Impex.module.css";
import ImpexDefaultTheme from "../Impex/ImpexComponents/ImpexDefault.module.css";
import ImpexDarkTheme from "../Impex/ImpexComponents/ImpexDark.module.css";
import ImpexLightTheme from "../Impex/ImpexComponents/ImpexLight.module.css";
import { connect } from "react-redux";
import { Button } from "@mui/material";
function Impex(props) {
  console.log("Impex Props", props);

  const buttonRef = React.useRef();

  return (
    <>
      <div
        style={{
          display: "flex",
    flexDirection: "column",
  // padding: "10px 0px 0px 0px",
  backgroundColor:"#cceaed",
    maxHeight: "100%",
    boxSizing:"border-box",

    
    // border:"6px solid red",
    
        }}
      >
       <div
  style={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start", // Adjusted to start from the left
   padding: "10px", // Removed bottom padding to avoid extra space
  }}
>
  <Button variant="contained" style={{ margin: "0px 5px" }}>Button1</Button>
  <Button variant="contained" style={{ margin: "0px 5px" }}>Button2</Button>
  <Button variant="contained" style={{ margin: "0px 5px" }}>Button3</Button>
</div>

        <div
          className={`${styles.Impex_parentBox} ${
            props.theme === "default"
              ? ImpexDefaultTheme.Impex_parentBox
              : props.theme === "light"
              ? ImpexLightTheme.Impex_parentBox
              : ImpexDarkTheme.Impex_parentBox
          } `}
        >
          <div
            className={`${styles.Impex_leftpane} ${
              props.theme === "default"
                ? ImpexDefaultTheme.Impex_leftpane
                : props.theme === "light"
                ? ImpexLightTheme.Impex_leftpane
                : ImpexDarkTheme.Impex_leftpane
            }`}
          >
            {/* <button onClick={() => props.setTheme("dark")}>change theme</button> */}
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
              <Impexbtn
                btntitle="Export Template"
                starticon={<CloudUploadIcon />}
              />
              

              <Impexbtn
                btntitle="Export data"
                starticon={<CloudUploadIcon />}
              />
            </div>
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
              <hr/>
              <h1>Mussafara Riaz</h1>
             
              

          
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
              <DropDown />

              <div>
                <Impexbtn
                
                  btntitle="Select File"
                  starticon={<AddIcon />}
                  tooltipTitle="The file must have all the sheets"
                  ref={buttonRef}
                />
              </div>

              <Impexbtn
                btntitle="Import Data"
                starticon={<CloudDownloadIcon />}
              />
            </div>
          </div>

          <div
            className={`${styles.Impex_rightpane} ${
              props.theme === "default"
                ? ImpexDefaultTheme.Impex_rightpane
                : props.theme === "light"
                ? ImpexLightTheme.Impex_rightpane
                : ImpexDarkTheme.Impex_rightpane
            }`}

          
          >
            <Messagesection />
          </div>
        </div>
      </div>
    </>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Impex);
