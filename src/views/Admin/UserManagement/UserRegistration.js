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
import CustomTable from '../../../components/CustomTable/CustomTable';
import CustomButton from '../../../components/CustomButton/CustomButton';



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
            name: (language === 'en' ? 'abc' : 'الأولى'),
            id: (language === 'en' ? 'abc12' : ' ١المستعمل'),
            email: (language === 'en' ? 'test@gmail.com' : 'خالد@الدوحة.قطر'),
        },
        {
            name: (language === 'en' ? 'user' : 'الثانية'),
            id: (language === 'en' ? 'user12' : ' ٢المستعمل'),
            email: (language === 'en' ? 'test@gmail.com' : 'خالد@الدوحة.قطر'),

        },
        {
            name: (language === 'en' ? 'sample' : 'الثالثة'),
            id: (language === 'en' ? 'sample12' : ' ٣المستعمل'),
            email: (language === 'en' ? 'test@gmail.com' : 'خالد@الدوحة.قطر'),

        },
        {
            name: (language === 'en' ? 'test' : 'الرابعة'),
            id: (language === 'en' ? 'test12' : ' ٤المستعمل'),
            email: (language === 'en' ? 'test@gmail.com' : 'خالد@الدوحة.قطر'),

        },
        {
            name: (language === 'en' ? 'xyz' : 'خمسة'),
            id: (language === 'en' ? 'xyz12' : ' ٥المستعمل'),
            email: (language === 'en' ? 'test@gmail.com' : 'خالد@الدوحة.قطر'),

        },
        {
            name: (language === 'en' ? 'new' : 'ستة'),
            id: (language === 'en' ? 'new12' : ' ٦المستعمل'),
            email: (language === 'en' ? 'test@gmail.com' : 'خالد@الدوحة.قطر'),

        }
    ]

    let activateButton = (item) => {
        console.log(item)
    }

    const columns = [
        { field: 'id', headerName: (language === 'en' ? 'ID' : 'هوية'), flex: 1 },
        { field: 'name', headerName: (language === 'en' ? 'Name' : 'اسم'), flex: 1 },
        { field: 'email', headerName: (language === 'en' ? 'Email' : 'البريد الإلكتروني'), flex: 1 },
        {
            field: 'action', headerName: (language === 'en' ? 'Action' : 'عمل'), flex: 1,
            renderCell: (params) => {
                const onClick = (e) => {
                    const currentRow = params.row;
                    activateButton(currentRow)
                    // return alert(JSON.stringify(currentRow, null, 4));
                };

                return (
                    <Button className="activate-button" variant='outlined'
                        sx={{
                            color: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "),
                            borderColor: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a ")
                        }}
                        onClick={onClick}
                    >{language === 'en' ? 'Activate' : 'تفعيل '}</Button>
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
                            label={language === 'en' ? 'Full Name' : 'الاسم الكامل'}
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
                                <span>{language === 'en' ? 'This is a required field' : 'هذا مجال مطلوب'}</span>
                            )}
                            {errors.fullName && errors.fullName.type === "pattern" && (
                                <span>
                                    {language === 'en' ? 'Special characters are not allowed' : 'الأحرف الخاصة غير مسموح بها'}
                                </span>
                            )}
                        </Box>
                    </Box>
                    <Box className={`${styles.userRegistrationFormInputParent}`}>
                        <TextField
                            name="text"
                            type="text"
                            label={language === 'en' ? 'Username' : 'اسم االمستخدم'}
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
                                <span>{language === 'en' ? 'This is a required field' : 'هذا مجال مطلوب'}</span>
                            )}
                            {errors.userName && errors.userName.type === "minLength" && (
                                <span>
                                    {language === 'en' ? 'Minimum 5 characters are required' : 'مطلوب 5 أحرف على الأقل'}
                                </span>
                            )}
                            {errors.userName && errors.userName.type === "pattern" && (
                                <span>
                                    {language === 'en' ? 'Special characters are not allowed' : 'الأحرف الخاصة غير مسموح بها'}
                                </span>
                            )}
                        </Box>
                    </Box>
                    <Box className={`${styles.userRegistrationFormInputParent}`} >
                        <TextField
                            name="email"
                            type="text"
                            label={language === 'en' ? 'Email' : 'البريد الإلكتروني'}
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
                                    <span>{language === 'en' ? 'This is a required field' : 'هذا مجال مطلوب'}</span>
                                    <SnackBar open={snackBarFlag} setOpen={setSnackBarFlag} message={snackBarMessage}></SnackBar>
                                </div>

                            )}
                            {errors.email && errors.email.type === "pattern" && (
                                <span>{language === 'en' ? 'Enter a valid email' : 'أدخل بريدًا إلكترونيًا صالحًا'}</span>
                            )}
                        </Box>
                    </Box>

                    <Box className={`${styles.userRegistrationFormInputParent}`} >
                        <CustomButton
                            title="Add"
                            variant="outlined"
                            buttonTitleColor={theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "}
                            buttonBorderColor={theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "}
                            onClick={handleUserSubmit}
                            type="submit"
                            loading={false}
                            disabled={true}
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