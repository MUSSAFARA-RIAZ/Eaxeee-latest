import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { ChromePicker } from "react-color";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import AdminTranslation from "../../../../Utils/AdminTranslation/AdminTranslation";
import GreenEaxee from "../../../../Assets/Images/ModalEaxeeLogo.png";
import styles from "./Modals.UserManagement.css";
import { connect } from 'react-redux';

const ModalAddLayer = ({ open, handleClose, language, theme, onUserAdded, selectedRowData }) => {
  const [disableAddButton, setDisableAddButton] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // When the modal opens, reset the form if there's selectedRowData
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

  const onSubmit = (data) => {
    const updatedLayer = {
      id: selectedRowData ? selectedRowData.id : Date.now(), // Use the selected row's ID or generate a new one
      layername: data.layerName,
      layernotation: data.layerNotation,
      layercolor: selectedColor,
      parentlayer: data.parentLayer,
    };

    onUserAdded(updatedLayer); // Pass the updated layer to the parent
    handleClose(); // Close the modal
    setSelectedColor("#000000"); // Reset the color picker
  };

  const isRTL = language === "ar";

  return (
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
            {selectedRowData ? (language === "en" ? "Edit Layer" : AdminTranslation["Edit Layer"]) : (language === "en" ? "Add Layer" : AdminTranslation["Add Layer"])}
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
          />
          <TextField
            name="layerNotation"
            type="text"
            label={language === "en" ? "Layer Notation" : AdminTranslation["Layer Notation"]}
            fullWidth
            size="small"
            {...register("layerNotation", { required: true })}
            sx={{ mt: 2, direction: isRTL ? "rtl" : "ltr" }}
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
            <Typography sx={{color:"#393a3a", opacity:0.8, position:"relative",left:"10px"}}>{language === "en" ? "Color" : AdminTranslation["Color"]}</Typography>
            <Box
              sx={{
                width: "20px",
                height: "20px",
                backgroundColor: selectedColor,
                border: "1px solid #ccc",
                cursor: "pointer",
                position:"relative",
                left:"10px"
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
          position:"relative",
          left:"80px",
          width: '300px', // Increase the width
          // height: '300px', // Optional: adjust the height
          backgroundColor:"transparent",
          // boxShadow:"none",
          // border: '2px solid red', // Retain your red border styling
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add some shadow for better visibility
          // borderRadius: '8px', // Optional: smoother corners
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
              title={selectedRowData ? (language === "en" ? "Update" : AdminTranslation["Update"]) : (language === "en" ? "Add" : AdminTranslation["Add"])}
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
  );
};

const mapStateToProps = state => {
  return {
    language: state.language,
    theme: state.theme
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLanguage: (lang) => {
      return dispatch({
        type: "TOGGLELANG",
        value: (lang === 'en') ? 'ar' : "en"
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddLayer);
