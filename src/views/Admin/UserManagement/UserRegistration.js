import React from 'react';
// import "../../styles/administrationen.css";
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import SnackBar from '../../../components/SnackBar/SnackBar';
// import MuiTable from '../../../../assets/muicomponents/components/MuiTable';

import styles from './UserManagement.module.css'



const UserRegistration = (props) => {


    let { theme } = props;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    // console.log(errors)
    const [snackBarFlag, setSnackBarFlag] = React.useState(false)

    // const theme = useTheme();
    // // console.log("useThemeIman", theme.palette)

    const handleUserSubmit = () => {
        setSnackBarFlag(true)
    }

    const dummyRow = [
        {
            name: 'abc',
            id: 'abcid1',
            email: 'test@gmail.com',
            action: <Button className="activate-button" variant='outlined' sx={{
                color: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "),
                borderColor: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a ")
            }}>Activate</Button>
        },
        {
            name: 'user',
            id: 'userid2',
            email: 'test@gmail.com',
            action: <Button className="activate-button" variant='outlined' sx={{
                color: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "),
                borderColor: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a ")
            }}>Activate</Button>
        },
        {
            name: 'sample',
            id: 'sample2',
            email: 'test@gmail.com',
            action: <Button className="activate-button" variant='outlined' sx={{
                color: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "),
                borderColor: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a ")
            }}>Activate</Button>
        },
        {
            name: 'test',
            id: 'testid7',
            email: 'test@gmail.com',
            action: <Button className="activate-button" variant='outlined' sx={{
                color: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "),
                borderColor: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a ")
            }}>Activate</Button>
        },
        {
            name: 'xyz',
            id: 'xyzid7',
            email: 'test@gmail.com',
            action: <Button className="activate-button" variant='outlined' sx={{
                color: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "),
                borderColor: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a ")
            }}>Activate</Button>
        },
        {
            name: 'nancy',
            id: 'xyzid7',
            email: 'test@gmail.com',
            action: <Button className="activate-button" variant='outlined' sx={{
                color: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "),
                borderColor: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a ")
            }}>Activate</Button>
        }
    ]

    return (
        <Box className={styles.userRegistrationMain}>
            <Box className={`${styles.userRegistrationFormDiv}`}>
                <form
                    className={`${styles.userRegistrationForm}`}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Box className={`${styles.userRegistrationFormInputParent}`}>
                        <TextField
                            name="text"
                            type="text"
                            label="Full Name"
                            id="outlined"
                            autoComplete="off"
                            fullWidth={true}
                            size="small"
                            className={`${styles.userRegistrationFormFullName}`}
                            {...register('fullName', {
                                pattern: /^[A-Za-z]+$/i,
                                required: true,
                            })}

                        />
                        <Box className={`${styles.userRegistrationFormErrorDiv}`}>
                            {errors.fullName && errors.fullName.type === "required" && (
                                <span className="error-message">This is a required field</span>
                            )}
                            {errors.fullName && errors.fullName.type === "pattern" && (
                                <span className="error-message" >
                                    Special characters are not allowed
                                </span>
                            )}
                        </Box>
                    </Box>
                    <Box className={`${styles.userRegistrationFormInputParent}`}>
                        <TextField
                            name="text"
                            type="text"
                            label="Username"
                            id="outlined"
                            autoComplete="off"
                            fullWidth={true}
                            size="small"
                            className="input-field"
                            {...register('userName', {
                                pattern: /^[A-Za-z]+$/i,
                                required: true,
                                minLength: 5
                            })}
                        />
                        <Box className={`${styles.userRegistrationFormErrorDiv}`}>
                            {errors.userName && errors.userName.type === "required" && (
                                <span className="error-message">This is a required field</span>
                            )}
                            {errors.userName && errors.userName.type === "minLength" && (
                                <span className="error-message">
                                    Minimum 5 characters are required
                                </span>
                            )}
                            {errors.userName && errors.userName.type === "pattern" && (
                                <span className="error-message">
                                    Special characters are not allowed
                                </span>
                            )}
                        </Box>
                    </Box>
                    <Box className={`${styles.userRegistrationFormInputParent}`} >
                        <TextField
                            name="email"
                            type="text"
                            label="Email"
                            id="outlined"
                            autoComplete="off"
                            fullWidth={true}
                            size="small"
                            className="input-field"
                            {...register('email', {
                                required: true,
                                pattern: /\S+@\S+\.\S+/
                            })}
                        />
                        <Box className={`${styles.userRegistrationFormErrorDiv}`}>

                            {errors.email && errors.email.type === "required" && (
                                <div>
                                    <span className="error-message">This is a required field</span>
                                    <SnackBar open={snackBarFlag} setOpen={setSnackBarFlag}></SnackBar>
                                </div>

                            )}
                            {errors.email && errors.email.type === "pattern" && (
                                <span className="error-message">Enter a valid email</span>
                            )}
                        </Box>
                    </Box>

                    <Box className={`${styles.userRegistrationFormInputParent}`} >
                        <Button
                            color="primary"
                            type="submit"
                            variant="outlined"
                            className="submit-button"
                            fullWidth={true}
                            onClick={handleUserSubmit}
                            sx={{
                                color: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "),
                                borderColor: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a ")
                            }}
                        >
                            Add
                        </Button>
                    </Box>
                </form>
            </Box >
            <Box className={`${styles.userRegistrationTableDiv}`}></Box>
        </Box >

    )
}

const mapStateToProps = state => {
    return {
        language: state.language,
        theme: state.theme
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: (lang) => {
            return dispatch({
                type: "TOGGLELANG",
                value: (lang === 'en') ? 'ar' : "en"
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration); 