import React, { useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import styles from "./Modals.UserManagement.css";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import AdminTranslation from "../../../../Utils/AdminTranslation/AdminTranslation";
import GreenEaxee from "../../../../Assets/Images/ModalEaxeeLogo.png"
import { addUser } from "../../../../apis/user_management";
import AlertComponent from "../../../../components/alerts/AlertComponent";


const ModalAddUser = ({ open, handleClose, language, theme, onUserAdded }) => {
  let snackBarMessage = "";
  const [snackBarFlag, setSnackBarFlag] = useState(true);
  const [disableAddButton, setDisableAddButton] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); // Alert message state

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },

  } = useForm();

  const onSubmit = async (data) => {
    console.log("Clicked Add User")

    console.log(data);
    let { fullName, userName, email } = data;
    console.log("handle close")

    if (!fullName) {
      snackBarMessage = "Full Name is required";
      setSnackBarFlag(true);
    } else if (!userName) {
      snackBarMessage = "User Name is required";
      setSnackBarFlag(true);
    } else if (!email) {
      snackBarMessage = "Email is required";
      setSnackBarFlag(true);

    }
    else {
      setDisableAddButton(true)
      console.log("calling api...")
      const res = await addUser({
        "full_name": fullName,
        "username": userName,
        "email": email
      }

      )
      setDisableAddButton(false)
      if (res.code === 200) {

        setAlertMessage(res.data.message);
        console.log("User added and 'onUserAdded' event is triggered...")
        handleClose()
        reset()
        onUserAdded();

        // alert(res.data.message)

      } else {
        console.log("Couldn't add user for some reason")
        setAlertMessage(res.error)
        // alert(res.error)
      }

      console.log("thisisalertmessage",alertMessage)

      console.log("res is: ", res)

    }
  };


  const handleSnackBarClose = () => {
    setSnackBarFlag(false);
  };
  const handleUserSubmit = () => {
    setSnackBarFlag(true);
  };
  const isRTL = language === "ar";
  console.log("thisisalertmessage",alertMessage)

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
          sx: {
            width: "500px",
            maxWidth: "70%",
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: theme === "default" ? "#2158a4" : theme === "dark" ? "#393a3a" : "",
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
              {language === "en" ? "Add User" : AdminTranslation["Add User"]}
            </Typography>
          </Box>

          <IconButton
            sx={{
              position: "absolute",
              top: "50%", // Center vertically
              // right: "10px", // Padding from the right edge
              transform: "translateY(-50%)", // Correct vertical alignment
              color: "#cecece",
              [language === 'ar' ? 'left' : 'right']: 0
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <div
          style={{
            backgroundColor:
              theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "",
          }}
        >
          <DialogContent
            sx={{
              marginTop: "10px",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                name="fullName"
                type="text"
                label={
                  language === "en" ? "Full Name" : AdminTranslation["Full Name"]
                }
                autoComplete="off"
                fullWidth
                size="small"
                variant="outlined" // Required for floating label
                {...register("fullName", {
                  pattern: /^[A-Za-z\s]+$/i,
                  required: true,
                })}
                sx={{
                  mt: 2,
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
              <Box className={`${styles.userRegistrationFormErrorDiv}`}>
                {errors.fullName && errors.fullName.type === "required" && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "smaller",
                      textAlign: "left",
                    }}
                  >
                    {language === "en"
                      ? "This is a required field"
                      : AdminTranslation["This is a required field"]}
                  </div>
                )}
                {errors.fullName && errors.fullName.type === "pattern" && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "smaller",
                      textAlign: "left",
                    }}
                  >
                    {language === "en"
                      ? "Special characters are not allowed"
                      : AdminTranslation["Special characters are not allowed"]}
                  </div>
                )}
              </Box>

              <TextField
                name="userName"
                type="text"
                label={
                  language === "en" ? "Username" : AdminTranslation["Username"]
                }
                autoComplete="off"
                fullWidth
                size="small"

                className="input-field"
                {...register("userName", {
                  pattern: /\S+@\S+\.\S+/,
                  required: true,
                  minLength: 5,
                })}
                sx={{
                  mt: 2,
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
              <Box className={`${styles.userRegistrationFormErrorDiv}`}>
                {errors.userName && errors.userName.type === "required" && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "smaller",
                      textAlign: "left",
                    }}
                  >
                    {language === "en"
                      ? "This is a required field"
                      : AdminTranslation["This is a required field"]}
                  </div>
                )}
                {errors.userName && errors.userName.type === "minLength" && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "smaller",
                      textAlign: "left",
                    }}
                  >
                    {language === "en"
                      ? "Minimum 5 characters are required"
                      : AdminTranslation["Minimum 5 characters are required"]}
                  </div>
                )}
                {errors.userName && errors.userName.type === "pattern" && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "smaller",
                      textAlign: "left",
                    }}
                  >
                    {language === "en"
                      ? "Special characters are not allowed"
                      : AdminTranslation["Special characters are not allowed"]}
                  </div>
                )}
              </Box>

              <TextField
                name="email"
                type="text"
                label={language === "en" ? "Email" : AdminTranslation["Email"]}
                autoComplete="off"
                fullWidth={true}
                size="small"
                sx={{
                  mt: 2,
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
                className="input-field"
                {...register("email", {
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                })}
              />
              <Box className={`${styles.userRegistrationFormErrorDiv}`}>
                {errors.email && errors.email.type === "required" && (
                  <div>
                    <div
                      style={{
                        color: "red",
                        fontSize: "smaller",
                        textAlign: "left",
                      }}
                    >
                      {language === "en"
                        ? "This is a required field"
                        : AdminTranslation["This is a required field"]}
                    </div>
                    <Snackbar
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      open={snackBarFlag}
                      autoHideDuration={1500}
                      onClose={handleSnackBarClose}
                    >
                      <Alert severity="error">
                        Please ensure all required fields are filled!
                      </Alert>
                    </Snackbar>
                  </div>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "smaller",
                      textAlign: "left",
                    }}
                  >
                    {language === "en"
                      ? "Enter a valid email"
                      : AdminTranslation["Enter a valid email"]}
                  </div>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",



                  margin: "0px",
                  position: "relative",
                  top: "10px",


                }}
              >
                <CustomButton
                  title={language === "en" ? "Add" : AdminTranslation["Add"]}
                  type="submit"
                  onClick={handleUserSubmit}

                  Theme={theme}
                  sx={{ width: "50%" }}
                  disabled={disableAddButton}
                />
                <CustomButton
                  title={
                    language === "en" ? "Cancel" : AdminTranslation["Cancel"]
                  }
                  type="button"
                  Theme={theme}
                  onClick={handleClose}
                  sx={{ width: "50%" }}
                />
              </Box>
            </form>
          </DialogContent>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddUser);