// Popup.jsx
import React, { useState } from 'react';

// import { useTranslation } from 'react-i18next';

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { connect } from "react-redux";
import CustomButton from '../../../../components/CustomButton/CustomButton';
import AdminTranslation from '../../../../Utils/AdminTranslation/AdminTranslation';
import GreenEaxee from "../../../../Assets/Images/ModalEaxeeLogo.png";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";

const PopupTree4 = ({ handleClose, itemNameInput, setItemNameInput, updateTreeState, type, setSelectedFile, createNewFolder, createNewFile, closeCreateFolderModal, props }) => {
  const isRTL = props.language === "ar";
  const [open, setOpen] = useState(true); // Initially true to show the modal


  console.log("updateTreeState====================>",updateTreeState)

  const handleDialogClose = () => {
    setOpen(false); // Hide the modal
    if (closeCreateFolderModal) closeCreateFolderModal(); // Call the external close function if provided
  };

  return (
    <div className="popup">
      <div className='popupChildDiv'>
        <Dialog open={open} onClose={handleDialogClose} PaperProps={{
          sx: {
            width: "500px",
            maxWidth: "70%",
          },
        }}>
          <DialogTitle
            sx={{
              backgroundColor: props.theme === "default" ? "#2158a4" : props.theme === "dark" ? "#393a3a" : "",
              color: "#cecece",
              padding: "3px 16px",
              display: "flex",
              alignItems: "center", // Align items vertically in the center
              justifyContent: "space-between", // Space out the content
              position: "relative", // Required for absolute positioning of the close icon
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}> {/* Flex for logo and title */}
              <img
                src={GreenEaxee}
                alt="img"
                style={{ width: "40px", height: "40px", marginRight: "5px" }}
              />
              <Typography variant="h6">
                {(props.language === "en" && updateTreeState.action==="create meta-model") ? "Create Folder" : "Create Process"}
              </Typography>
            </Box>

            <IconButton
              sx={{
                position: "absolute",
                top: "50%", // Center vertically
                // right: "10px", // Padding from the right edge
                transform: "translateY(-50%)", // Correct vertical alignment
                color: "#cecece",
                [props.language === 'ar' ? 'left' : 'right']: 0
              }}
              onClick={handleDialogClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <div
            style={{
              backgroundColor:
                props.theme === "default" ? "#cecece" : props.theme === "dark" ? "#212121" : "",
            }}
          >
            <DialogContent
            //   sx={{
            //     marginTop: "10px",
            //   }}
            >
              <form>
                <TextField
                  name="fullName"
                  type="text"
                  label={(updateTreeState.action === "create meta-model" && type==="folder") ? "Folder name" : "Process name"}
                  autoComplete="off"
                  fullWidth
                  size="small"
                  variant="outlined" // Required for floating label
                  value={itemNameInput}
                  onChange={(e) => setItemNameInput(e.target.value)}
                  placeholder={(updateTreeState.action === "create meta-model" && type==="folder") ? "Folder name" : "Process name"}
                  required

                  sx={{
                    // mt: 2,
                    direction: isRTL ? "rtl" : "ltr", // RTL text input
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        textAlign: isRTL ? "right" : "left", // Align text to right in RTL
                      },
                      "&:hover fieldset": {
                        // borderColor: "dialogInputfield.main",
                        textAlign: isRTL ? "right" : "left", // Hover color
                      },
                      "&.Mui-focused fieldset": {
                        // borderColor: "dialogInputfield.main",
                        textAlign: isRTL ? "right" : "left", // Focus color
                      },
                      "& input::placeholder": {
                        // color: "inputlabelcolor.main",
                        textAlign: isRTL ? "right" : "left", // Placeholder color
                      },
                      "& input": {
                        // color: "inputfieldTextColor.main", // Text color when typing
                        textAlign: isRTL ? "right" : "left", // Ensure the text inside input is aligned correctly for RTL
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      transformOrigin: isRTL ? "top right" : "top left", // Align label origin to the right for RTL
                      "&.Mui-focused": {
                        // color: "dialogInputfield.main", // Focused label color
                      },
                      textAlign: isRTL ? "right" : "left", // Label alignment based on direction
                      right: isRTL ? 24 : "auto", // Ensure it moves to the right in RTL
                    },
                  }}
                />
                <Box >

                </Box>



                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",



                    margin: "0px",
                    position: "relative",
                    top: "18px",


                  }}
                >
                  <CustomButton
                    title={props.language === "en" ? "Add" : AdminTranslation["Add"]}
                    type="submit"
                    // onClick={handleUserSubmit}
                    onClick={
                      updateTreeState.action === "create meta-model"
                        ? createNewFolder
                        : createNewFile
                    }

                    // Theme={props.theme}
                    sx={{ width: "50%" }}
                  />
                  <CustomButton
                    title={
                      props.language === "en" ? "Cancel" : AdminTranslation["Cancel"]
                    }
                    type="button"
                    // Theme={props.theme}
                    onClick={handleDialogClose}
                    // onClick={handleClose}
                    sx={{ width: "50%" }}
                  />
                </Box>
              </form>
            </DialogContent>
          </div>


        </Dialog>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PopupTree4);