import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, IconButton, Typography, TextField } from "@mui/material";
import { connect } from "react-redux";
import CustomButton from '../../../../components/CustomButton/CustomButton';
import AdminTranslation from '../../../../Utils/AdminTranslation/AdminTranslation';
import GreenEaxee from "../../../../Assets/Images/ModalEaxeeLogo.png";
import CloseIcon from "@mui/icons-material/Close";

const PopupTree3 = ({ handleClose, itemNameInput, setItemNameInput, updateTreeState, type, setSelectedFile, createNewFolder, createNewFile, closeCreateFolderModal, props }) => {
  const isRTL = props.language === "ar";
  const [open, setOpen] = useState(true); // Initially true to show the modal
  const [fileName, setFileName] = useState(""); // State for the uploaded file name

  const handleDialogClose = () => {
    setOpen(false); // Hide the modal
    if (closeCreateFolderModal) closeCreateFolderModal(); // Call the external close function if provided
  };

  // Handle file input change (extract the file name)
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file
    if (file) {
      setFileName(file.name); // Set the file name
      setItemNameInput(file.name); // Optionally set this in the input as well
    }
  };

  // Function to handle file upload and tree update
  const handleAddFile = () => {
    if (updateTreeState.action === "create meta-model") {
      createNewFolder(); // Create folder if action is "create meta-model"
    } else {
      createNewFile(); // Create file/document if action is "create document"
    }
    setFileName(""); // Reset file name after submission
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
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={GreenEaxee}
                alt="img"
                style={{ width: "40px", height: "40px", marginRight: "5px" }}
              />
              <Typography variant="h6">
                {(props.language === "en" && updateTreeState.action === "create meta-model") ? "Create Folder" : "Create Document"}
              </Typography>
            </Box>

            <IconButton
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#cecece",
                [props.language === 'ar' ? 'left' : 'right']: 0
              }}
              onClick={handleDialogClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <div style={{ backgroundColor: props.theme === "default" ? "#cecece" : props.theme === "dark" ? "#212121" : "" }}>
            <DialogContent>
            
                {/* Folder or document name input field (only for folder creation) */}
                {updateTreeState.action === "create meta-model" && type === "folder" && (
                  <TextField
                    name="fullName"
                    type="text"
                    label="Folder name"
                    autoComplete="off"
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={itemNameInput}
                    onChange={(e) => setItemNameInput(e.target.value)}
                    placeholder="Folder name"
                    required
                    sx={{
                    //   mt: 2,
                      direction: isRTL ? "rtl" : "ltr",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          textAlign: isRTL ? "right" : "left",
                        },
                        "&:hover fieldset": {
                          textAlign: isRTL ? "right" : "left",
                        },
                        "&.Mui-focused fieldset": {
                          textAlign: isRTL ? "right" : "left",
                        },
                        "& input::placeholder": {
                          textAlign: isRTL ? "right" : "left",
                        },
                        "& input": {
                          textAlign: isRTL ? "right" : "left",
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        transformOrigin: isRTL ? "top right" : "top left",
                        textAlign: isRTL ? "right" : "left",
                        right: isRTL ? 24 : "auto",
                      },
                    }}
                  />
                )}

                {/* Show file input only when creating a document */}
                {updateTreeState.action !== "create meta-model" && (
                  <Box sx={{ mt: 2 }}>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      style={{ width: "100%" }}
                    />
                  </Box>
                )}

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px", margin: "0px", position: "relative", top: "18px" }}>
                  <CustomButton
                    title={props.language === "en" ? "Add" : AdminTranslation["Add"]}
                    type="submit"
                    onClick={handleAddFile}
                    sx={{ width: "50%" }}
                  />
                  <CustomButton
                    title={props.language === "en" ? "Cancel" : AdminTranslation["Cancel"]}
                    type="button"
                    onClick={handleDialogClose}
                    sx={{ width: "50%" }}
                  />
                </Box>
            
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

export default connect(mapStateToProps, mapDispatchToProps)(PopupTree3);
