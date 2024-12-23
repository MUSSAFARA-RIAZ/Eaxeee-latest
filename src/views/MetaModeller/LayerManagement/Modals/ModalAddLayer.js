import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Typography,
  Alert,
} from "@mui/material";
import { ChromePicker } from "react-color";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import AdminTranslation from "../../../../Utils/AdminTranslation/AdminTranslation";
import GreenEaxee from "../../../../Assets/Images/ModalEaxeeLogo.png";
import styles from "./Modals.UserManagement.css";
import { connect } from "react-redux";
import AlertComponent from "../../../../components/alerts/AlertComponent";

const ModalAddLayer = ({ open, handleClose, language, theme, onUserAdded, selectedRowData, layers }) => {
  const [disableAddButton, setDisableAddButton] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); // Alert message state
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (selectedRowData) {
      reset({
        layerName: selectedRowData.layername,
        layerNotation: selectedRowData.layernotation,
        parentLayer: selectedRowData.parentlayer,
      });
      setSelectedColor(selectedRowData.layercolor);
    } else {
      reset();
      setSelectedColor("#000000");
    }
  }, [open, selectedRowData, reset]);

  const isRTL = language === "ar";

  const validateUniqueLayer = (data) => {
    const duplicateName = layers.some(
      (layer) => layer.layername.toLowerCase() === data.layerName.toLowerCase()
    );
    const duplicateNotation = layers.some(
      (layer) => layer.layernotation.toLowerCase() === data.layerNotation.toLowerCase()
    );
    const duplicateColor = layers.some(
      (layer) => layer.layercolor.toLowerCase() === selectedColor.toLowerCase()
    );

    if (duplicateName) {
      setAlertMessage("This layer name already exists!");
      return false;
    }
    if (duplicateNotation) {
      setAlertMessage("This layer notation already exists!");
      return false;
    }
    if (duplicateColor) {
      setAlertMessage("This layer color is already used!");
      return false;
    }
    return true;
  };


  const onSubmit = (data) => {
    if (!validateUniqueLayer(data)) return;

    const updatedLayer = {
      id: selectedRowData ? selectedRowData.id : Date.now(),
      layername: data.layerName,
      layernotation: data.layerNotation,
      layercolor: selectedColor,
      parentlayer: data.parentLayer,
    };

    onUserAdded(updatedLayer);
    handleClose();
    setSelectedColor("#000000");
    setAlertMessage("Layer added successfully!");
  };

  return (
    <>
      {alertMessage && (
        <AlertComponent
          message={alertMessage}
          severity={alertMessage.includes("success") ? "success" : "warning"}
          onClose={() => setAlertMessage("")} // Reset message on close
        />
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: "500px", maxWidth: "70%" },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: theme === "default" ? "#2158a4" : theme === "dark" ? "#393a3a" : "",
            color: "#cecece",
            padding: "3px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={GreenEaxee} alt="img" style={{ width: "40px", height: "40px", marginRight: "5px" }} />
            <Typography variant="h6">
              {selectedRowData
                ? language === "en"
                  ? "Edit Layer"
                  : AdminTranslation["Edit Layer"]
                : language === "en"
                  ? "Add Layer"
                  : AdminTranslation["Add Layer"]}
            </Typography>
          </Box>
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#cecece",
              [language === "ar" ? "left" : "right"]: 0,
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          style={{
            backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              name="layerName"
              type="text"
              label={language === "en" ? "Layer Name" : AdminTranslation["Layer Name"]}
              fullWidth
              size="small"
              variant="outlined"
              {...register("layerName", { required: true })}
              sx={{ mt: 2, direction: isRTL ? "rtl" : "ltr" }}
              error={!!errors.layerName}
              helperText={errors.layerName ? "Layer name is required" : ""}
            />
            <TextField
              name="layerNotation"
              type="text"
              label={language === "en" ? "Layer Notation" : AdminTranslation["Layer Notation"]}
              fullWidth
              size="small"
              {...register("layerNotation", { required: true })}
              sx={{ mt: 2, direction: isRTL ? "rtl" : "ltr" }}
              error={!!errors.layerNotation}
              helperText={errors.layerNotation ? "Layer notation is required" : ""}
            />
            <TextField
              name="parentLayer"
              type="text"
              label={language === "en" ? "Parent Layer" : AdminTranslation["Parent Layer"]}
              fullWidth
              size="small"
              {...register("parentLayer")}
              sx={{ mt: 2, direction: isRTL ? "rtl" : "ltr" }}
            />
            <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: "10px" }}>
              <Typography sx={{ color: "#393a3a", opacity: 0.8, position: "relative", left: "10px" }}>
                {language === "en" ? "Color" : AdminTranslation["Color"]}
              </Typography>
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: selectedColor,
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  position: "relative",
                  left: "10px",
                }}
                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
              ></Box>
            </Box>
            {isColorPickerOpen && (
              <ChromePicker
                color={selectedColor}
                onChangeComplete={(color) => setSelectedColor(color.hex)}
                styles={{
                  default: {
                    picker: {
                      position: "relative",
                      left: "80px",
                      width: "300px",
                      backgroundColor: "transparent",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    },
                  },
                }}
              />
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <CustomButton
                title={
                  selectedRowData
                    ? language === "en"
                      ? "Update"
                      : AdminTranslation["Update"]
                    : language === "en"
                      ? "Add"
                      : AdminTranslation["Add"]
                }
                type="submit"
                Theme={theme}
                sx={{ width: "50%" }}
                disabled={disableAddButton}
              />
              <CustomButton
                title={language === "en" ? "Cancel" : AdminTranslation["Cancel"]}
                type="button"
                Theme={theme}
                onClick={handleClose}
                sx={{ width: "50%" }}
              />
            </Box>
          </form>
        </DialogContent>
      </Dialog>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddLayer);
