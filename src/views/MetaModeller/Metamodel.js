import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { connect } from "react-redux";
// import styles from "../Admin/Admin.module.css";
import LeftPane from "../Layout/Leftpane";
import RightPane from "../Layout/Rightpane";
import AdminTranslation from "../../Utils/AdminTranslation/AdminTranslation";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
// import { UserTabs } from "../Admin/UserManagement/UserManagement";
// import { UserContent } from "../MetaModeller/LayerManagement/LayerManagement";
import {LayerContent} from "../MetaModeller/LayerManagement/LayerManagement"
import {
    LicenseManagementContent,
    LicenseManagementTabs,
} from "../Admin/LicenseManagement/LicenseManagement";
import {
    RepositoryTabs,
    RepositoryContent,
} from "../Admin/RepositoryManagement/RepositoryManagement";
import { MetaModelContent } from "../Admin/MetamodelManagement/MetamodelManagement";
import FileList from "../../components/FileList/FileList";
import { ElementContent } from "../MetaModeller/ElementManagement/ElementManagement";
import { RelationShipContent } from "../MetaModeller/RelationShipManagement/RelationShipManagement";

const Metamodel = (props) => {
    const { language } = props;

    const [view, setView] = useState(0);
    const [value, setValue] = useState(0);

    const handleMainTabs = (event, newValue) => {
        setView(newValue);
        console.log(newValue);
    };

    const tabs = [
        {
            label:
                language === "en"
                    ? "Layers"
                    : AdminTranslation["Layers"],
        },
        {
            label:
                language === "en"
                    ? "Elements"
                    : AdminTranslation["Elements"],
        },
        {
            label:
                language === "en"
                    ? "Relationships"
                    : AdminTranslation["Relationships"],
        },
        {
            label:
                language === "en"
                    ? "Attributes"
                    : AdminTranslation["Attributes"],
        },
        {
            label:
                language === "en"
                    ? "Connection Matrix"
                    : AdminTranslation["Connection Matrix"],
        },
    ];
   

    const repositorytabs = [

        { label: language === "en" ? 'Architecture' : AdminTranslation["Architecture"] },
        { label: language === "en" ? 'Document' : AdminTranslation["Document"] },
        { label: language === "en" ? 'Process' : AdminTranslation["Process"] },
        { label: language === "en" ? 'Repository' : AdminTranslation["Repository"] },
    ];
    const metamodeltabs = [
        {
            label: language === "en" ? "Deployment" : AdminTranslation["Deployment"],
        },
        {
            label: language === "en" ? "Framework" : AdminTranslation["Framework"],
        },
    ];

    const handleMainChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CssBaseline />

            <LeftPane open={open} onClose={handleDrawerClose} props={props}>
                <div></div>
                <CustomTabs
                    // className={styles.adminCustomTabs}
                    value={view}
                    onChange={handleMainTabs}
                    tabs={tabs}
                    orientation="vertical"

                />
            </LeftPane>

            <RightPane open={open} props={props} handleDrawerOpen={handleDrawerOpen}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginLeft: open ? '0px' : '40px', }}>
          {
            view===0 &&  <FileList props={props} />
          }       
                </div>

                <div>
                    {view === 0 && <LayerContent/>}
                    {view === 1 && <ElementContent/>}
                    {

                    }
                    {view === 2 && (
                        <RelationShipContent />
                    )}
                    {view === 3 && (
                        <MetaModelContent value={value} tabs={metamodeltabs} />
                    )}

                </div>
            </RightPane>
        </Box>
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
        setTheme: (theme) => {
            return dispatch({
                type: "UPDATETHEME",
                value: theme,
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Metamodel);
