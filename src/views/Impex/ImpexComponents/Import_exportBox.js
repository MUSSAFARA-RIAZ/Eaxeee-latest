import { React , useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AddIcon from "@mui/icons-material/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../ImpexComponents/Impex.module.css";
import ImpexDefaultTheme from "../ImpexComponents/ImpexDefault.module.css";
import ImpexDarkTheme from "../ImpexComponents/ImpexDark.module.css";
import ImpexLightTheme from "../ImpexComponents/ImpexLight.module.css";
import DropDown from "./DropDown.js";
import CustomButton from "../../../components/CustomButton/CustomButton.js";
import AdminTranslation from "../../../Utils/AdminTranslation/AdminTranslation.js";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import ExportTemplateModal from "../Modals/ExportTemplateModal.js";
import { getElementNames, getAllRepositories } from "../../../apis/impex_management.js";
const ImportExportBox = ({ props }) => {
  const [open, setOpen] = useState(false);

  const [listOfElements, setListOfElements] = useState([]);
  const [listOfDropdownElements, setListOfDropdownElements] = useState([]);
  const [selectedArchitecture, setSelectedArchitecture] = useState('');

  //   const items = [
  //     { id: 1, name: "Item 1" },
  //     { id: 2, name: "Item 2" },
  //     { id: 3, name: "Item 3" },
  //     { id: 4, name: "Item 4" },
  // ];

  const [modalConfig, setModalConfig] = useState({
    open: false,
    title: "",
    buttons: [],
  });

  const handleDropDownChange = (value) => {
    // console.log("Selected Architecture in Parent:", value);
    setSelectedArchitecture(value);
  };
  // Open modal with specific configuration
  const handleOpenModal = (config) => {

    // if (config.title.lower() == 'Export Template'){

    //   const res = exportTemplate
    // }
    console.log("opened modal is: ", config)
    // console.log("oelemnt list is:: ",listOfElements)

    setModalConfig({ open: true, ...config });
    // console.log(modalConfig)
  };
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCloseModal = () => {

    setIsDisabled(false);

    setModalConfig({ ...modalConfig, open: false });
    console.log("disabled sae in handle close ", isDisabled);
  };
  // console.log("In import export box", props.theme);



  const handleDisabledChange = (value) => {
    setIsDisabled(value); // Update the parent's state
  };


  useEffect(() => {
    getElementNames()
      .then((res) => {
        if (res.code === 200) {
          // Assuming res.data is something like: ["Item 1", "Item 2", "Item 3", "Item 4"]
          // and you want it to be:
          // [
          //   { id: 1, name: "Item 1" },
          //   { id: 2, name: "Item 2" },
          //   { id: 3, name: "Item 3" },
          //   { id: 4, name: "Item 4" },
          // ]
          const transformedData = res.data.map((item, index) => ({
            id: index + 1,
            name: item
          }));

          setListOfElements(transformedData);
        } else if (res.code === 401) {
          console.error("Unauthorized access:", res.data);
        } else {
          console.error("Error fetching available licenses:", res.message || "Unknown error");
        }
      })
      .catch((error) => {
        console.error("Error fetching available licenses:", error);
      });
  }, []);


  useEffect(() => {
    getAllRepositories()
      .then((res) => {
        if (res.code === 200) {
          // Assuming res.data is something like: ["Item 1", "Item 2", "Item 3", "Item 4"]
          // and you want it to be:
          // [
          //   { id: 1, name: "Item 1" },
          //   { id: 2, name: "Item 2" },
          //   { id: 3, name: "Item 3" },
          //   { id: 4, name: "Item 4" },
          // ]
          const dropdownelements = res.data.map((item, index) => ({
            id: item.id,
            architecture_name: item.architecture_name
          }));

          setListOfDropdownElements(dropdownelements);
        } else if (res.code === 401) {
          console.error("Unauthorized access:", res.data);
        } else {
          console.error("Error fetching available licenses:", res.message || "Unknown error");
        }
      })
      .catch((error) => {
        console.error("Error fetching available licenses:", error);
      });
  }, []);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Programmatically click the hidden file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // Add your file processing logic here
    }
  };

  // const items = [
  //   { id: 1, name: "Item 1" },
  //   { id: 2, name: "Item 2" },
  //   { id: 3, name: "Item 3" },
  //   { id: 4, name: "Item 4" },
  // ];
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
              onClick={() => {
                if (!selectedArchitecture) {
                  alert("Cannot proceed, selectedArchitecture is null");
                  return;
                }
                handleOpenModal({
                  title: "Export Data",
                  buttons: [
                    { label: "Export", variant: "contained", onClick: () => console.log("Add clicked") },
                    { label: "Cancel", variant: "outlined", onClick: handleCloseModal },
                  ],
                });
              }}
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
          <DropDown
            language="en"
            theme="light"
            onValueChange={handleDropDownChange}
            listOfDropdownElements={listOfDropdownElements}
          />
          <div style={{ marginTop: "20px" }}>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <CustomButton
              title={props.language === "en" ? "Select File" : AdminTranslation["Add"]}
              variant="outlined"
              Theme={props.theme}
              type="button" // Make sure this is not "submit" to avoid form submission
              loading={false}
              disabled={false}
              fullWidth={true}
              loaderSize={25}
              loaderColor="success"
              loaderThickness={5}
              tooltipTitle="The file must have all the sheets"
              startIcon={<AddIcon />}
              onClick={handleButtonClick} // Trigger the file input click
            />
          </div>

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
              onClick={() => {
                if (!selectedArchitecture) {
                  alert("Cannot proceed, selectedArchitecture is null");
                  return;
                }
                handleOpenModal({
                  title: "Import Data",
                  buttons: [
                    { label: "Import", variant: "contained", onClick: () => console.log("Upload clicked") },
                    { label: "Cancel", variant: "outlined", onClick: handleCloseModal },
                  ],
                });
              }}

              startIcon={<CloudDownloadIcon />}
            />
            <ExportTemplateModal
              open={modalConfig.open}
              handleClose={handleCloseModal}
              dialogTitle={modalConfig.title}
              dialogButtons={modalConfig.buttons}
              props={props}
              items={listOfElements}
              selectedArchitecture={selectedArchitecture}
              onDisabledChange={handleDisabledChange}
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
