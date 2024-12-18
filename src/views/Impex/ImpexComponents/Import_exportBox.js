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
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import ExportTemplateModal from "../Modals/ExportTemplateModal.js";

const ImportExportBox = ({ props }) => {
  const [open, setOpen] = useState(false);


  const [modalConfig, setModalConfig] = useState({
    open: false,
    title: "",
    buttons: [],
  });

  // Open modal with specific configuration
  const handleOpenModal = (config) => {
    setModalConfig({ open: true, ...config });
  };


  const handleCloseModal = () => {
    setModalConfig({ ...modalConfig, open: false });
  };
  console.log("In import export box", props.theme);
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
];
  return (
    <>
      <div
        className={`${styles.Impex_exportBox} ${props.theme === "default"
          ? ImpexDefaultTheme.Impex_exportBox
          : props.theme === "light"
            ? ImpexLightTheme.Impex_exportBox
            : ImpexDarkTheme.Impex_exportBox
          }`}
      >
        <FontAwesomeIcon icon="fa-regular fa-file-export" />
        <h1
          className={`${props.theme === "default"
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
                  : AdminTranslation["Export Template"]
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
              onClick={() =>
                handleOpenModal({
                  title: "Export Template",
                  buttons: [
                    { label: "Export", variant: "contained", onClick: () => console.log("Add clicked") },
                    { label: "Cancel", variant: "outlined", onClick: handleCloseModal },
                  ],
                })
              }
            />


          </div>
          {/* <ExportTemplateModal open={open} handleClose={handleClose} props={props}/> */}
          <div style={{ marginTop: "20px" }}>
            <CustomButton
              title={
                props.language === "en"
                  ? "Export Data"
                  : AdminTranslation["Export Data"]
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
              onClick={() =>
                handleOpenModal({
                  title: "Export Data",
                  buttons: [
                    { label: "Export", variant: "contained", onClick: () => console.log("Proceed clicked") },
                    { label: "Cancel", variant: "outlined", onClick: handleCloseModal },
                  ],
                })
              }
            />
          </div>
          {/* <ExportTemplateModal open={open} handleClose={handleClose} props={props}/> */}
        </div>
      </div>

      <div
        className={`${styles.Impex_importBox} ${props.theme === "default"
          ? ImpexDefaultTheme.Impex_importBox
          : props.theme === "light"
            ? ImpexLightTheme.Impex_importBox
            : ImpexDarkTheme.Impex_importBox
          }`}
      >
        <h1
          className={`${props.theme === "default"
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
                  : AdminTranslation["Import Data"]
              }
              variant="outlined"

              type="submit"
              loading={false}
              Theme={props.theme}
              disabled={false}
              fullWidth={true}
              loaderSize={25}
              loaderColor="success"
              loaderThickness={5}
              onClick={() =>
                handleOpenModal({
                  title: "Import Data",
                  buttons: [
                    { label: "Import", variant: "contained", onClick: () => console.log("Upload clicked") },
                    { label: "Cancel", variant: "outlined", onClick: handleCloseModal },
                  ],
                })
              }
              startIcon={<CloudDownloadIcon />}
            />
            <ExportTemplateModal
              open={modalConfig.open}
              handleClose={handleCloseModal}
              dialogTitle={modalConfig.title}
              dialogButtons={modalConfig.buttons}
              props={props}
              items={items}
            />

            {/* <ExportTemplateModal open={open} handleClose={handleClose} props={props}/> */}
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
