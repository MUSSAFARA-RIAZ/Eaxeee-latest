import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { connect } from "react-redux";
import LeftPane from "../Layout/Leftpane";
import RightPane from "../Layout/Rightpane";
import ControlBar from "./Components/ControlBar";
import FloatingWidget from "./Components/FloatingWidget";
import Treecheck from "./Components/Treecheck";
import Paper from "@mui/material/Paper";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import OrgDefaultTheme from "./OrganizationalPortal.default.module.css";
import OrgDarkTheme from "./OrganizationalPortal.dark.module.css";
import OrgLightTheme from "./OrganizationalPortal.light.module.css";

const OrganizationalPortal = (props) => {
  const { theme } = props;
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [selectedArtifacts, setSelectedArtifacts] = useState([]);

  const [minimizedArtifacts, setMinimizedArtifacts] = useState([]);

  const handleSelectArtifact = (index) => {
    setSelectedArtifacts([...selectedArtifacts, index]);
  };
  const handleMinimizedArtifact = (index) => {
    setMinimizedArtifacts([...minimizedArtifacts, index]);
  };

  const handleUnminimizeArtifact = (index) => {
    setMinimizedArtifacts(minimizedArtifacts.filter((item) => item !== index));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />

      <LeftPane open={open} onClose={handleDrawerClose} props={props}>
        <div></div>

        <PrimeReactProvider>
          <Treecheck props={props} />
        </PrimeReactProvider>
      </LeftPane>

      <RightPane
        open={open}
        props={props}
        handleDrawerOpen={handleDrawerOpen}
        theme={props.theme}
      >
        <div style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              width: "40%",
              display: "flex",
              alignItems: "center",
              marginLeft: open ? "25px" : "50px",
            }}
          >
            Diary 1 : Page 2
          </div>
          <div style={{ width: "60%", marginTop:"5px" }}>
            <ControlBar
              onSelectArtifact={handleSelectArtifact}
              theme={props.theme}
            />
          </div>
        </div>
        <div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {selectedArtifacts.map((artifact, index) => (
              <div key={index} style={{ margin: "8px" }}>
                <FloatingWidget
                  index={index}
                  onMinimizedArtifact={handleMinimizedArtifact}
                  isMinimized={minimizedArtifacts.includes(index)}
                  theme={props.theme}
                />
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              position: "fixed",
              bottom: "1px",
            }}
          >
            {minimizedArtifacts.map((index) => (
              <div
                key={index}
                style={{ margin: "1px" }}
                onClick={() => handleUnminimizeArtifact(index)}
              >
                <Paper
                  elevation={1}
                  className={`${
                    theme === "default"
                      ? OrgDefaultTheme.Organization_MinimizedFloatingWidget
                      : theme === "light"
                      ? OrgLightTheme.Organization_MinimizedFloatingWidget
                      : OrgDarkTheme.Organization_MinimizedFloatingWidget
                  }`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    paddingX: 3,
                  }}
                >
                  {index}
                </Paper>
              </div>
            ))}
          </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationalPortal);
