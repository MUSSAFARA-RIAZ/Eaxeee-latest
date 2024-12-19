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
import DiamondThin from "../../../../Assets/Images/MetaModellerImages/diamondThin.svg";
import rightOpenArrow from "../../../../Assets/Images/MetaModellerImages/open.svg";
import none from "../../../../Assets/Images/MetaModellerImages/none.svg";


import LineStyleModal from "./LineStyleModal";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SolidLine from "../../../../Assets/Images/MetaModellerImages/solid.svg";
import DashedLine from "../../../../Assets/Images/MetaModellerImages/dashed.svg";
import DottedLine from "../../../../Assets/Images/MetaModellerImages/dotted.svg";
import StartShapeModal from "./StartShapeModal";
import Diamond from "../../../../Assets/Images/MetaModellerImages/diamond.svg";
import EndShapeModal from "./EndShapeModal";
// import Diamond from "../../../../Assets/Images/MetaModellerImages/diamond.svg";
// import none from "../../../../Assets/Images/MetaModellerImages/none.svg";
import oval from "../../../../Assets/Images/MetaModellerImages/oval.svg";
import UnfilledDiamond from "../../../../Assets/Images/MetaModellerImages/unfilled-diamond.svg";
import Blockfilled from "../../../../Assets/Images/MetaModellerImages/block.svg";
// import none from "../../../../Assets/Images/MetaModellerImages/CrossImage.svg";

const ModalAddRelation = ({ open, handleClose, language, theme, onUserAdded, selectedRowData }) => {

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
  const [conceptType, setConceptType] = useState('RelationShip');
  const lineStyleOptions = [
    { id: "solid", label: "Solid", image: SolidLine },
    { id: "dashed", label: "Dashed", image: DashedLine },
    {
      id: "dotted", label: "Dotted", image: DottedLine
    }
  ];
  const StartshapeOptions = [
    { id: "diamon", label: "Diamond", image: Diamond },
    { id: "none", label: "none", image: none },
    { id: "oval", label: "oval", image: oval },
    { id: "unfilled-diamond", label: "unfilled-diamond", image:
        UnfilledDiamond },
        { id: "block", label: "block", image: Blockfilled },
    // Add more shapes as needed
  ];
  const EndshapeOptions = [
    { id: "diamon", label: "Diamond", image: Diamond },
    { id: "none", label: "none", image: none },
    { id: "oval", label: "oval", image: oval },
    { id: "unfilled-diamond", label: "unfilled-diamond", image:
        UnfilledDiamond },
        { id: "block", label: "block", image: Blockfilled },
  ];
  // console.log("lineStyleOptions.find((option) => option.id === lineStyle)?.image",lineStyleOptions.find((option) => option.id === lineStyle));




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
  // New State for added fields
  const [lineStyle, setLineStyle] = useState("solid");

  const [startShape, setStartShape] = useState("diamon");
  const [endShape, setEndShape] = useState("unfilled-diamond");
  const [fromToInterpretation, setFromToInterpretation] = useState("");
  const [toFromInterpretation, setToFromInterpretation] = useState("");
  useEffect(() => {
    if (selectedRowData) {
      // Prefill the form and states with the values from selectedRowData
      reset({
        RelationName: selectedRowData.RelationName,
        RelationShipNotation: selectedRowData.RelationShipNotation,
        isEnabled: selectedRowData.isEnabled === "YES",
      });

      setSelectedColor(selectedRowData.Color || "#000000");
      setLineStyle(selectedRowData.LineStyle || "solid");
      setStartShape(selectedRowData.StartShape || "diamon");
      setEndShape(selectedRowData.EndShape || "unfilled-diamond");
      setFromToInterpretation(selectedRowData.FromtoToInterpretation || "");
      setToFromInterpretation(selectedRowData.TotoFromInterpretation || "");
      setDescription(selectedRowData.Description || "");
      setHiddenBy(selectedRowData.HiddenBy || "N/A");
      setLockedBy(selectedRowData.LockedBy || "N/A");
      setIsHidden(selectedRowData.isHidden === "YES");
      setIsLocked(selectedRowData.isLocked === "YES");
      setIsEnabled(selectedRowData.isEnabled === "YES");
    } else {
      // Reset the form and states to default values
      reset({
        RelationName: "",
        RelationShipNotation: "",
        isEnabled: true,
      });

      setSelectedColor("#000000");
      setLineStyle("solid");
      setStartShape("diamon");
      setEndShape("DiamondThin");
      setFromToInterpretation("");
      setToFromInterpretation("");
      setDescription("");
      setHiddenBy("N/A");
      setLockedBy("N/A");
      setIsHidden(false);
      setIsLocked(false);
      setIsEnabled(true);
    }
  }, [selectedRowData, reset]);




  const onSubmit = (data) => {
    const newRow = {
      id: selectedRowData ? selectedRowData.id : Date.now(),
      RelationName: data.RelationName,
      ConceptType: conceptType,
      Color: selectedColor,
      RelationShipNotation: data.RelationShipNotation,
      LineStyle: lineStyle,
      StartShape: startShape,
      EndShape: endShape,
      FromtoToInterpretation: fromToInterpretation,
      TotoFromInterpretation: toFromInterpretation,
      Description: description,
      isEnabled: data.isEnabled ? "YES" : "NO",

      Originator: originator,

      HiddenBy: hiddenBy,
      LockedBy: lockedBy,
      // isEnabled: isEnabled?"YES":"NO",
      isHidden: isHidden ? "YES" : "NO",
      isLocked: isLocked ? "YES" : "NO",
    };
    onUserAdded(newRow);
    handleClose();
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
  const [isStartShapeModalOpen, setIsStartShapeModalOpen] = useState(false);
  const [isEndShapeModalOpen, setIsEndShapeModalOpen] = useState(false);


  const isRTL = language === "ar";


  const [isLineStyleModalOpen, setIsLineStyleModalOpen] = useState(false);


  return (
    <>
      <LineStyleModal
        open={isLineStyleModalOpen}
        theme={theme}
        handleClose={handleClose}
        language={language}
        onClose={() => setIsLineStyleModalOpen(false)}
        onSelect={(style) => {
          setLineStyle(style);
          setIsLineStyleModalOpen(false);
        }}
        selectedLineStyle={lineStyle}
      />

      <StartShapeModal
        open={isStartShapeModalOpen}
        theme={theme}
        handleClose={handleClose}
        language={language}
        onClose={() => setIsStartShapeModalOpen(false)}
        onSelect={(shape) => {
          setStartShape(shape);
          setIsStartShapeModalOpen(false);  // Close the modal after selection
        }}
      />
      <EndShapeModal
        open={isEndShapeModalOpen}
        theme={theme}
        handleClose={handleClose}
        language={language}
        onClose={() => setIsEndShapeModalOpen(false)}
        onSelect={(shape) => {
          setEndShape(shape);
          setIsEndShapeModalOpen(false);  // Close the modal after selection
        }}
      />
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
              {selectedRowData ? (language === "en" ? "Edit Relation" : AdminTranslation["Edit Relation"]) : (language === "en" ? "Add Relation" : AdminTranslation["Add Relation"])}
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


            <Box sx={{ display: "flex", gap: '16px', alignItems: "center", width: "100%" }}>
              <TextField
                label="Relation Name"
                fullWidth
                size="small"
                margin="normal"
                {...register("RelationName", { required: true })}
                error={errors.RelationName}
                sx={{ flex: 1 }}
              />

              <TextField
                label="RelationShipNotation"
                {...register("RelationShipNotation", { required: true })}
                // value={layerNotation}
                // disabled={isTextFieldDisabled}
                // InputProps={{ readOnly: true }}
                margin="normal"
                size="small"
                sx={{ flex: 1 }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: '16px', alignItems: "center", width: "100%" }}>
              <TextField
                label="From to To Interpretation"
                fullWidth
                margin="normal"
                size="small"
                value={fromToInterpretation}
                onChange={(e) => setFromToInterpretation(e.target.value)}
              />

              {/* To to From Interpretation */}
              <TextField
                label="To to From Interpretation"
                fullWidth
                margin="normal"
                size="small"
                value={toFromInterpretation}
                onChange={(e) => setToFromInterpretation(e.target.value)}
              />
            </Box>





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
            <Box sx={{ display: "flex", gap: "16px" }}>

              <Box sx={{ flex: 1 }}>


                <FormControlLabel
                  control={<Checkbox checked={isEnabled} onChange={handleEnabledChange} />}
                  label="Is Enabled?"
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                <Typography sx={{ color: "#393a3a", opacity: 0.8 }}>
                  {language === "en" ? "Line Style" : AdminTranslation["Line Style"]}
                </Typography>
                <img
                  src={lineStyleOptions.find((option) => option.id === lineStyle)?.image}
                  alt="Selected Line Style"
                  style={{ width: "80px", height: "40px", objectFit: "contain" }}
                />
                <IconButton onClick={() => setIsLineStyleModalOpen(true)}>

                  <BorderColorIcon />
                </IconButton>

              </Box>

            </Box>

            <Box sx={{ display: "flex", gap: "16px" }}>
              <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                <Typography sx={{ color: "#393a3a", opacity: 0.8 }}>
                  {language === "en" ? "Start Shape" : AdminTranslation["Start Shape"]}
                </Typography>
                {startShape && (
                  <img
                    src={StartshapeOptions.find((option) => option.id === startShape)?.image}
                    alt="Start Shape"
                    style={{ position: "relative", left: "5px", width: "20px", height: "20px", objectFit: "contain" }}
                  />
                )}
                <IconButton onClick={() => setIsStartShapeModalOpen(true)}>
                  <BorderColorIcon />
                </IconButton>

              </Box>



              {/* End Shape */}
              <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                <Typography sx={{ color: "#393a3a", opacity: 0.8 }}>
                  {language === "en" ? "End Shape" : AdminTranslation["End Shape"]}
                </Typography>
                {endShape && (
                  <img
                    src={EndshapeOptions.find((option) => option.id === endShape)?.image}
                    alt="End Shape"
                    style={{ position: "relative", left: "5px", width: "20px", height: "20px", objectFit: "contain" }}
                  />
                )}
                <IconButton onClick={() => setIsEndShapeModalOpen(true)}>
                  <BorderColorIcon />
                </IconButton>

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddRelation);
