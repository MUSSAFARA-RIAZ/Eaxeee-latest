import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, IconButton, Typography } from '@mui/material';
import { connect } from 'react-redux';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import CustomTable from '../../../../components/CustomTable/CustomTable';
import AdminTranslation from '../../../../Utils/AdminTranslation/AdminTranslation';
import CloseIcon from '@mui/icons-material/Close';
import GreenEaxee from "../../../../Assets/Images/ModalEaxeeLogo.png"


const ModalAddUsersPool = ({ open, handleClose, language, theme, selectedPool, updateSelectedPool }) => {

    const [snackBarFlag, setSnackBarFlag] = useState(false);
    const [selectedUsersForPool, setSelectedUsersForPool] = useState([]);
    const [users, setUsers] = useState([]);

    const formatUsers = (usersArray) => {
        const formatted = usersArray.map((user, index) => ({
            id: (index + 1).toString(), // Generate a string ID
            user: user, // Map the username to the `user` field
        }));
        setUsers(formatted); // Update the state with formatted users
        console.log("Formatted Users: ", formatted);
    };

    useEffect(() => {
        console.log("this is inside useeffect")
        if (selectedPool) {
            console.log("running hook inside if")
            console.log(selectedPool)

            formatUsers(selectedPool.availableUsers); // Format the users when the component is mounted or users change

            
        }
    }, [selectedPool])



    const handleSelectionChange = (selectedIds) => {
        // Filter the `users` state to find the selected users
        const selectedUsers = users.filter((user) => selectedIds.includes(user.id));

        // Extract only the 'user' field (email) from the selected users
        const selectedEmails = selectedUsers.map((user) => user.user);

        // Update the `selectedUsersForPool` state with the email array
        setSelectedUsersForPool(selectedEmails);
        console.log("selected_user_emails: ", selectedEmails);
    };


    const handleAddClick = () => {
        console.log("Clicked Add");
    
        if (!selectedPool) {
            console.error("No pool selected.");
            return;
        }
    
        // Merge existing users with new selected users
        const updatedUsers = [...selectedPool.users, ...selectedUsersForPool];
    
        // Remove duplicates if necessary
        const uniqueUsers = Array.from(new Set(updatedUsers));
    
        // Filter out added users from availableUsers
        const updatedAvailableUsers = selectedPool.availableUsers.filter(
            (user) => !selectedUsersForPool.includes(user)
        );
    
        // Update the pool's users and availableUsers lists
        const updatedPool = {
            ...selectedPool,
            users: uniqueUsers,
            availableUsers: updatedAvailableUsers,
        };
    
        console.log("updated_pool_looks_like: ", updatedPool);
    
        // Update the selected pool in the parent
        updateSelectedPool(updatedPool);
    
        console.log("Updated Pool:", updatedPool);
    
        handleClose(); // Close the modal
    };

    


    const handleSnackBarClose = () => {
        setSnackBarFlag(false);
    };
    const handleDialogClose = (event, reason) => {
        console.log("clicked add")
        if (reason !== 'backdropClick') {
            handleClose();
        }
    };

    // const updatedRows = [
    //     { id: '1', user: 'admin' },
    //     { id: '2', user: 'hammad' },
    //     { id: '3', user: 'ghazni' },
    //     { id: '4', user: 'user2' },
    //     { id: '5', user: 'user3' },
    //     { id: '6', user: 'Mahnoor' },
    //     { id: '7', user: 'Mussaffra' },
    //     { id: '8', user: 'user1' },
    //     { id: '9', user: 'maheen' },
    //     { id: '10', user: 'monir' },
    // ];

    const columns = [
        { field: 'user', headerName: language === 'en' ? 'Users' : AdminTranslation["Users"], flex: 1 },
    ];

    return (
        <Box>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                PaperProps={{
                    sx: {
                        width: "500px", // Adjust the width here
                        maxWidth: "90%", // Ensure it doesn't exceed the viewport
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: theme === "default" ? "#2158a4" : theme === "dark" ? "#393a3a" : "",
                        color: "#cecece",
                        padding: "3px 16px",
                        display: "flex",
                        alignItems: "center", // Align items vertically in the center
                        justifyContent: "space-between", // Space out the content
                        position: "relative", // Required for absolute positioning of the close icon
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}> {/* Flex for logo and title */}
                        <img
                            src={GreenEaxee}
                            alt="img"
                            style={{ width: "40px", height: "40px", marginRight: "5px" }}
                        />
                        <Typography variant="h6">

                            {language === 'en' ? 'Add Users' : AdminTranslation["Add Users"]}
                        </Typography>
                    </Box>

                    <IconButton
                        sx={{
                            position: "absolute",
                            top: "50%", // Center vertically
                            // right: "10px", // Padding from the right edge
                            transform: "translateY(-50%)", // Correct vertical alignment
                            color: "#cecece",
                            [language === 'ar' ? 'left' : 'right']: 0
                        }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <Box
                    sx={{
                        backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "#ffffff",
                        // border:"3px solid red",
                        padding: "10px"

                    }}
                >

                    <CustomTable
                        rows={users}
                        columns={columns}
                        showDeleteButton={true}
                        onSelectionChange={handleSelectionChange}
                        checkboxSelection={true}
                        height={true}
                    />

                    <DialogActions
                        sx={{
                            backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "#ffffff",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "10px",



                                margin: "0px",
                                position: "relative",
                                top: "10px",


                            }}
                        >
                            <CustomButton
                                title={language === "en" ? "Add" : AdminTranslation["Add"]}
                                type="submit"
                                onClick={handleAddClick}

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
                    </DialogActions>
                </Box>
            </Dialog>

        </Box>
    );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddUsersPool);