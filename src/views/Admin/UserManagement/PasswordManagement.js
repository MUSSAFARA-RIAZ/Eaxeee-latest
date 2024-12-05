import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { connect } from 'react-redux';
import styles from './UserManagement.module.css'
import CustomTable from '../../../components/CustomTable/CustomTable';
import CustomButton from '../../../components/CustomButton/CustomButton';
import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';
import ModalChangePassword from './Modals/ModalChangePassword';
import { getUsersList } from "../../../apis/user_management"
import { changeUserPassword } from '../../../apis/user_management';

const PasswordManagement = (props) => {
    
    let { language, theme } = props;

    const [openModal, setOpenModal] = useState(false);
    const [listOfUsers, setListOfUsers] = useState([]);
    const [refreshUsers, setRefreshUsers] = useState(false);
    const [selectedUsername, setSelectedUsername] = useState('');
    const [isYesClickDisabled, setIsYesClickDisabled] = useState('');
    const [isYesDisabled, setIsYesDisabled] = useState(false);
    
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        console.log("handle close calling")
        setSelectedUsername('')
        setOpenModal(false);
    };

    const handleYesClick = async () => {
        setIsYesDisabled(true)
        try {
            const response = await changeUserPassword(selectedUsername); // Call the API
            console.log("when password changed",response.code)
            if (response.code === 200) {
                console.log("Password changed successfully!");
                // Add additional success handling here, e.g., showing a notification or closing the modal
                setOpenModal(false); // Close the modal if needed
                alert(response.data.message)
            } else {
                console.error("Failed to change password. Status code:", response.code);
                // Add failure handling, e.g., showing an error message
            }
        } catch (error) {
            console.error("An error occurred while changing the password:", error);
            // Add error handling, e.g., showing a notification to the user
        }
        setIsYesDisabled(false)
    };
    
    



    useEffect(() => {
        getUsersList()
            .then((res) => {
                console.log("res is: ",res)
                if (res.code === 200) {
                    const formattedUsers = res.data.map(user => ({
                        id: user.username,
                        name: language === 'en' ? user.user_fullname : AdminTranslation[user.user_fullname] ? AdminTranslation[user.user_fullname]:user.user_fullname,
                        email: language === 'en' ? user.email : AdminTranslation[user.email]? AdminTranslation[user.email]: user.email,
                    }));
    
                    // Extract activated rows where 'enabled' is 1
                    const activatedRowsArray = res.data
                        .filter(user => user.enabled === 1) // Only take enabled users
                        .map(user => user.username); // Assuming 'username' is the unique identifier
    
                    setListOfUsers(formattedUsers); // Update state with the list of users
    
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

    const tableRowData = listOfUsers
    // const tableRowData = [
    //     {
    //         name: (language === 'en' ? 'abc' : AdminTranslation["abc"]),
    //         id: (language === 'en' ? 'abc12' : AdminTranslation["abc12"]),
    //         email: (language === 'en' ? 'test@gmail.com' : AdminTranslation["test@gmail.com"]),
    //     },
    //     {
    //         name: (language === 'en' ? 'user' :  AdminTranslation["user"]),
    //         id: (language === 'en' ? 'user12' :  AdminTranslation["user12"]),
    //         email: (language === 'en' ? 'test@gmail.com' :  AdminTranslation["test@gmail.com"]),

    //     },
    //     {
    //         name: (language === 'en' ? 'sample' : AdminTranslation["sample"]),
    //         id: (language === 'en' ? 'sample12' : AdminTranslation["sample12"]),
    //         email: (language === 'en' ? 'test@gmail.com' :  AdminTranslation["test@gmail.com"]),

    //     },
    //     {
    //         name: (language === 'en' ? 'test' : AdminTranslation["test"]),
    //         id: (language === 'en' ? 'test12' : AdminTranslation["test12"]),
    //         email: (language === 'en' ? 'test@gmail.com' :  AdminTranslation["test@gmail.com"]),

    //     },
    //     {
    //         name: (language === 'en' ? 'xyz' : AdminTranslation["xyz"]),
    //         id: (language === 'en' ? 'xyz12' : AdminTranslation["xyz12"]),
    //         email: (language === 'en' ? 'test@gmail.com' :  AdminTranslation["test@gmail.com"]),

    //     },
    //     {
    //         name: (language === 'en' ? 'new' : AdminTranslation["new"]),
    //         id: (language === 'en' ? 'new12' : AdminTranslation["new12"]),
    //         email: (language === 'en' ? 'test@gmail.com' :  AdminTranslation["test@gmail.com"]),

    //     }
    // ]

    let changeButton = (item) => {
        handleOpenModal();
        console.log("item_id_is: ",item.id)
        setSelectedUsername(item.id)
        console.log("user is", item);
    };

    const columns = [
        { field: 'id', headerName: (language === 'en' ? 'Username' : AdminTranslation["Username"]), flex: 1 },
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

            <ModalChangePassword open={openModal} handleClose={handleCloseModal} handleYesClick={handleYesClick}  disabledYesButton={isYesDisabled}/>     

            <Box className={`${styles.passwordManagementTableDiv}`}>
                <CustomTable rows={tableRowData} columns={columns}
                
              />
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


