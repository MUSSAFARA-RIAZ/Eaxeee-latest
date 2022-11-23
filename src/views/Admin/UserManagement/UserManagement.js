import React, { useEffect } from 'react'
import { Box, Button, ToggleButton, ToggleButtonGroup } from '@mui/material'
import MuiToggleButton from '@mui/material/ToggleButton';
import { styled } from "@mui/material/styles";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PasswordIcon from '@mui/icons-material/Password';
import LockIcon from '@mui/icons-material/Lock';
import styles from "./UserManagement.module.css"
import UserRegistration from './UserRegistration';

function UserManagement(props) {

    const ToggleButton = styled(MuiToggleButton)({
        "&.Mui-selected, &.Mui-selected:hover": {
            color: (props.theme === "default" ? `#ffff` : props.theme === 'light' ? '#6d7175' : "#ffff "),
            backgroundColor: (props.theme === "default" ? `#0d7e8a` : props.theme === 'light' ? '#dee1e6' : "#063f45"),
            // className: (props.theme === "default" ? "" : props.theme === 'light' ? '#6d7175' : "#ffff "),
        }
    });

    return (
        <Box className={styles.main} >
            <ToggleButtonGroup
                value={props.usertab}
                exclusive
                onChange={props.handleUsertab}
                className={`${styles.userManagementSubTabsGroup}`}
            // sx={{ left: (props.language == "en") && '5%', right: (props.language == "ar") && '5%' }}
            >
                <ToggleButton value="User Registration" aria-label="user registration" className={`${styles.userManagementSubTabs}`} >
                    <HowToRegIcon fontSize='small' />
                    <span className={`${styles.userManagementSubTabsTextSpan}`}>
                        User Registration
                    </span>
                </ToggleButton>
                <ToggleButton value="Password management" aria-label="password management" className={`${styles.userManagementSubTabs}`} >
                    <LockIcon fontSize='small' />
                    <span className={`${styles.userManagementSubTabsTextSpan}`}>
                        Password management
                    </span>
                </ToggleButton>

            </ToggleButtonGroup>

            {
                (props.usertab === "User Registration") &&
                <UserRegistration />
                // <PasswordManagement />
            }
        </Box>
    )
}

export default UserManagement