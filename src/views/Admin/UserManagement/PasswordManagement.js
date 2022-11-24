import React, { useRef } from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import SnackBar from '../../../components/SnackBar/SnackBar';
import styles from './UserManagement.module.css'
import CustomTable from '../../../components/CustomTable/CustomTable';

import Translation from '../../../Utils/AdminTranslation/TranslationArabic';

const PasswordManagement = (props) => {


    let { language, theme } = props;

    const { register, formState: { errors }, handleSubmit, watch } = useForm({});
    const password = useRef({});
    password.current = watch("password", "");
    const onSubmit = async data => {
        alert(JSON.stringify(data));
    };

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

    let changeButton = (item) => {
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
                    changeButton(currentRow)
                };

                return (
                    <Button className="change-button" variant='outlined'
                        sx={{
                            color: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "),
                            borderColor: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a ")
                        }}
                        onClick={onClick}
                    >{language === 'en' ? 'Change' : 'يتغيرون '}</Button>
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
                            label={language === 'en' ? 'Password' : ' كلمه السر'}
                            autoComplete="off"
                            fullWidth={true}
                            size="small"
                            className={`${styles.passwordManagementFormFullName}`}
                            {...register('password', {
                                required: (language === 'en' ? 'You must specify a password' : 'يجب عليك تحديد كلمة مرور'),
                                minLength: {
                                    value: 5,
                                    message: (language === 'en' ? 'Password must have at least 5 characters' : 'يجب أن تحتوي كلمة المرور على 5 أحرف على الأقل')
                                }
                            })}
                        />
                        <Box className={`${styles.passwordManagementFormErrorDiv}`}>
                            {errors.password && <span>{errors.password.message}</span>}
                        </Box>
                    </Box>

                    <Box className={`${styles.passwordManagementFormInputParent}`} >
                        <TextField
                            name="confirmpassword"
                            type="password"
                            label={language === 'en' ? 'Confirm Password' : Translation["Confirm Password"]}
                            autoComplete="off"
                            fullWidth={true}
                            size="small"
                            className="input-field"
                            {...register('confirmpassword', {
                                validate: value =>
                                    value === password.current || (language === 'en' ? 'The passwords do not match' : 'كلمات السر لا تتطابق')
                            })}
                        />
                        <Box className={`${styles.passwordManagementFormErrorDiv}`}>

                            {errors.confirmpassword && <span>{errors.confirmpassword.message}</span>}
                        </Box>
                    </Box>
                    <Box className={`${styles.passwordManagementFormInputParent}`} >
                        <Button
                            color="primary"
                            type="submit"
                            variant="outlined"
                            className="submit-button"
                            fullWidth={true}
                            onClick={handleSubmit(onSubmit)}
                            sx={{
                                color: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a "),
                                borderColor: (theme === "default" ? `#0d7e8a` : theme === 'light' ? '#6d7175' : "#0d7e8a ")
                            }}
                        >
                            {language === 'en' ? 'Update' : 'تحديث'}
                        </Button>
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