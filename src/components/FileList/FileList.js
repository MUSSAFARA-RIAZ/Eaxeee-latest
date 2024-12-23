import React, { useState } from 'react';
import {
    Menu,
    MenuItem,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    Box,
    IconButton,
    DialogTitle,
    Button,
    TextField,
} from '@mui/material';
import { connect } from 'react-redux';
import GreenEaxee from '../../Assets/Images/ModalEaxeeLogo.png';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '../CustomButton/CustomButton';
import AdminTranslation from '../../Utils/AdminTranslation/AdminTranslation';

const FileItem = ({ fileName, onUpload, onSave, onDelete, props }) => {
    const isRTL=props.language==='ar';
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newMetamodelDialogOpen, setNewMetamodelDialogOpen] = useState(false); // New state for "New Metamodel" dialog
    const [selectedFile, setSelectedFile] = useState(null);
    const [metamodelOpacity, setMetamodelOpacity] = useState(0);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [newMetamodelName, setNewMetamodelName] = useState(''); // State for metamodel name

    // Open menu on left click
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Open File Dialog
    const handleDialogOpen = () => {
        setDialogOpen(true);
        handleClose();
    };

    // Open New Metamodel Dialog
    const handleNewMetamodelDialogOpen = () => {
        setNewMetamodelDialogOpen(true);
        handleClose();
    };

    // Close Dialogs
    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedFile(null);
    };

    const handleNewMetamodelDialogClose = () => {
        setNewMetamodelDialogOpen(false);
    };

    // Handle file selection
  // Handle file selection
const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        if (file.type === "text/xml" || file.name.endsWith(".xml")) {
            setSelectedFile(file);
        } else {
            alert("Only XML files are allowed. Please select a valid XML file.");
            event.target.value = null; // Clear the file input
        }
    }
};


    // Handle file upload
    const handleFileUpload = () => {
        if (selectedFile) {
            onUpload(selectedFile);
            setUploadedFileName(selectedFile.name);
            setMetamodelOpacity(1);
            setDialogOpen(false);
        } else {
            alert('Please select a file to upload');
        }
    };
    

    // Handle New Metamodel creation
    const handleCreateNewMetamodel = () => {
        if (newMetamodelName.trim()) {
            setUploadedFileName(newMetamodelName); // Update the file name with the new metamodel name
            setMetamodelOpacity(1);
            setNewMetamodelDialogOpen(false);
        } else {
            alert('Please enter a metamodel name');
        }
    };

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Typography
                    onClick={handleClick}
                    style={{
                        cursor: 'pointer',
                        userSelect: 'none',
                        fontWeight: 'bold',
                        position: 'relative',
                        left: '10px',
                    }}
                >
                    {fileName}
                </Typography>
                <Typography
                    style={{
                        opacity: metamodelOpacity,
                        transition: 'opacity 0.3s ease',
                    }}
                >
                   {uploadedFileName}
                </Typography>
            </Box>

            {/* Material-UI Menu */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleNewMetamodelDialogOpen}>New</MenuItem>
                <MenuItem onClick={handleDialogOpen}>Open</MenuItem>
                <MenuItem onClick={onSave}>Save</MenuItem>
                <MenuItem onClick={onDelete}>Commit</MenuItem>
                <MenuItem>Publish</MenuItem>
                <MenuItem>Close</MenuItem>
            </Menu>

            {/* File Upload Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                PaperProps={{
                    sx: {
                        width: '500px',
                        maxWidth: '70%',
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        backgroundColor:
                            props.theme === 'default'
                                ? '#2158a4'
                                : props.theme === 'dark'
                                    ? '#393a3a'
                                    : '',
                        color: '#cecece',
                        padding: '3px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        position: 'relative',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={GreenEaxee}
                            alt="img"
                            style={{ width: '40px', height: '40px', marginRight: '5px' }}
                        />
                        <Typography variant="h6">Open File</Typography>
                    </Box>

                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#cecece',
                            [props.language === 'ar' ? 'left' : 'right']: 0,
                        }}
                        onClick={handleDialogClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <div style={{ backgroundColor: props.theme === "default" ? "#cecece" : props.theme === "dark" ? "#212121" : "" }}>
                    <DialogContent>
                        <TextField
                            type="file"
                            onChange={handleFileChange}
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '10px',
                                margin: '0px',
                                position: 'relative',
                                top: '10px',
                            }}
                        >
                            <CustomButton
                                title={props.language === 'en' ? 'Add' : AdminTranslation['Open']}
                                type="submit"
                                onClick={handleFileUpload}
                                sx={{ width: '50%' }}
                            />
                            <CustomButton
                                title={props.language === 'en' ? 'Cancel' : AdminTranslation['Cancel']}
                                type="button"
                                onClick={handleDialogClose}
                                sx={{ width: '50%' }}
                            />
                        </Box>
                    </DialogContent>
                </div>
            </Dialog>

            {/* New Metamodel Dialog */}
            <Dialog
                open={newMetamodelDialogOpen}
                onClose={handleNewMetamodelDialogClose}
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
                            props.theme === 'default'
                                ? '#2158a4'
                                : props.theme === 'dark'
                                    ? '#393a3a'
                                    : '',
                        color: '#cecece',
                        padding: '3px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        position: 'relative',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={GreenEaxee}
                            alt="img"
                            style={{ width: '40px', height: '40px', marginRight: '5px' }}
                        />
                        <Typography variant="h6">Create</Typography>
                    </Box>

                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#cecece',
                            [props.language === 'ar' ? 'left' : 'right']: 0,
                        }}
                        onClick={handleNewMetamodelDialogClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <div style={{ backgroundColor: props.theme === "default" ? "#cecece" : props.theme === "dark" ? "#212121" : "" }}>
                    <DialogContent>
                        <TextField
                            label="Metamodel Name"
                            value={newMetamodelName}
                            onChange={(e) => setNewMetamodelName(e.target.value)}
                             size="small"
                            fullWidth
                            required
                    sx={{
                    //   mt: 2,
                      direction: isRTL ? "rtl" : "ltr",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          textAlign: isRTL ? "right" : "left",
                        },
                        "&:hover fieldset": {
                          textAlign: isRTL ? "right" : "left",
                        },
                        "&.Mui-focused fieldset": {
                          textAlign: isRTL ? "right" : "left",
                        },
                        "& input::placeholder": {
                          textAlign: isRTL ? "right" : "left",
                        },
                        "& input": {
                          textAlign: isRTL ? "right" : "left",
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        transformOrigin: isRTL ? "top right" : "top left",
                        textAlign: isRTL ? "right" : "left",
                        right: isRTL ? 24 : "auto",
                      },
                    }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '10px',
                                margin: '0px',
                                position: 'relative',
                                top: '10px',
                            }}
                        >
                            <CustomButton
                                title="Add"
                                onClick={handleCreateNewMetamodel}
                                // sx={{ width: '50%' }}
                            />
                            <CustomButton
                                title="Cancel"
                                onClick={handleNewMetamodelDialogClose}
                                // sx={{ width: '50%' }}
                            />
                        </Box>
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    );
};

const FileList = ({ props }) => {
    const handleUpload = (file) => alert(`File uploaded: ${file.name}`);
    const handleSave = () => alert('File saved');
    const handleDelete = () => alert('File deleted');

    return (
        <div>
            <FileItem
                props={props}
                fileName="Metamodel File"
                onUpload={handleUpload}
                onSave={handleSave}
                onDelete={handleDelete}
            />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FileList);
