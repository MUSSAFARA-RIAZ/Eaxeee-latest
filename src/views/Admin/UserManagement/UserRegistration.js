import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { connect } from 'react-redux';
import styles from './UserManagement.module.css';
import CustomTable from '../../../components/CustomTable/CustomTable';
import CustomButton from '../../../components/CustomButton/CustomButton';
import ModalAddUser from './Modals/ModalAddUser';
import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';
import AddIcon from '@mui/icons-material/Add';
import { getUsersList } from "../../../apis/user_management"
import { activateDeactivateUsers } from '../../../apis/user_management';
import { removeUsers } from '../../../apis/user_management';
import AlertComponent from '../../../components/alerts/AlertComponent';

const UserRegistration = (props) => {



    const { language, theme } = props;

    const [openModal, setOpenModal] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [activatedRows, setActivatedRows] = useState([]);
    const [setAlertMessageMessage, setAlertMessage] = useState("");

    const [listOfUsers, setListOfUsers] = useState([]);
    const [refreshUsers, setRefreshUsers] = useState(false);
    const [isActivateLoading, setIsActivateLoading] = useState(false);
    const [isDeActivateLoading, setIsDeActivateLoading] = useState(false);
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);



    useEffect(() => {
        getUsersList()
            .then((res) => {
                console.log("res is: ", res)
                if (res.code === 200) {
                    const formattedUsers = res.data.map(user => ({
                        id: user.username,
                        name: language === 'en' ? user.user_fullname : AdminTranslation[user.user_fullname] ? AdminTranslation[user.user_fullname] : user.user_fullname,
                        email: language === 'en' ? user.email : AdminTranslation[user.email] ? AdminTranslation[user.email] : user.email,
                    }));

                    // Extract activated rows where 'enabled' is 1
                    const activatedRowsArray = res.data
                        .filter(user => user.enabled === 1) // Only take enabled users
                        .map(user => user.username); // Assuming 'username' is the unique identifier

                    setListOfUsers(formattedUsers); // Update state with the list of users
                    setActivatedRows(activatedRowsArray); // Update state with activated rows

                    console.log("list of users is: ", formattedUsers);
                    console.log("activated rows are: ", activatedRowsArray);
                } else if (res.code === 401) {
                    console.error("Unauthorized access:", res.data);
                } else {
                    console.log("running catch")
                    console.error("Error fetching users list:", res.message || "Unknown error");
                }
            })
            .catch((error) => {
                console.error("Error fetching users list:", error);
            });
    }, [refreshUsers]);



    // console.log("formatted_users: ",formattedUsers)


    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddUserClick = () => {
        setOpenModal(true);
    };

    const handleActivateUserClick = async () => {
        console.log("clicked ACTIVATE button.")
        setIsActivateLoading(true)
        // Filter out rows from selectedRows that are already activated
        const validSelectedRows = selectedRows.filter((row) =>
            !activatedRows.includes(row)
        );

        console.log("Filtered Selected Rows: ", validSelectedRows);

        // If there are no valid rows to activate, do nothing
        if (validSelectedRows.length === 0) {
            setIsActivateLoading(false)
            setAlertMessage("User Already Activated!");
            return;
        }

        // Prepare the payload for the API call
        const payload = {
            usernames: validSelectedRows,
            status: "1", // 1 indicates activation
        };

        try {
            // Call the API
            const response = await activateDeactivateUsers(payload);

            // If the API call is successful, proceed with the rest of the function
            if (response.code === 200) {
                setAlertMessage(response.data.message); // Show success message

                // Update the activated rows by adding the activated rows
                setActivatedRows((prevActivatedRows) => [
                    ...prevActivatedRows,
                    ...validSelectedRows,
                ]);

                // Clear selected rows after processing
            } else if (response.code === 401) {
                console.error("Unauthorized access:", response.data); // Show session-expired message
            } else {
                setAlertMessage(response.error); // Show generic error message
            }
        } catch (error) {
            console.error("Error during API call:", error);
            setAlertMessage("An unexpected error occurred. Please try again later.");
        }

        setIsActivateLoading(false)

        // setSelectedRows([]);
    };

    const handleDeactivateUserClick = async () => {
        console.log("Clicked DEACTIVATE button.")

        setIsDeActivateLoading(true)
        // Filter out rows from selectedRows that are already deactivated
        const validSelectedRows = selectedRows.filter((row) =>
            activatedRows.includes(row)
        );

        console.log("Filtered Selected Rows: ", validSelectedRows);

        // If there are no valid rows to deactivate, do nothing
        if (validSelectedRows.length === 0) {
            setIsDeActivateLoading(false)
            setAlertMessage("User already deactivated")
            // setAlertMessage("No users to deactivate.");
            return;
        }

        // Prepare the payload for the API call
        const payload = {
            usernames: validSelectedRows,
            status: "0", // 0 indicates deactivation
        };

        try {

            // Call the API
            const response = await activateDeactivateUsers(payload);

            // If the API call is successful, proceed with the rest of the function
            if (response.code === 200) {
                setAlertMessage(response.data.message); // Show success message

                // Update the activated rows by removing the deactivated rows
                setActivatedRows((prevActivatedRows) =>
                    prevActivatedRows.filter((row) => !validSelectedRows.includes(row))
                );

                // Clear selected rows after processing

            } else if (response.code === 401) {
                setAlertMessage(response.data.message); // Show session-expired message
            } else {
                setAlertMessage(response.error); // Show generic error message
            }

        } catch (error) {
            console.error("Error during API call:", error);
            setAlertMessage("An unexpected error occurred. Please try again later.");
        }

        setIsDeActivateLoading(false)

        // setSelectedRows([]); // Clear selected rows after deactivating
    };


    const handleDeleteClick = async () => {
        setIsDeleteDisabled(true)
        console.log("clicked delete...");

        // If there are no selected rows, do nothing
        if (selectedRows.length === 0) {
            setIsDeleteDisabled(false)
            setAlertMessage("No users selected for deletion.");
            return;
        }

        // Prepare the payload for the API call
        const payload = {
            usernames: selectedRows, // List of usernames to delete
        };

        try {
            // Call the API
            const response = await removeUsers(payload);

            // If the API call is successful, proceed with the rest of the function
            if (response.code === 200) {
                setAlertMessage(response.data.message); // Show success message

                // Update the listOfUsers to remove deleted rows
                const updatedListOfUsers = listOfUsers.filter(
                    (row) => !selectedRows.includes(row.id)
                );

                // Update tableRowData (and indirectly updatedRows) by setting the new data
                setListOfUsers(updatedListOfUsers);

                // Clear activated rows if applicable
                setActivatedRows((prevActivatedRows) =>
                    prevActivatedRows.filter((row) => !selectedRows.includes(row))
                );

                // Clear selected rows after processing
                setSelectedRows([]);
            } else if (response.code === 401) {
                console.error("Unauthorized access:", response.data); // Show session-expired message
            } else {
                setAlertMessage(response.error); // Show generic error message
            }
        } catch (error) {
            console.error("Error during API call:", error);
            setAlertMessage("An unexpected error occurred. Please try again later.");
        }
        setIsDeleteDisabled(false)
    };



    const tableRowData = listOfUsers;

    // const tableRowData = [
    //     { id: 'myid', name: language === 'en' ? 'abc' : AdminTranslation["abc"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
    //     { id: 'user12', name: language === 'en' ? 'user' : AdminTranslation["user"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
    //     { id: 'sample12', name: language === 'en' ? 'sample' : AdminTranslation["sample"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
    //     { id: 'test12', name: language === 'en' ? 'test' : AdminTranslation["test"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
    //     { id: 'xyz12', name: language === 'en' ? 'xyz' : AdminTranslation["xyz"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
    //     { id: 'new12', name: language === 'en' ? 'new' : AdminTranslation["new"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
    //     { id: 'new13', name: language === 'en' ? 'new' : AdminTranslation["new"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
    //     { id: 'new14', name: language === 'en' ? 'new' : AdminTranslation["new"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
    //     { id: 'new15', name: language === 'en' ? 'new' : AdminTranslation["new"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
    //     { id: 'new16', name: language === 'en' ? 'new' : AdminTranslation["new"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
    //     { id: 'new17', name: language === 'en' ? 'new' : AdminTranslation["new"], email: language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"] },
    // ];

    const updatedRows = tableRowData.map((row) => ({
        ...row,
        activated: activatedRows.includes(row.id),
    }));
    const columns = [
        {
            field: 'id', headerName: (language === 'en' ? 'Username' : AdminTranslation["Username"]), flex: 1, renderCell: (params) => (
                <Box>
                    {params.value}
                    {activatedRows.includes(params.value) && (
                        <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                            Active
                        </Typography>
                    )}
                </Box>
            )
        },
        { field: 'name', headerName: (language === 'en' ? 'Name' : AdminTranslation["Name"]), flex: 1 },
        { field: 'email', headerName: (language === 'en' ? 'Email' : AdminTranslation["Email"]), flex: 1 },
    ];
    return (
        <>
            {setAlertMessageMessage && (
                <AlertComponent
                    message={setAlertMessageMessage}
                    severity={setAlertMessageMessage.includes("success") ? "success" : "warning"}
                    onClose={() => setAlertMessage("")} // Reset message on close
                />
            )}

            <Box className={styles.userRegistrationMain}>
                <ModalAddUser open={openModal} handleClose={handleCloseModal} onUserAdded={() => setRefreshUsers(!refreshUsers)} />

                <Box className={`${styles.userRegistrationTableDiv}`}>
                    <CustomTable
                        rows={updatedRows}
                        columns={columns}
                        onDeleteClick={handleDeleteClick}
                        showDeleteButton={true}
                        onSelectionChange={setSelectedRows}
                        Theme={theme}
                        checkboxSelection={true}
                        deleteButtonDisabled={selectedRows.length === 0 || isDeleteDisabled}


                    >
                        <Box sx={{
                            display: "flex", justifyContent: "space-between", alignItems: "space-between", width: "350px", ...(language === 'ar' && {
                                display: "flex", width: "300px", justifyContent: "space-between", position: "relative", right: "10px"
                            })
                        }}>
                            <CustomButton
                                title={language === 'en' ? "Add User" : AdminTranslation["Add User"]}
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
                                loading={isActivateLoading}
                                disabled={selectedRows.length === 0}
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
                                loading={isDeActivateLoading}
                                disabled={selectedRows.length === 0}
                                fullWidth={true}
                                loaderSize={25}
                                loaderColor="success"
                                loaderThickness={5}
                                Theme={theme}
                            />
                        </Box>
                    </CustomTable>
                </Box>
            </Box>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.language,
        theme: state.theme,
    };
};

export default connect(mapStateToProps)(UserRegistration);