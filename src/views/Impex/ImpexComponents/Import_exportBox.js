import React from "react";
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
import { connect } from "react-redux";

const ImportExportBox = ({ props }) => {
  console.log("In import export box", props.theme);
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
        <h1
          className={`${
            props.theme === "default"
              ? ImpexDefaultTheme.Import_Export_Head
              : props.theme === "light"
              ? ImpexLightTheme.Import_Export_Head
              : ImpexDarkTheme.Import_Export_Head
          }`}
        >
          Export
        </h1>
        <div>
          <div style={{ marginTop: "20px" }}>
            <CustomButton
              title={
                props.language === "en"
                  ? "Export Template"
                  : AdminTranslation["Add"]
              }
              variant="outlined"
              type="submit"
              Theme={props.theme}
              loading={false}
              disabled={false}
              fullWidth={true}
              loaderSize={25}
              loaderColor="success"
              loaderThickness={5}
              startIcon={<CloudUploadIcon />}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <CustomButton
              title={
                props.language === "en"
                  ? "Export Data"
                  : AdminTranslation["Add"]
              }
              variant="outlined"
              // buttonTitleColor={
              //   props.theme === "default"
              //     ? `#2158a4`
              //     : props.theme === "light"
              //     ? "#6d7175"
              //     : "#cecece"
              // }
              // buttonBorderColor={
              //   props.theme === "default"
              //     ? "#2158a4"
              //     : props.theme === "light"
              //     ? "#6d7175"
              //     : "#cecece"
              // }
              type="submit"
              Theme={props.theme}
              loading={false}
              disabled={false}
              fullWidth={true}
              loaderSize={25}
              loaderColor="success"
              loaderThickness={5}
              startIcon={<CloudUploadIcon />}
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
        <h1
          className={`${
            props.theme === "default"
              ? ImpexDefaultTheme.Import_Export_Head
              : props.theme === "light"
              ? ImpexLightTheme.Import_Export_Head
              : ImpexDarkTheme.Import_Export_Head
          }`}
        >
          Import
        </h1>
        {/* DropDown Component */}
        <div style={{ marginTop: "20px" }}>
          <DropDown props={props} />

          <CustomButton
            title={
              props.language === "en" ? "Select File" : AdminTranslation["Add"]
            }
            variant="outlined"
            // buttonTitleColor={
            //   props.theme === "default"
            //     ? `#2158a4`
            //     : props.theme === "light"
            //     ? "#6d7175"
            //     : "#2158a4 "
            // }
            // buttonBorderColor={
            //   props.theme === "default"
            //     ? "#2158a4"
            //     : props.theme === "light"
            //     ? "#6d7175"
            //     : "#2158a4 "
            // }
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
            startIcon={<AddIcon />}
          />

          <div style={{ marginTop: "20px" }}>
            <CustomButton
              title={
                props.language === "en"
                  ? "Import Data"
                  : AdminTranslation["Add"]
              }
              variant="outlined"
              // buttonTitleColor={
              //   props.theme === "default"
              //     ? `#2158a4`
              //     : props.theme === "light"
              //     ? "#6d7175"
              //     : "#2158a4 "
              // }
              // buttonBorderColor={
              //   props.theme === "default"
              //     ? "#2158a4"
              //     : props.theme === "light"
              //     ? "#6d7175"
              //     : "#2158a4 "
              // }
              type="submit"
              loading={false}
              Theme={props.theme}
              disabled={false}
              fullWidth={true}
              loaderSize={25}
              loaderColor="success"
              loaderThickness={5}
              startIcon={<CloudDownloadIcon />}
            />
          </div>
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
