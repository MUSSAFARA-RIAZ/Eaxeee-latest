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


const ImportExportBox = ({ theme }) => {
  return (
    <>
      <div
        className={`${styles.Impex_exportBox} ${
          theme === "default"
            ? ImpexDefaultTheme.Impex_exportBox
            : theme === "light"
            ? ImpexLightTheme.Impex_exportBox
            : ImpexDarkTheme.Impex_exportBox
        }`}
      >
        <FontAwesomeIcon icon="fa-regular fa-file-export" />
        <h1>Export</h1>
        <Impexbtn btntitle="Export Template" starticon={<CloudUploadIcon />} />
        <Impexbtn btntitle="Export data" starticon={<CloudUploadIcon />} />
      </div>

      <div
        className={`${styles.Impex_importBox} ${
          theme === "default"
            ? ImpexDefaultTheme.Impex_importBox
            : theme === "light"
            ? ImpexLightTheme.Impex_importBox
            : ImpexDarkTheme.Impex_importBox
        }`}
      >
        <h1>Import</h1>
        {/* DropDown Component */}
        <DropDown/>
        <div>
          <Impexbtn
            btntitle="Select File"
            starticon={<AddIcon />}
            tooltipTitle="The file must have all the sheets"
            // ref={buttonRef}  // Not sure what this ref is used for
          />
        </div>
        <Impexbtn btntitle="Import Data" starticon={<CloudDownloadIcon />} />
      </div>
    </>
  );
};

export default ImportExportBox;