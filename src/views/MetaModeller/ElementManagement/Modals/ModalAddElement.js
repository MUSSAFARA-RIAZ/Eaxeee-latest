import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { ChromePicker } from "react-color";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import AdminTranslation from "../../../../Utils/AdminTranslation/AdminTranslation";
import GreenEaxee from "../../../../Assets/Images/ModalEaxeeLogo.png";
import GreenEaxeeLogo from "../../../../Assets/Images/ModalEaxeeLogo.png";
import Crop75Icon from '@mui/icons-material/Crop75';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

const ModalAddElement = ({ open, handleClose, language, theme, onUserAdded, selectedRowData }) => {
  const [disableAddButton, setDisableAddButton] = useState(false);
  const layers = useSelector((state) => state.layers);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [selectedLayer, setSelectedLayer] = useState("");
  const [layerNotation, setLayerNotation] = useState("");
  const [isTextFieldDisabled, setTextFieldDisabled] = useState(true);
  const [hiddenBy, setHiddenBy] = useState("N/A");
  const [lockedBy, setLockedBy] = useState("N/A");
  const [isHidden, setIsHidden] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [description, setDescription] = useState("");
  const [originator, setOriginator] = useState('Admin');
  const [conceptType, setConceptType] = useState('Element');
  
  const getElementIcon = (iconType) => {
    switch (iconType) {
      case "Crop75Icon":
        return <Crop75Icon />;
      case "GreenEaxee":
        return <img src={GreenEaxee} alt="GreenEaxee" width="50" height="40" />;
      case "★":
        return "★"; // Text-based Icon
      default:
        return "❓"; // Fallback icon
    }
  };
  
  useEffect(() => {
    if (selectedRowData) {
      console.log("selecteddata",selectedRowData);
      
      // Prefill the form with selected data
      reset({
        ElementName: selectedRowData.ElementName || "",
        ElementNotation: selectedRowData.ElementNotation || "",
        ElementLayer: selectedRowData.ElementLayer || "",
      });

      setSelectedColor(selectedRowData.layercolor || "#000000");
      setLayerNotation(selectedRowData.ElementNotation || "");
      setSelectedLayer(selectedRowData.ElementLayer || "");
      setIsHidden(selectedRowData.isHidden === "YES");
      setIsLocked(selectedRowData.isLocked === "YES");
      setIsEnabled(selectedRowData.isEnabled === "YES");
      setHiddenBy(selectedRowData.isHidden === "YES" ? "Admin" : "N/A");
      setLockedBy(selectedRowData.isLocked === "YES" ? "Admin" : "N/A");
      setDescription(selectedRowData.Description || "");
    } else {
      // Reset form and clear states
      reset({
        ElementName: "",
        ElementNotation: "",
        ElementLayer: "",
      });
      setSelectedColor("#000000");
      setLayerNotation("");
      setSelectedLayer("");
      setIsHidden(false);
      setIsLocked(false);
      setIsEnabled(true);
      setHiddenBy("N/A");
      setLockedBy("N/A");
      setDescription("");
    }
  }, [open, selectedRowData, reset]);
  

  const onSubmit = (data) => {

    console.log("data in onsubmit",data);
    console.log("originator",originator);
    

    const updatedLayer = {
      id: selectedRowData ? selectedRowData.id : Date.now(),
      ConceptType:conceptType,
      ElementName: data.ElementName,
      ElementNotation:layerNotation,
      ElementLayer:selectedLayer,
      ElementColor:selectedColor,
      ElementIcon:getElementIcon("GreenEaxee"),
      ElementShape: getElementIcon("Crop75Icon"),





    
     
     Description: description,
      Originator: originator,
     
      HiddenBy: hiddenBy,
      LockedBy: lockedBy,
      isEnabled: isEnabled?"YES":"NO",
      isHidden: isHidden?"YES":"NO",
      isLocked: isLocked?"YES":"NO",
      // isTextFieldDisabled: isTextFieldDisabled,
      // selectedLayer: selectedLayer,

     
      // elementShape: "Square",
      // elementIcon: "★",
      // description,
      // originator:originator,
      // isEnabled: isEnabled ? "YES" : "NO",
      // isLocked: isLocked ? "YES" : "NO",
      // lockedBy,
      // isHidden: isHidden ? "YES" : "NO",
      // hiddenBy,
    };
    onUserAdded(updatedLayer);
    handleClose();
    setSelectedColor("#000000");
  };



  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedLayerDetails = layers.find(layer => layer.layername === selectedValue);

    setSelectedLayer(selectedValue);
    setSelectedColor(selectedLayerDetails?.layercolor || "");
    setLayerNotation(selectedLayerDetails?.layernotation || "");
    setTextFieldDisabled(!selectedLayerDetails);
  };


  const handleHiddenChange = (event) => {
    setIsHidden(event.target.checked);
    setHiddenBy(event.target.checked ? "Admin" : "N/A");
  };

  const handleLockedChange = (event) => {
    setIsLocked(event.target.checked);
    setLockedBy(event.target.checked ? "Admin" : "N/A");
  };

  const handleEnabledChange = (event) => {
    setIsEnabled(event.target.checked);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
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
            {selectedRowData ? (language === "en" ? "Edit Layer" : AdminTranslation["Edit Layer"]) : (language === "en" ? "Add Element" : AdminTranslation["Add Element"])}
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
            name="ElementName"
            type="text"
            label={language === "en" ? "Element Name" : AdminTranslation["Element Name"]}
            fullWidth
            size="small"
            variant="outlined"
            {...register("ElementName", { required: true })}
            sx={{ mt: 2, direction: isRTL ? "rtl" : "ltr" }}
          />
          
          <div style={{ display: "flex", gap: '16px', alignItems: "center", width: "100%" }}>
            <Select
              labelId="layer-select-label"
              value={selectedLayer}
              size="small"
              onChange={handleChange}
              margin="normal"
              displayEmpty
              sx={{ height: "40px", flex: 1 }}
            >
              <MenuItem value="" disabled>
                Element Layer
              </MenuItem>
              {layers.map((layer) => (
                <MenuItem key={layer.id} value={layer.layername}>
                  {layer.layername}
                </MenuItem>
              ))}
            </Select>

            <TextField
              label="ElementNotation"
              value={layerNotation}
              disabled={isTextFieldDisabled}
              InputProps={{ readOnly: true }}
              margin="normal"
              size="small"
              sx={{ flex: 1 }}
            />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <TextField
              label="Originator"
              value={originator}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
              size="small"
              style={{ flex: 1 }}
            />
            <TextField
              label="Concept Type"
              value={conceptType}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
              size="small"
              style={{ flex: 1 }}
            />
          </div>

          <Box sx={{ display: "flex", gap: "16px" }}>
            <Box>
              <FormControlLabel
                control={<Checkbox checked={isHidden} onChange={handleHiddenChange} />}
                label="Is Hidden?"
              />
              <TextField
                label="Hidden By"
                value={hiddenBy}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                size="small"
              />
            </Box>
            <Box>
              <FormControlLabel
                control={<Checkbox checked={isLocked} onChange={handleLockedChange} />}
                label="Is Locked?"
              />
              <TextField
                label="Locked By"
                value={lockedBy}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                size="small"
              />
            </Box>
          </Box>

          <FormControlLabel
            control={<Checkbox checked={isEnabled} onChange={handleEnabledChange} />}
            label="Is Enabled?"
          />

          <Box sx={{ display: "flex", gap: "16px" }}>
            <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
              <Typography sx={{ color: "#393a3a", opacity: 0.8 }}>
                {language === "en" ? "Element Shape" : AdminTranslation["Element Shape"]}
              </Typography>
              <IconButton sx={{ marginLeft: 1 }}>
                <Crop75Icon />
              </IconButton>
            </Box>

            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
              <Typography sx={{ color: "#393a3a", opacity: 0.8 }}>
                {language === "en" ? "Element Icon" : AdminTranslation["Element Icon"]}
              </Typography>
              <img src={GreenEaxeeLogo} style={{ width: '40px', height: '40px', marginRight: '5px' }} />
            </Box>
          </Box>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: "10px" }}>
            <Typography sx={{ color: "#393a3a", opacity: 0.8 }}>
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
                    width: '300px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  },
                },
              }}
            />
          )}

          <TextField
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            size="small"
          />

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddElement);
