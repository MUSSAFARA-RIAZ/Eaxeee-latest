import React, { useRef } from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
// import SnackBar from '../../../components/SnackBar/SnackBar';
import styles from './UserManagement.module.css'
import CustomTable from '../../../components/CustomTable/CustomTable';
import CustomButton from '../../../components/CustomButton/CustomButton';
import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';

const PasswordManagement = (props) => {

    const textfieldstyling = {
        "& label": {
            marginLeft: '65%',
            width: 100,
            "&.Mui-focused":{
                marginLeft: '70%',
            }
        },
        " & legend":{
            textAlign : "right",
            width: "20%"
        }
    }

    let { language, theme } = props;
    console.log("themeee",theme);
    const { register, formState: { errors }, handleSubmit, watch } = useForm({});
    const password = useRef({});
    password.current = watch("password", "");
    const onSubmit = async data => {
        alert(JSON.stringify(data));
    };

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

    let changeButton = (item) => {
        console.log(item)
    }

    const columns = [
        { field: 'id', headerName: (language === 'en' ? 'ID' : AdminTranslation["ID"]), flex: 1 },
        { field: 'name', headerName: (language === 'en' ? 'Name' : AdminTranslation["Name"]), flex: 1 },
        { field: 'email', headerName: (language === 'en' ? 'Email' : AdminTranslation["Email"]), flex: 1 },
        {
            field: 'action', headerName: (language === 'en' ? 'Action' : AdminTranslation["Action"]), flex: 1,
            renderCell: (params) => {
                const onClick = (e) => {
                    const currentRow = params.row;
                    changeButton(currentRow)
                };

                return (
                    <CustomButton
                        className="change-button"
                        title={language === 'en' ? 'Change' : AdminTranslation["Change"]}
                        variant="outlined"
                        // buttonTitleColor={theme === "default" ? `#2158a4` : theme === 'light' ? '#6d7175' : "#2158a4 "}
                        // buttonBorderColor={theme === "default" ? `#2158a4` : theme === 'light' ? '#6d7175' : "#2158a4 "}
                        onClick={onClick}
                        type="submit"
                        loading={false}
                        disabled={false}
                        fullWidth={true}
                        loaderSize={25}
                        loaderColor="success"
                        loaderThickness={5}
                        Theme={theme}
                    />
                );
            },
        }
    ]

    return (
        <Box className={styles.passwordManagementMain}>

            <Box className={`${styles.passwordManagementFormDiv}`}>
                <form className={`${styles.passwordManagementForm}`}
                    onSubmit={e => e.preventDefault()}>
                    <Box className={`${styles.passwordManagementFormInputParent}`}>
                        <TextField
                            name="password"
                            type="password"
                            label={language === 'en' ? 'Password' : AdminTranslation["Password"]}
                            autoComplete="off"
                            fullWidth={true}
                            size="small"
                            className={`${styles.passwordManagementFormFullName}`}
                            {...register('password', {
                                required: (language === 'en' ? 'You must specify a password' :  AdminTranslation["You must specify a password"]),
                                minLength: {
                                    value: 5,
                                    message: (language === 'en' ? 'Password must have at least 5 characters' :AdminTranslation["Password must have at least 5 characters"])
                                }
                            })}
                           sx= { language === 'en' ? '' : {...textfieldstyling}}
                            
                        />
                        <Box className={`${styles.passwordManagementFormErrorDiv}`}>
                            {errors.password && <span>{errors.password.message}</span>}
                        </Box>
                    </Box>

                    <Box className={`${styles.passwordManagementFormInputParent}`} >
                        <TextField
                            name="confirmpassword"
                            type="password"
                            label={language === 'en' ? 'Confirm Password' : AdminTranslation["Confirm Password"]}
                            autoComplete="off"
                            fullWidth={true}
                            size="small"
                            className="input-field"
                            {...register('confirmpassword', {
                                validate: value =>
                                    value === password.current || (language === 'en' ? 'The passwords do not match' : AdminTranslation["The passwords do not match"])
                            })}
                            
                        />
                        <Box className={`${styles.passwordManagementFormErrorDiv}`}>

                            {errors.confirmpassword && <span>{errors.confirmpassword.message}</span>}
                        </Box>
                    </Box>
                    <Box className={`${styles.passwordManagementFormInputParent}`} >
                        <CustomButton
                            className="submit-button"
                            title={language === 'en' ? 'Update' :AdminTranslation["Update"]}
                            variant="outlined"
                            // buttonTitleColor={theme === "default" ? `#2158a4` : theme === 'light' ? '#6d7175' : "#2158a4 "}
                            // buttonBorderColor={theme === "default" ? `#2158a4` : theme === 'light' ? '#6d7175' : "#2158a4 "}
                            onClick={handleSubmit(onSubmit)}
                            type="submit"
                            loading={false}
                            disabled={false}
                            fullWidth={true}
                            loaderSize={25}
                            loaderColor="success"
                            loaderThickness={5}
                            Theme={theme}
                        />
                    </Box>
                </form>
            </Box >

            <Box className={`${styles.passwordManagementTableDiv}`}>
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordManagement); 