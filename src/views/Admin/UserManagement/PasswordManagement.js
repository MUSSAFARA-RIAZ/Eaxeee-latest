import React, { useState } from 'react';
import { Box } from '@mui/material';
import { connect } from 'react-redux';
import styles from './UserManagement.module.css'
import CustomTable from '../../../components/CustomTable/CustomTable';
import CustomButton from '../../../components/CustomButton/CustomButton';
import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';
import ModalChangePassword from './Modals/ModalChangePassword';

const PasswordManagement = (props) => {
    
    let { language, theme } = props;

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
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
        handleOpenModal();
        console.log(item);
    };

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
                        onClick={onClick}
                        type="submit"
                        loading={false}
                        disabled={false}
                        fullWidth={true}
                        loaderSize={25}
                        loaderColor="success"
                        loaderThickness={5}
                        Theme={props.theme}
                    />
                );
            },
        }
    ]

    return (
        <Box className={styles.passwordManagementMain}>      

            <ModalChangePassword open={openModal} handleClose={handleCloseModal} />     

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


