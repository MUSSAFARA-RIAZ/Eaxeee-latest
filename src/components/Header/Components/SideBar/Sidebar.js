import React from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import settingWhiteImg from '../../../../Assets/Images/settingWhite.png'
import impexWhiteImg from "../../../../Assets/Images/impexWhite.png"
import EnterpriseArchitectureImg from "../../../../Assets/Images/EnterpriseArchitecture.png"
import analysisImg from "../../../../Assets/Images/analysis.png"
import styles from "./Sidebar.module.css"
import metadata from "../../../../Assets/Images/Metadetaicon.png"

function Sidebar(props) {
    const list = (anchor) => (
        <Box

            onClick={props.toggleDrawer(anchor, false)}
            onKeyDown={props.toggleDrawer(anchor, false)}


        >
            <List>
                <ListItem disablePadding>
                    <Tooltip title="Eaxee Administration" placement="right">
                        <Link to="admin">
                            <ListItemButton className={styles.sidebarItemsButton} onClick={() => {
                                props.changePageTitle("Administration")
                                props.setActivePage("administration")
                            }}>
                                <ListItemIcon className={styles.sidebarItemsImageParent}>
                                    <Box
                                        component="img"
                                        sx={{ height: 35 }}
                                        alt="Account management"
                                        src={settingWhiteImg}
                                        className={styles.sidebarItemsImage}
                                    />

                                    {/* <img
                                        src={settingWhiteImg}
                                        alt="Account management"
                                        className={styles.sidebarItemsImage}
                                        style={{ height: 35, width: 35 }}
                                    /> */}

                                </ListItemIcon>

                            </ListItemButton>
                        </Link>

                    </Tooltip>

                </ListItem>
                <Divider />
                <ListItem onClick={() => props.changePageTitle("Impex")} disablePadding>
                    <Tooltip title="Eaxee Impex" placement="right">
                        <Link to="impex">
                            <ListItemButton className={styles.sidebarItemsButton} onclick={() => {
                                // props.changePageTitle("Enterprise Architecture")
                                props.changePageTitle("Impex")
                                props.setActivePage("impex")
                            }}>
                                <ListItemIcon className={styles.sidebarItemsImageParent}>
                                    <Box
                                        className={styles.sidebarItemsImage}
                                        component="img"
                                        sx={{ height: 35 }}
                                        alt="Eaxee Impex"
                                        src={impexWhiteImg}

                                    />

                                </ListItemIcon>

                            </ListItemButton>
                        </Link>
                    </Tooltip>
                </ListItem>
                <Divider />

                <ListItem disablePadding>
                    <Tooltip title="Eaxee Enterprise Architecture" placement="right">
                        <Link to="enterprise">
                            <ListItemButton className={styles.sidebarItemsButton} onClick={() => {
                                props.changePageTitle("Enterprise Architecture")
                                props.setActivePage("enterprise")

                            }}>
                                <ListItemIcon className={styles.sidebarItemsImageParent}>
                                    <Box
                                        className={styles.sidebarItemsImage}
                                        component="img"
                                        sx={{ height: 35 }}
                                        alt="Eaxee Enterprise Architecture"
                                        src={EnterpriseArchitectureImg}

                                    />
                                </ListItemIcon>

                            </ListItemButton>
                        </Link>
                    </Tooltip>
                </ListItem>

                <Divider />
                <ListItem disablePadding>
                    <Tooltip title="Eaxee Organization Portal" placement="right">
                        <Link to="organizational-portal">

                            <ListItemButton className={styles.sidebarItemsButton} onClick={() => {
                                props.changePageTitle("Organization Portal")
                                props.setActivePage("organizationPortal")
                            }}>
                                <ListItemIcon className={styles.sidebarItemsImageParent}>
                                    <Box
                                        className={styles.sidebarItemsImage}
                                        component="img"
                                        sx={{ height: 35 }}
                                        alt="Analysis"
                                        src={analysisImg}
                                    />
                                </ListItemIcon>

                            </ListItemButton>
                        </Link>
                    </Tooltip>
                </ListItem>
                <ListItem disablePadding>
                    <Tooltip title="Meta Model" placement="right">
                        <Link to="organizational-portal">

                            <ListItemButton className={styles.sidebarItemsButton} onClick={() => {
                                props.changePageTitle("Organization Portal")
                                props.setActivePage("organizationPortal")
                            }}>
                                <ListItemIcon className={styles.sidebarItemsImageParent}>
                                    <Box
                                        className={styles.sidebarItemsImage}
                                        component="img"
                                        sx={{ height: 35, color: "white" }}
                                        alt="Analysis"
                                        src={metadata}
                                    />
                                </ListItemIcon>

                            </ListItemButton>
                        </Link>
                    </Tooltip>
                </ListItem>
            </List>
        </Box>
    );
    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        PaperProps={{
                            sx: {
                                background: (props.theme === "default" ? "#063f45" : props.theme === 'light' ? "#cbd0d7" : "#2b2b2b"),

                                borderRadius: 2,
                                width: "5em",

                                position: 'relative',
                                top: '25%',
                                overflow: 'hidden',
                                display: 'flex',
                                justifyContent: "flex-start",
                                height: "max-content",

                                alignItems: 'center'
                            },
                        }}

                        open={props.state[anchor]}

                        onClose={props.toggleDrawer(anchor, false)}
                        anchor={props.lang === 'en' ? 'left' : 'right'}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        language: state.language,
        theme: state.theme,
        activePage: state.activePage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: (lang) => {
            return dispatch({
                type: "TOGGLELANG",
                value: (lang === 'en') ? 'ar' : "en"
            })
        },
        setActivePage: (pageName) => {
            return dispatch({
                type: "SETACTIVEPAGE",
                value: pageName,
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)