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

const ModalAddUser = ({ open, handleClose, language, theme }) => {
  let snackBarMessage = "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    let { fullName, userName, email } = data;

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
  };

  const [snackBarFlag, setSnackBarFlag] = useState(false);

  const handleSnackBarClose = () => {
    setSnackBarFlag(false);
  };
  const handleUserSubmit = () => {
    setSnackBarFlag(true);
  };

  return (
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
          backgroundColor:
            theme === "default" ? "#2158a4" : theme === "dark" ? "#393a3a" : "",
          color: "#cecece",
          padding: "6px",
          paddingLeft: "35px",
        }}
      >
        {language === "en" ? "Add User" : AdminTranslation["Add user"]}
        <IconButton
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            color: "#cecece",
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
            marginTop: "20px",
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
              className={`${styles.userRegistrationFormFullName}`}
              {...register("fullName", {
                pattern: /^[A-Za-z]+$/i,
                required: true,
              })}
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
              sx={{ mt: 2 }}
              className="input-field"
              {...register("userName", {
                pattern: /^[A-Za-z]+$/i,
                required: true,
                minLength: 5,
              })}
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
              sx={{ mt: 2 }}
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
                padding: "10px",
                mb: -1.5,
              }}
            >
              <CustomButton
                title={language === "en" ? "Add" : AdminTranslation["Add"]}
                type="submit"
                onClick={handleUserSubmit}
                Theme={theme}
                sx={{ width: "50%" }}
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
