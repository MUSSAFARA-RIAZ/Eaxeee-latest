import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, FormControlLabel, Checkbox, FormGroup, Grid } from '@mui/material';
import { connect } from 'react-redux';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import CustomTable from '../../../../components/CustomTable/CustomTable';
import AdminTranslation from '../../../../Utils/AdminTranslation/AdminTranslation';
import CloseIcon from '@mui/icons-material/Close';
import ModalDeleteAlert from './ModalDeleteAlerts'; // Adjust the path as necessary

const ModalDelete = ({ open, handleClose, language, theme }) => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState('');
    const [selectedOptions, setSelectedOptions] = useState({
        object: false,
        model: false,
        dashboard: false,
        architecture: false
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (name === 'architecture') {
            setSelectedOptions({
                object: checked,
                model: checked,
                dashboard: checked,
                architecture: checked
            });
        } else {
            setSelectedOptions(prevState => ({
                ...prevState,
                [name]: checked,
                architecture: name === 'architecture' ? checked : prevState.architecture
            }));
        }
    };

    const handleDeleteClick = () => {
        const targets = Object.entries(selectedOptions)
            .filter(([key, value]) => value)
            .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1));
        
        setDeleteTarget(targets.join(', '));
        setAlertOpen(true);
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
        handleClose();
    };

    const handleDialogClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            handleClose();
        }
    };

    const updatedRows = [
        { id: '1', architectureName: 'Eaxee', creationDate: '2022-05-10' },
        { id: '2', architectureName: 'LambdaTheta', creationDate: '2022-05-11' },
        { id: '3', architectureName: 'FAST', creationDate: '2022-05-12' },
        { id: '4', architectureName: 'EaxeXe', creationDate: '2022-05-13' },
    ];

    const columns = [
        { field: 'architectureName', headerName: language === 'en' ? 'Architecture Name' : AdminTranslation["Architecture Name"], flex: 1 },
        { field: 'creationDate', headerName: language === 'en' ? 'Creation Date' : AdminTranslation["Creation Date"], flex: 1 },
    ];

    return (
        <Box>
            <Dialog 
                open={open}
                onClose={handleDialogClose}
                PaperProps={{
                    sx: { 
                        width: "800px",
                        height:"500px", // Adjust the height here
                        maxWidth: "90%", // Ensure it doesn't exceed the viewport
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: theme === "default"
                        ? "#2158a4"
                        : theme === "light"
                        ? "#cbd0d7"
                        : "#393a3a",
                        color: "#cecece",
                        padding: "6px",
                        paddingLeft: "35px",
                        position: 'relative',
                    }}
                >
                    {language === 'en' ? 'Delete' : AdminTranslation["Delete"]}
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            color: "#cecece",
                        }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent
                    sx={{
                        backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "#ffffff",
                        color: theme === 'default' ? '#414849' : theme === 'light' ? '#414849' : '#cecece',
                    }}
                > 
                    <div style={{ paddingTop: "23px" }}>
                        <CustomTable 
                            rows={updatedRows} 
                            columns={columns} 
                            Theme={theme}
                            checkboxSelection={false}
                        />
                    </div>
                </DialogContent>

                <DialogActions
                    sx={{
                        backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "#ffffff",
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px'
                    }}
                >
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedOptions.architecture}
                                        onChange={handleCheckboxChange}
                                        name="architecture"
                                    />
                                }
                                label={language === 'en' ? 'Architecture' : AdminTranslation["Architecture"]}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedOptions.object}
                                        onChange={handleCheckboxChange}
                                        name="object"
                                        disabled={selectedOptions.architecture}
                                    />
                                }
                                label={language === 'en' ? 'Object' : AdminTranslation["Object"]}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedOptions.model}
                                        onChange={handleCheckboxChange}
                                        name="model"
                                        disabled={selectedOptions.architecture}
                                    />
                                }
                                label={language === 'en' ? 'Model' : AdminTranslation["Model"]}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedOptions.dashboard}
                                        onChange={handleCheckboxChange}
                                        name="dashboard"
                                        disabled={selectedOptions.architecture}
                                    />
                                }
                                label={language === 'en' ? 'Dashboard' : AdminTranslation["Dashboard"]}
                            />
                        </FormGroup>
                    </Box>
                        <CustomButton
                            title={language === 'en' ? 'Delete' : AdminTranslation["Delete"]}
                            type="submit"
                            Theme={theme}
                            onClick={handleDeleteClick}
                        />
                        <CustomButton
                            title={language === 'en' ? 'Cancel' : AdminTranslation["Cancel"]}
                            type="button"
                            Theme={theme}
                            onClick={handleClose}
                        />
                </DialogActions>
            </Dialog>
            
            <ModalDeleteAlert
                open={alertOpen}
                handleClose={handleAlertClose}
                deleteTarget={deleteTarget}
                language={language}
                theme={theme}
            />
        </Box>
    );
};

const mapStateToProps = state => {
    return {
        language: state.language,
        theme: state.theme
    }
}

export default connect(mapStateToProps)(ModalDelete);
