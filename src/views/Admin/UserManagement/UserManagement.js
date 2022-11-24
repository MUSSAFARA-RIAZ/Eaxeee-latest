import React from 'react'
import { Box, ToggleButtonGroup } from '@mui/material'
import MuiToggleButton from '@mui/material/ToggleButton';
import { styled } from "@mui/material/styles";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { connect } from 'react-redux';
import LockIcon from '@mui/icons-material/Lock';
import styles from "./UserManagement.module.css"
import UserRegistration from './UserRegistration';
import PasswordManagement from './PasswordManagement';

function UserManagement(props) {

    let {language } = props;

    const ToggleButton = styled(MuiToggleButton)({
        "&.Mui-selected, &.Mui-selected:hover": {
            color: (props.theme === "default" ? `#ffff` : props.theme === 'light' ? '#6d7175' : "#ffff "),
            backgroundColor: (props.theme === "default" ? `#0d7e8a` : props.theme === 'light' ? '#dee1e6' : "#063f45"),
        }
    });

    return (
        <Box className={styles.main} >
            <ToggleButtonGroup
                value={props.usertab}
                exclusive
                onChange={props.handleUsertab}
                className={`${styles.userManagementSubTabsGroup}`}
            >
                <ToggleButton value="User Registration" aria-label="user registration" className={`${styles.userManagementSubTabs}`} >
                    <HowToRegIcon fontSize='small' />
                    <span className={`${styles.userManagementSubTabsTextSpan}`}>
                    {language === 'en' ? 'User Registration' : 'المستخدم تسجيل'}
                    </span>
                </ToggleButton>
                <ToggleButton value="Password management" aria-label="password management" className={`${styles.userManagementSubTabs}`} >
                    <LockIcon fontSize='small' />
                    <span className={`${styles.userManagementSubTabsTextSpan}`}>
                    {language === 'en' ? 'Password management' : ' إدارة كلمة المرور'}
                    </span>
                </ToggleButton>

            </ToggleButtonGroup>

            {
                (props.usertab === "User Registration") ?
                <UserRegistration /> :
                <PasswordManagement/>
            }
        </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)