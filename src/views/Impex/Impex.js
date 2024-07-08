import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { connect } from "react-redux";
import LeftPane from "../Layout/Leftpane";
import RightPane from "../Layout/Rightpane";
import ImportExportBox from "./ImpexComponents/Import_exportBox";
import Messagesection from "./ImpexComponents/Messagesection";

const Impex = (props) => {
  const [open, setOpen] = useState(true); // Set open to true initially

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
      <div>
        <ImportExportBox props={props}/>
        </div>
      </LeftPane>
      
      <RightPane open={open} props={props} handleDrawerOpen={handleDrawerOpen} >
        <div>
    
        </div>
        <div>
        <Messagesection props={props}/>

          
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

export default connect(mapStateToProps, mapDispatchToProps)(Impex);
