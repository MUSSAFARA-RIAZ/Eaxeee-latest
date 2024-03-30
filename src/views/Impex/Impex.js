// import React from "react";

// function Impex(props) {
//   console.log("Impex Props", props);

//   const buttonRef = React.useRef();

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//     flexDirection: "column",
//   // padding: "10px 0px 0px 0px",
//  // backgroundColor:"#cceaed",
//     maxHeight: "100%",
//     boxSizing:"border-box",

//     // border:"6px solid red",

//         }}
//       >
//        <div
//   style={{
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "flex-start", // Adjusted to start from the left
//    padding: "10px", // Removed bottom padding to avoid extra space
//   }}
// >
//   <Button variant="contained" style={{ margin: "0px 5px" }}>Button1</Button>
//   <Button variant="contained" style={{ margin: "0px 5px" }}>Button2</Button>
//   <Button variant="contained" style={{ margin: "0px 5px" }}>Button3</Button>
// </div>

//         <div
//           className={`${styles.Impex_parentBox} ${
//             props.theme === "default"
//               ? ImpexDefaultTheme.Impex_parentBox
//               : props.theme === "light"
//               ? ImpexLightTheme.Impex_parentBox
//               : ImpexDarkTheme.Impex_parentBox
//           } `}
//         >
//           <div
//             className={`${styles.Impex_leftpane} ${
//               props.theme === "default"
//                 ? ImpexDefaultTheme.Impex_leftpane
//                 : props.theme === "light"
//                 ? ImpexLightTheme.Impex_leftpane
//                 : ImpexDarkTheme.Impex_leftpane
//             }`}
//           >

//             <div
//               className={`${styles.Impex_exportBox} ${
//                 props.theme === "default"
//                   ? ImpexDefaultTheme.Impex_exportBox
//                   : props.theme === "light"
//                   ? ImpexLightTheme.Impex_exportBox
//                   : ImpexDarkTheme.Impex_exportBox
//               }`}
//             >
//               <FontAwesomeIcon icon="fa-regular fa-file-export" />
//               <h1>Export</h1>
//               <Impexbtn
//                 btntitle="Export Template"
//                 starticon={<CloudUploadIcon />}
//               />

//               <Impexbtn
//                 btntitle="Export data"
//                 starticon={<CloudUploadIcon />}
//               />
//             </div>
//             <div
//               className={`${styles.Impex_exportBox} ${
//                 props.theme === "default"
//                   ? ImpexDefaultTheme.Impex_exportBox
//                   : props.theme === "light"
//                   ? ImpexLightTheme.Impex_exportBox
//                   : ImpexDarkTheme.Impex_exportBox
//               }`}
//             >
//               <FontAwesomeIcon icon="fa-regular fa-file-export" />
//               <hr/>
//               <h1>Mussafara Riaz</h1>

//             </div>

//             <div
//               className={`${styles.Impex_importBox} ${
//                 props.theme === "default"
//                   ? ImpexDefaultTheme.Impex_importBox
//                   : props.theme === "light"
//                   ? ImpexLightTheme.Impex_importBox
//                   : ImpexDarkTheme.Impex_importBox
//               }`}
//             >
//               <h1>Import</h1>
//               <DropDown />

//               <div>
//                 <Impexbtn

//                   btntitle="Select File"
//                   starticon={<AddIcon />}
//                   tooltipTitle="The file must have all the sheets"
//                   ref={buttonRef}
//                 />
//               </div>

//               <Impexbtn
//                 btntitle="Import Data"
//                 starticon={<CloudDownloadIcon />}
//               />
//             </div>
//           </div>

//           <div
//             className={`${styles.Impex_rightpane} ${
//               props.theme === "default"
//                 ? ImpexDefaultTheme.Impex_rightpane
//                 : props.theme === "light"
//                 ? ImpexLightTheme.Impex_rightpane
//                 : ImpexDarkTheme.Impex_rightpane
//             }`}

//           >
//             <Messagesection />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     language: state.language,
//     theme: state.theme,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setLanguage: (lang) => {
//       return dispatch({
//         type: "TOGGLELANG",
//         value: lang === "en" ? "ar" : "en",
//       });
//     },
//     setTheme: (theme) => {
//       return dispatch({
//         type: "UPDATETHEME",
//         value: theme,
//       });
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Impex);
import React, { useState } from "react";
import Box from "@mui/material/Box";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DropDown from "./ImpexComponents/DropDown";
import Messagesection from "./ImpexComponents/Messagesection";
import Impexbtn from "./ImpexComponents/Impexbtn";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AddIcon from "@mui/icons-material/Add";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../Impex/ImpexComponents/Impex.module.css";
import ImpexDefaultTheme from "../Impex/ImpexComponents/ImpexDefault.module.css";
import ImpexDarkTheme from "../Impex/ImpexComponents/ImpexDark.module.css";
import ImpexLightTheme from "../Impex/ImpexComponents/ImpexLight.module.css";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";

import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import Ribbon from "./ImpexComponents/Ribbon";

const drawerWidth = 310;

const Main = ({ open, children, language }) => {
  const isLanguageRTL = language === "ar";
  return (
    <main
      style={{
        flexGrow: 1,
        //  paddingRight:"10px",
        // transition: "margin .3s ease",
        borderRadius: "10px",
        backgroundColor:" #cceaed",
        width: open ? "calc(100% - 310px)" : "100%",
        //  width:"calc(100% - 310px)",
        height: open ? "calc(100% - 50px)" : "calc(100vh - 50px)",
        //  position:"relative",
        //  left: open ? 0 : -2,
        //  top:open ? 0 : -50,

        // marginRight:"100px",
        // backgroundColor:"yellow",
        // border: "4px solid purple",
        //  position:"fixed",
        // backgroundColor:"#cceaed",

        // border:"2px solid red",

     
        marginLeft: language === "en" ? (open ? drawerWidth : 0) : "auto",
       

        // marginRight: language === 'ar' ? (open ? drawerWidth : 0) : 'auto',
        // marginTop: open ? 0 : 50,

        // marginRight: language === 'ar' ? (open ? drawerWidth : 0) : 'auto',
        direction: isLanguageRTL ? "rtl" : "ltr",
      }}
    >
      {children}
    </main>
  );
};

const DrawerHeader = ({ onClose }) => {
  return (
    <div
      style={{
        display: "flex",
        //   alignItems: 'center',
        height: "45px",
        justifyContent: "flex-end",
        // border: "1px solid red",
      }}
    >
      <IconButton sx={{ color: "#0d7e8a" }} onClick={onClose}>
        <ArrowCircleLeftRoundedIcon sx={{ fontSize: "2rem" }} />
      </IconButton>
    </div>
  );
};

function DrawerMain(props) {
  const buttonRef = React.useRef();
  console.log("Enterprise Props", props);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
 

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            marginTop: "50px",
            // padding:"10px",

            borderRadius: "10px",
            border: "none",
            height: "92vh",
            backgroundColor:"#dff7fa",
           
            //  marginRight:"20px",
            position:"fixed",
            // border: "2px solid green",

            color:
              props.theme === "default"
                ? "black"
                : props.theme === "light"
                ? "black"
                : "#b4b4b4",
            // backgroundColor:props.theme === "default" ? "#ffffff" : props.theme === "light" ? "#eff3f7" : "#181818",
          },
        }}
        variant="persistent"
        anchor={props.language === "en" ? "left" : "right"}
        // border="1px solid red"

        open={open}
      >
        <DrawerHeader sx={{ height: "10px" }} onClose={handleDrawerClose} />

        {/* <List>
                        
<div
              className={`${styles.Impex_exportBox} ${
                props.theme === "default"
                  ? ImpexDefaultTheme.Impex_exportBox
                  : props.theme === "light"
                  ? ImpexLightTheme.Impex_exportBox
                  : ImpexDarkTheme.Impex_exportBox
              }`}
            >
              <FontAwesomeIcon icon="fa-regular fa-file-export" />
              <h1>Export</h1>
              <Impexbtn
                btntitle="Export Template"
                starticon={<CloudUploadIcon />}
              />
              

              <Impexbtn
                btntitle="Export data"
                starticon={<CloudUploadIcon />}
              />
            </div>
           

        </List>
    
        <List>
        <div
              className={`${styles.Impex_importBox} ${
                props.theme === "default"
                  ? ImpexDefaultTheme.Impex_importBox
                  : props.theme === "light"
                  ? ImpexLightTheme.Impex_importBox
                  : ImpexDarkTheme.Impex_importBox
              }`}
            >
              <h1>Import</h1>
              <DropDown />

              <div>
                <Impexbtn
                
                  btntitle="Select File"
                  starticon={<AddIcon />}
                  tooltipTitle="The file must have all the sheets"
                  ref={buttonRef}
                />
              </div>

              <Impexbtn
                btntitle="Import Data"
                starticon={<CloudDownloadIcon />}
              />
            </div>
        </List> */}
      </Drawer>

      <div></div>

      <Main open={open} language={props.language}>
      <div style={{ display: 'flex',  height:"45px", alignItems: 'center', backgroundColor:"#dff7fa"   }}>
      {/* <Button variant="contained" sx={{margin:"5px 5px"}} >button1</Button>
      <Button variant="contained" sx={{margin:"5px 5px"}}>button2</Button>
      <Button variant="contained" sx={{margin:"5px 5px"}}>button3</Button> */}

<div
        style={{
          ...(open && { display: "none" }),
          // border: "2px solid green",
          borderTopRightRadius: "60%",
          borderBottomRightRadius: "60%",
          width: "max-content",
          paddingRight: 10,
        }}
      >
        <IconButton
          color="red"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
        >
          <ArrowCircleRightRoundedIcon
            sx={{
              color: "#0d7e8a",
              fontSize: "2rem",
              // border: "1px solid yellow",
              borderTopRightRadius: "50%",
              borderBottomRightRadius: "50%",
              position: "relative",
              left: 10,
            }}
          />
          {/* <ArrowCircleRightRoundedIcon sx={{color:"#0d7e8a",fontSize: "2rem", border:"2px solid red", borderTopRightRadius:"20px", borderBottomRightRadius:"20px"}}/> */}
          {/* <ArrowBackIcon sx={{color:"yellow"}}/> */}
        </IconButton>
      </div>

    </div>
        <div>
          {/* <Messagesection/> */}
          <Messagesection
            adjustHeight={
              open ? `calc(100vh - 103.5px)` : "calc(100vh - 103px)"
            }
          />
        </div>
      </Main>
    </Box>
  );
}
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMain);
