import React, { useState } from 'react';
import { Box , Typography} from '@mui/material';
import { connect } from 'react-redux';
import styles from './UserManagement.module.css';
import CustomTable from '../../../components/CustomTable/CustomTable';
import CustomButton from '../../../components/CustomButton/CustomButton';
import ModalAddUser from './Modals/ModalAddUser';
import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';
import AddIcon from '@mui/icons-material/Add';

const UserRegistration = (props) => {
    const { language, theme } = props;
    
    const [openModal, setOpenModal] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [activatedRows, setActivatedRows] = useState([]);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddUserClick = () => {
        setOpenModal(true);
    };

    const handleActivateUserClick = () => {
        setActivatedRows((prevActivatedRows) => [
            ...prevActivatedRows,
            ...selectedRows
        ]);
        console.log("selectedRows before state",selectedRows)
        setSelectedRows([]);
    };

    const handleDeactivateUserClick = () => {
        setActivatedRows((prevActivatedRows) =>
            prevActivatedRows.filter(row => !selectedRows.includes(row))
        );
        console.log("selectedRows",selectedRows)

        setSelectedRows([]);
        console.log("selected Rows after state")
    };


    const tableRowData = [
        { id: 'abc12', name: language === 'en' ? 'abc' : AdminTranslation["abc"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
        { id: 'user12', name: language === 'en' ? 'user' : AdminTranslation["user"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
        { id: 'sample12', name: language === 'en' ? 'sample' : AdminTranslation["sample"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
        { id: 'test12', name: language === 'en' ? 'test' : AdminTranslation["test"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
        { id: 'xyz12', name: language === 'en' ? 'xyz' : AdminTranslation["xyz"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
        { id: 'new12', name: language === 'en' ? 'new' : AdminTranslation["new"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
        { id: 'new13', name: language === 'en' ? 'new' : AdminTranslation["new"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
        { id: 'new14', name: language === 'en' ? 'new' : AdminTranslation["new"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
        { id: 'new15', name: language === 'en' ? 'new' : AdminTranslation["new"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
        { id: 'new16', name: language === 'en' ? 'new' : AdminTranslation["new"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
        { id: 'new17', name: language === 'en' ? 'new' : AdminTranslation["new"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
    ];

    const updatedRows = tableRowData.map((row) => ({
        ...row,
        activated: activatedRows.includes(row.id),
    }));
    const columns = [
        { field: 'id', headerName: (language === 'en' ? 'ID' : AdminTranslation["ID"]), flex: 1, renderCell: (params) => (
            <Box>
                {params.value}
                {activatedRows.includes(params.value) && (
                    <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                        Active
                    </Typography>
                )}
                
            </Box>
        ) },
        { field: 'name', headerName: (language === 'en' ? 'Name' : AdminTranslation["Name"]), flex: 1 },
        { field: 'email', headerName: (language === 'en' ? 'Email' : AdminTranslation["Email"]), flex: 1 },
    ];
    return (
        <Box className={styles.userRegistrationMain}>
            <ModalAddUser open={openModal} handleClose={handleCloseModal} />        

            <Box className={`${styles.userRegistrationTableDiv}`}>
                <CustomTable 
                    rows={updatedRows} 
                    columns={columns} 
                    rowsPerPage={10} 
                    pageSize={100}
                    showDeleteButton={true}
                    onSelectionChange={setSelectedRows}
                    Theme={theme}
                    checkboxSelection={true}
                >
                    <CustomButton
                        title="Add User"   
                        variant='outlined' 
                        onClick={handleAddUserClick}
                        type="submit"
                        loading={false}
                        disabled={false}
                        fullWidth={true}
                        loaderSize={25}
                        loaderColor="success"
                        loaderThickness={5}
                        Theme={props.theme}
                    />
                    <CustomButton
                        title={language === 'en' ? 'Activate' : AdminTranslation["Activate"]}
                        variant="outlined"
                        onClick={handleActivateUserClick}
                        type="submit"
                        loading={false}
                        // disabled={selectedRows.length === 0}
                        fullWidth={true}
                        loaderSize={25}
                        loaderColor="success"
                        loaderThickness={5}
                        Theme={props.theme}
                    />
                    <CustomButton
                        title={language === 'en' ? 'Deactivate' : AdminTranslation["Deactivate"]}
                        variant="outlined"
                        onClick={handleDeactivateUserClick}
                        type="submit"
                        loading={false}
                        // disabled={selectedRows.length === 0}
                        fullWidth={true}
                        loaderSize={25}
                        loaderColor="success"
                        loaderThickness={5}
                        Theme={theme}
                    />
                </CustomTable>
            </Box>
        </Box>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.language,
        theme: state.theme,
    };
};

export default connect(mapStateToProps)(UserRegistration);