import React from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import SnackBar from '../../../components/SnackBar/SnackBar';

import styles from './UserManagement.module.css'
import CustomTable from '../../../components/CustomTable/CustomTable';
import CustomButton from '../../../components/CustomButton/CustomButton';
import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';


const UserRegistration = (props) => {


    let { language, theme } = props;
    let snackBarMessage = ""

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        let { fullName, userName, email } = data

        if (!fullName) {
            snackBarMessage = "Full Name is required";
            setSnackBarFlag(true)
        } else if (!userName) {
            snackBarMessage = "User Name is required";
            setSnackBarFlag(true)
        } else if (!email) {
            snackBarMessage = "User Name is required";
            setSnackBarFlag(true)
        }
    };
    const [snackBarFlag, setSnackBarFlag] = React.useState(false)

    const handleUserSubmit = () => {
        setSnackBarFlag(true)
    }

    const tableRowData = [
        {
            name: (language === 'en' ? 'abc' : AdminTranslation["abc"]),
            id: (language === 'en' ? 'abc12' : AdminTranslation["abc12"]),
            email: (language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"]),
        },
        {
            name: (language === 'en' ? 'user' :  AdminTranslation["user"]),
            id: (language === 'en' ? 'user12' :  AdminTranslation["user12"]),
            email: (language === 'en' ? 'test@gmail.com' :  AdminTranslation["test@gmail.com"]),

        },
        {
            name: (language === 'en' ? 'sample' : AdminTranslation["sample"]),
            id: (language === 'en' ? 'sample12' : AdminTranslation["sample12"]),
            email: (language === 'en' ? 'test@gmail.com' :  AdminTranslation["test@gmail.com"]),

        },
        {
            name: (language === 'en' ? 'test' : AdminTranslation["test"]),
            id: (language === 'en' ? 'test12' : AdminTranslation["test12"]),
            email: (language === 'en' ? 'test@gmail.com' :  AdminTranslation["test@gmail.com"]),

        },
        {
            name: (language === 'en' ? 'xyz' : AdminTranslation["xyz"]),
            id: (language === 'en' ? 'xyz12' : AdminTranslation["xyz12"]),
            email: (language === 'en' ? 'test@gmail.com' :  AdminTranslation["test@gmail.com"]),

        },
        {
            name: (language === 'en' ? 'new' : AdminTranslation["new"]),
            id: (language === 'en' ? 'new12' : AdminTranslation["new12"]),
            email: (language === 'en' ? 'test@gmail.com' :  AdminTranslation["test@gmail.com"]),

        }
    ]

    let activateButton = (item) => {
        console.log(item)
    }

    const columns = [
        { field: 'id', headerName: (language === 'en' ? 'ID' : AdminTranslation["ID"]), flex: 1 },
        { field: 'name', headerName: (language === 'en' ? 'Name' : AdminTranslation["Name"]), flex: 1 },
        { field: 'email', headerName: (language === 'en' ? 'Email' : AdminTranslation["Email"]), flex: 1 },
        {
            field: 'action', headerName: (language === 'en' ? 'Action' : 'عمل'), flex: 1,
            renderCell: (params) => {
                const onClick = (e) => {
                    const currentRow = params.row;
                    activateButton(currentRow)
                    // return alert(JSON.stringify(currentRow, null, 4));
                };

                return (
                    <CustomButton
                    className="activate-button"
                    title={language === 'en' ? 'Activate' : AdminTranslation["Activate"]}
                    variant="outlined"
                    buttonTitleColor={theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "}
                    buttonBorderColor={theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "}
                    onClick={onClick}
                    type="submit"
                    loading={false}
                    disabled={false}
                    fullWidth={true}
                    loaderSize={25}
                    loaderColor="success"
                    loaderThickness={5}
                />
                );
            },
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
                            label={language === 'en' ? 'Full Name' : AdminTranslation["Full Name"]}
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
                                <span>{language === 'en' ? 'This is a required field' : AdminTranslation["This is a required field"]}</span>
                            )}
                            {errors.fullName && errors.fullName.type === "pattern" && (
                                <span>
                                    {language === 'en' ? 'Special characters are not allowed' : AdminTranslation["Special characters are not allowed"]}
                                </span>
                            )}
                        </Box>
                    </Box>
                    <Box className={`${styles.userRegistrationFormInputParent}`}>
                        <TextField
                            name="text"
                            type="text"
                            label={language === 'en' ? 'Username' : AdminTranslation["Username"]}
                            id="outlined"
                            autoComplete="off"
                            fullWidth={true}
                            size="small"
                            className="input-field"
                            {...register('userName', {
                                pattern: /^[A-Za-z]+$/i,
                                required: true,
                                minLength: 5,

                            })}
                        />
                        <Box className={`${styles.userRegistrationFormErrorDiv}`}>
                            {errors.userName && errors.userName.type === "required" && (
                                <span>{language === 'en' ? 'This is a required field' : AdminTranslation["This is a required field"]}</span>
                            )}
                            {errors.userName && errors.userName.type === "minLength" && (
                                <span>
                                    {language === 'en' ? 'Minimum 5 characters are required' : AdminTranslation["Minimum 5 characters are required"]}
                                </span>
                            )}
                            {errors.userName && errors.userName.type === "pattern" && (
                                <span>
                                    {language === 'en' ? 'Special characters are not allowed' : AdminTranslation["Special characters are not allowed"]}
                                </span>
                            )}
                        </Box>
                    </Box>
                    <Box className={`${styles.userRegistrationFormInputParent}`} >
                        <TextField
                            name="email"
                            type="text"
                            label={language === 'en' ? 'Email' : AdminTranslation["Email"]}
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
                                    <span>{language === 'en' ? 'This is a required field' : AdminTranslation["This is a required field"]}</span>
                                    <SnackBar open={snackBarFlag} setOpen={setSnackBarFlag} message={snackBarMessage}></SnackBar>
                                </div>

                            )}
                            {errors.email && errors.email.type === "pattern" && (
                                <span>{language === 'en' ? 'Enter a valid email' : AdminTranslation["Enter a valid email"]}</span>
                            )}
                        </Box>
                    </Box>

                    <Box className={`${styles.userRegistrationFormInputParent}`} >
                        <CustomButton
                            title={language==='en'? 'Add':AdminTranslation["Add"]}
                            variant="outlined"
                            buttonTitleColor={theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "}
                            buttonBorderColor={theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "}
                            onClick={handleUserSubmit}
                            type="submit"
                            loading={false}
                            disabled={false}
                            fullWidth={true}
                            loaderSize={25}
                            loaderColor="success"
                            loaderThickness={5}
                        />
                    </Box>
                </form>
            </Box >

            <Box className={`${styles.userRegistrationTableDiv}`}>
                <CustomTable rows={tableRowData} columns={columns} rowsPerPage={10} pageSize={10} checkBoxSelection={false} />
            </Box>

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