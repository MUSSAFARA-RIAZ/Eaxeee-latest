import React, { useState } from 'react'
import { Box } from '@mui/material'
import { connect } from 'react-redux';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { styled } from "@mui/material/styles";

import styles from './Admin.module.css'
import stylesDefault from './AdminDefault.module.css'
import stylesLight from './AdminLight.module.css'
import stylesDark from './AdminDark.module.css'
import UserManagement from './UserManagement/UserManagement';

function Admin(props) {

    const [view, setView] = useState('User Management');
    const [usertab, setUsertab] = useState('User Registration');

    const handleMainTabs = (event, nextView) => {
        if (nextView) {
            setView(nextView);
        }
    };
    const handleUsertab = (event, newUsertab) => {
        if (newUsertab) {
            setUsertab(newUsertab);
        }
    };
    const ToggleButton = styled(MuiToggleButton)({
        "&.Mui-selected, &.Mui-selected:hover": {
            color: (props.theme === "default" ? `#ffff` : props.theme === 'light' ? '#6d7175' : "#ffff "),
            backgroundColor: (props.theme === "default" ? `#0d7e8a` : props.theme === 'light' ? '#dee1e6' : "#063f45"),
            // className: (props.theme === "default" ? "" : props.theme === 'light' ? '#6d7175' : "#ffff "),
        }
    });
    return (
        <Box className={`${styles.main} ${props.theme == "default" ? stylesDefault.main : props.theme == "light" ? stylesLight.main : stylesDark.main} `}>
            <Box className={`${styles.leftPane} ${props.theme == "default" ? stylesDefault.leftPane : props.theme == "light" ? stylesLight.leftPane : stylesDark.leftPane}`}>
                <ToggleButtonGroup
                    orientation="vertical"
                    value={view}
                    exclusive
                    onChange={handleMainTabs}
                    className={styles.leftPaneTabsGroup}
                >
                    <ToggleButton value="User Management" aria-label="user Management" className={`${styles.userManagementTabs}`}>
                        User Management
                    </ToggleButton>
                    <ToggleButton value="License Management" aria-label="license Management" className={`${styles.userManagementTabs}`}>
                        License Management
                    </ToggleButton>
                    <ToggleButton value=" Repository Management" aria-label="repository Management" className={`${styles.userManagementTabs}`}>
                        Repository Management
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Box className={`${styles.rightPane} ${props.theme == "default" ? stylesDefault.rightPane : props.theme == "light" ? stylesLight.rightPane : stylesDark.rightPane}`}>
                {
                    (view === "User Management") && <UserManagement usertab={usertab} theme={props.theme} handleUsertab={handleUsertab} language={props.language} />
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
