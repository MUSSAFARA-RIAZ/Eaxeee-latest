// // import React from "react";

// // function Impex(props) {
// //   console.log("Impex Props", props);

// //   const buttonRef = React.useRef();

// //   return (
// //     <>
// //       <div
// //         style={{
// //           display: "flex",
// //     flexDirection: "column",
// //   // padding: "10px 0px 0px 0px",
// //  // backgroundColor:"#cceaed",
// //     maxHeight: "100%",
// //     boxSizing:"border-box",

// //     // border:"6px solid red",

// //         }}
// //       >
// //        <div
// //   style={{
// //     display: "flex",
// //     flexDirection: "row",
// //     justifyContent: "flex-start", // Adjusted to start from the left
// //    padding: "10px", // Removed bottom padding to avoid extra space
// //   }}
// // >
// //   <Button variant="contained" style={{ margin: "0px 5px" }}>Button1</Button>
// //   <Button variant="contained" style={{ margin: "0px 5px" }}>Button2</Button>
// //   <Button variant="contained" style={{ margin: "0px 5px" }}>Button3</Button>
// // </div>

// //         <div
// //           className={`${styles.Impex_parentBox} ${
// //             props.theme === "default"
// //               ? ImpexDefaultTheme.Impex_parentBox
// //               : props.theme === "light"
// //               ? ImpexLightTheme.Impex_parentBox
// //               : ImpexDarkTheme.Impex_parentBox
// //           } `}
// //         >
// //           <div
// //             className={`${styles.Impex_leftpane} ${
// //               props.theme === "default"
// //                 ? ImpexDefaultTheme.Impex_leftpane
// //                 : props.theme === "light"
// //                 ? ImpexLightTheme.Impex_leftpane
// //                 : ImpexDarkTheme.Impex_leftpane
// //             }`}
// //           >

// //             <div
// //               className={`${styles.Impex_exportBox} ${
// //                 props.theme === "default"
// //                   ? ImpexDefaultTheme.Impex_exportBox
// //                   : props.theme === "light"
// //                   ? ImpexLightTheme.Impex_exportBox
// //                   : ImpexDarkTheme.Impex_exportBox
// //               }`}
// //             >
// //               <FontAwesomeIcon icon="fa-regular fa-file-export" />
// //               <h1>Export</h1>
// //               <Impexbtn
// //                 btntitle="Export Template"
// //                 starticon={<CloudUploadIcon />}
// //               />

// //               <Impexbtn
// //                 btntitle="Export data"
// //                 starticon={<CloudUploadIcon />}
// //               />
// //             </div>
// //             <div
// //               className={`${styles.Impex_exportBox} ${
// //                 props.theme === "default"
// //                   ? ImpexDefaultTheme.Impex_exportBox
// //                   : props.theme === "light"
// //                   ? ImpexLightTheme.Impex_exportBox
// //                   : ImpexDarkTheme.Impex_exportBox
// //               }`}
// //             >
// //               <FontAwesomeIcon icon="fa-regular fa-file-export" />
// //               <hr/>
// //               <h1>Mussafara Riaz</h1>

// //             </div>

// //             <div
// //               className={`${styles.Impex_importBox} ${
// //                 props.theme === "default"
// //                   ? ImpexDefaultTheme.Impex_importBox
// //                   : props.theme === "light"
// //                   ? ImpexLightTheme.Impex_importBox
// //                   : ImpexDarkTheme.Impex_importBox
// //               }`}
// //             >
// //               <h1>Import</h1>
// //               <DropDown />

// //               <div>
// //                 <Impexbtn

// //                   btntitle="Select File"
// //                   starticon={<AddIcon />}
// //                   tooltipTitle="The file must have all the sheets"
// //                   ref={buttonRef}
// //                 />
// //               </div>

// //               <Impexbtn
// //                 btntitle="Import Data"
// //                 starticon={<CloudDownloadIcon />}
// //               />
// //             </div>
// //           </div>

// //           <div
// //             className={`${styles.Impex_rightpane} ${
// //               props.theme === "default"
// //                 ? ImpexDefaultTheme.Impex_rightpane
// //                 : props.theme === "light"
// //                 ? ImpexLightTheme.Impex_rightpane
// //                 : ImpexDarkTheme.Impex_rightpane
// //             }`}

// //           >
// //             <Messagesection />
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // const mapStateToProps = (state) => {
// //   return {
// //     language: state.language,
// //     theme: state.theme,
// //   };
// // };

// // const mapDispatchToProps = (dispatch) => {
// //   return {
// //     setLanguage: (lang) => {
// //       return dispatch({
// //         type: "TOGGLELANG",
// //         value: lang === "en" ? "ar" : "en",
// //       });
// //     },
// //     setTheme: (theme) => {
// //       return dispatch({
// //         type: "UPDATETHEME",
// //         value: theme,
// //       });
// //     },
// //   };
// // };

// // export default connect(mapStateToProps, mapDispatchToProps)(Impex);
// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import DropDown from "./ImpexComponents/DropDown";
// import Messagesection from "./ImpexComponents/Messagesection";
// import Impexbtn from "./ImpexComponents/Impexbtn";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import AddIcon from "@mui/icons-material/Add";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import styles from "../Impex/ImpexComponents/Impex.module.css";
// import ImpexDefaultTheme from "../Impex/ImpexComponents/ImpexDefault.module.css";
// import ImpexDarkTheme from "../Impex/ImpexComponents/ImpexDark.module.css";
// import ImpexLightTheme from "../Impex/ImpexComponents/ImpexLight.module.css";
// import { connect } from "react-redux";
// import { Button } from "@mui/material";
// import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";

// import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
// import Ribbon from "./ImpexComponents/Ribbon";
// import ImportExportBox from "./ImpexComponents/Import_exportBox";

// const drawerWidth = 310;

// const Main = ({ open, children, language }) => {
//   const isLanguageRTL = language === "ar";
//   return (
//     <main
//       style={{
//         flexGrow: 1,
     
//         backgroundColor:" #cceaed",
//         width: open ? "calc(100% - 310px)" : "100%",
//         //  width:"calc(100% - 310px)",
//         height: open ? "calc(100% - 50px)" : "calc(100vh - 50px)",
       

     
//         marginLeft: language === "en" ? (open ? drawerWidth : 0) : "auto",
       

//         // marginRight: language === 'ar' ? (open ? drawerWidth : 0) : 'auto',
//         // marginTop: open ? 0 : 50,

//         // marginRight: language === 'ar' ? (open ? drawerWidth : 0) : 'auto',
//         direction: isLanguageRTL ? "rtl" : "ltr",
//       }}
//     >
//       {children}
//     </main>
//   );
// };

// const DrawerHeader = ({ onClose }) => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         //   alignItems: 'center',
//         height: "45px",
//         justifyContent: "flex-end",
//         // border: "1px solid red",
//       }}
//     >
//       <IconButton sx={{ color: "#0d7e8a" }} onClick={onClose}>
//         <ArrowCircleLeftRoundedIcon sx={{ fontSize: "2rem" }} />
//       </IconButton>
//     </div>
//   );
// };

// function DrawerMain(props) {
//   const buttonRef = React.useRef();
//   console.log("Enterprise Props", props);
//   const [open, setOpen] = useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column" }}>
//       <CssBaseline />
 

//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             marginTop: "50px",
//             // padding:"10px",

//             // borderRadius: "10px",
//             border: "none",
//             height: "92vh",
//             backgroundColor:"#dff7fa",
           
//             //  marginRight:"20px",
      
//             // border: "2px solid green",

//             color:
//               props.theme === "default"
//                 ? "black"
//                 : props.theme === "light"
//                 ? "black"
//                 : "#b4b4b4",
//             // backgroundColor:props.theme === "default" ? "#ffffff" : props.theme === "light" ? "#eff3f7" : "#181818",
//           },
//         }}
//         variant="persistent"
//         anchor={props.language === "en" ? "left" : "right"}
//         // border="1px solid red"

//         open={open}
//       >
//         <DrawerHeader sx={{ height: "10px" }} onClose={handleDrawerClose} />

//         <ImportExportBox/>
//       </Drawer>

  

//       <Main open={open} language={props.language}>
//       <div style={{ display: 'flex',  height:"45px", alignItems: 'center', backgroundColor:"#dff7fa"   }}>
//       {/* <Button variant="contained" sx={{margin:"5px 5px"}} >button1</Button>
//       <Button variant="contained" sx={{margin:"5px 5px"}}>button2</Button>
//       <Button variant="contained" sx={{margin:"5px 5px"}}>button3</Button> */}

// <div
//         style={{
//           ...(open && { display: "none" }),
//           // border: "2px solid green",
//           borderTopRightRadius: "60%",
//           borderBottomRightRadius: "60%",
//           width: "max-content",
//           paddingRight: 10,
//         }}
//       >
//         <IconButton
//           color="red"
//           aria-label="open drawer"
//           onClick={handleDrawerOpen}
//           edge="start"
//         >
//           <ArrowCircleRightRoundedIcon
//             sx={{
//               color: "#0d7e8a",
//               fontSize: "2rem",
//               // border: "1px solid yellow",
//               borderTopRightRadius: "50%",
//               borderBottomRightRadius: "50%",
//               position: "relative",
//               left: 10,
//             }}
//           />
//           {/* <ArrowCircleRightRoundedIcon sx={{color:"#0d7e8a",fontSize: "2rem", border:"2px solid red", borderTopRightRadius:"20px", borderBottomRightRadius:"20px"}}/> */}
//           {/* <ArrowBackIcon sx={{color:"yellow"}}/> */}
//         </IconButton>
//       </div>

//     </div>
//         <div>
//           {/* <Messagesection/> */}
//           <Messagesection
//             adjustHeight={
//               open ? `calc(100vh - 96px)` : "calc(100vh - 103px)"
//             }
//           />
//         </div>
//       </Main>
//     </Box>
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

// export default connect(mapStateToProps, mapDispatchToProps)(DrawerMain);
import React, { useState } from "react";
import Box from "@mui/material/Box";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Messagesection from "./ImpexComponents/Messagesection";
import { connect } from "react-redux";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ImportExportBox from "./ImpexComponents/Import_exportBox";
const drawerWidth = 310;
const Main = ({ open, children, language }) => {
  const isLanguageRTL = language === "ar";
  return (
    <main
      style={{
        flexGrow: 1,
        backgroundColor: "#cceaed",
        width: open ? "calc(100% - 310px)" : "100%",
        height: open ? "calc(100% - 50px)" : "calc(100vh - 50px)",
        marginLeft: language === "en" ? (open ? drawerWidth : 0) : "auto",
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
        height: "45px",
        justifyContent: "flex-end",
      }}
    >
      <IconButton sx={{ color: "#0d7e8a" }} onClick={onClose}>
        <ArrowCircleLeftRoundedIcon sx={{ fontSize: "2rem" }} />
      </IconButton>
    </div>
  );
};

function DrawerMain(props) {
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
          zIndex:12,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            marginTop: "50px",
            border: "none",
            height: "92vh",
            backgroundColor: "#dff7fa",
            color:
              props.theme === "default"
                ? "black"
                : props.theme === "light"
                ? "black"
                : "#b4b4b4",
          },
        }}
        variant="persistent"
        anchor={props.language === "en" ? "left" : "right"}
        open={open}
      >
        <DrawerHeader sx={{ height: "10px" }} onClose={handleDrawerClose} />
        <ImportExportBox />
      </Drawer>

      <Main open={open} language={props.language}>
        <div
          style={{
            display: "flex",
            height: "45px",
            alignItems: "center",
            backgroundColor: "#dff7fa",
          }}
        >
          <div
            style={{
              ...(open && { display: "none" }),
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
                  borderTopRightRadius: "50%",
                  borderBottomRightRadius: "50%",
                  position: "relative",
                  left: 10,
                }}
              />
            </IconButton>
          </div>
        </div>
        <div style={{borderRadius:"20px"}}> 
          <Messagesection
            adjustHeight={open ? `calc(100vh - 96px)` : "calc(100vh - 103px)"}
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
// import React from "react";
// import IconButton from "@mui/material/IconButton";
// import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
// import MessageSection from "../../views/Impex/ImpexComponents/Messagesection";

// const RightPane = ({ open, handleDrawerOpen }) => {
//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           height: "45px",
//           alignItems: "center",
//           backgroundColor: "#dff7fa",
//         //   border: "2px solid red",
//         }}
//       >
//         <div
//           style={{
//             ...(open && { display: "none" }),
//             borderTopRightRadius: "60%",
//             borderBottomRightRadius: "60%",
//             width: "max-content",
//             paddingRight: 10,
//           }}
//         >
//           <IconButton
//             color="red"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//           >
//             <ArrowCircleRightRoundedIcon
//               sx={{
//                 color: "#0d7e8a",
//                 fontSize: "2rem",
//                 borderTopRightRadius: "50%",
//                 borderBottomRightRadius: "50%",
//                 position: "relative",
//                 left: 10,
//               }}
//             />
//           </IconButton>
//         </div>
//       </div>
    
        


//     <div
//       style={{
//         height:{open ? "calc(100vh - 96px)" : "calc(100vh - 96px)"},
//         overflowY: "auto",
//         // border:"2px solid yellow"
//       }}


//     >
//       {/* <Box
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           backgroundColor: "#0d7e8a",
//         }}
//       >
//         <Box
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             padding: "0px 15px",
//             height: "40px",
//           }}
//         >
//           <Typography
//             style={{
//               display: "flex",
//               alignItems: "center",
//               color: "#fff",
//             }}
//           >
//             Message
//           </Typography>
//         </Box>
//       </Box>

//       <div
//         style={{
//           padding: "10px 10px",
//           textAlign: "justify",
//           overflowY: "auto",
//        //   border: "2px solid blue",
//           height: "calc(100vh - 200px)",
//           backgroundColor: "#cceaed",
//           borderRadius:"20px",
          
//           scrollbarWidth: "thin",
//           scrollbarColor: "#0d7e8a white",
//           scrollbarTrackColor: "#cceaed",
          
//           // Change border radius of the thumb
//           // "&::-webkit-scrollbar-thumb": {
//           //   borderRadius: "50px",
//           // },
//           // "&::-moz-scrollbar-thumb": {
//           //   borderRadius: "50px",
//           // },
//           // "&::-ms-scrollbar-thumb": {
//           //   borderRadius: "50px",
//           // },
//           "::-webkit-scrollbar-track": {
          
//             borderRadius:"50px",
//             // border:"2px solid red"
//           }

          
//         }}
//       >
//         <p className="scroll-demo">

//         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac felis ut dui fringilla rutrum. Sed ut bibendum nibh. Integer facilisis nibh in ex luctus, vitae sollicitudin justo congue. Quisque quis arcu ligula. Nunc tincidunt metus eget est bibendum, nec efficitur ligula varius. Integer auctor ante nec dolor hendrerit, vel laoreet ligula laoreet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras dapibus odio nec turpis efficitur tempus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam at vestibulum velit.

// Donec interdum velit nec metus scelerisque, quis congue velit tempor. Vivamus efficitur ligula sit amet sapien varius faucibus. Proin vehicula magna a lorem molestie, eu eleifend magna volutpat. Vivamus auctor leo velit, id mattis odio dapibus in. Nam tincidunt interdum nisi, id varius ex tristique eget. Fusce vestibulum lacus id urna mattis, eu sodales nulla feugiat. Sed eget sodales mauris. Fusce placerat orci eu nisl eleifend, sit amet venenatis mi volutpat.

// Nulla dictum lectus eget nunc rutrum bibendum. Integer sed enim ultricies, consequat odio vitae, mattis purus. Nullam at magna vel magna consequat vehicula. Cras quis augue tellus. Sed consequat felis non nunc varius, eu commodo urna molestie. Duis tempor eros ac enim interdum, nec gravida leo cursus. Suspendisse potenti. Maecenas tincidunt mi sed ipsum pharetra faucibus. In hac habitasse platea dictumst. Nulla sit amet sodales elit. Vivamus nec diam consectetur, posuere felis a, vulputate lorem. Suspendisse ultricies vitae ipsum ut vehicula. Maecenas id feugiat neque. Curabitur pulvinar neque id magna pulvinar ultricies. Sed eleifend ante ac leo dignissim, id eleifend metus tempor.

// Morbi mattis ipsum vitae risus ultricies, vitae ullamcorper urna ultricies. Integer pharetra augue vel turpis tempor, quis suscipit sapien tincidunt. Nulla facilisi. Integer eu libero a est bibendum molestie. Donec eu velit risus. In hac habitasse platea dictumst. Nullam quis nisi odio. Integer ultricies mauris ut ex laoreet eleifend. Maecenas convallis lorem a est ultricies, at sollicitudin arcu commodo. Suspendisse ullamcorper ex sit amet nulla dapibus, vitae faucibus justo volutpat. Phasellus non augue nec nisl consectetur cursus. Nullam finibus fermentum velit. Vivamus sodales dolor magna, a tincidunt libero aliquet ut. Phasellus quis tellus quis metus consequat mattis. Vivamus ut mauris eget justo laoreet fermentum.

// Sed condimentum nisl eu lacus gravida, ac gravida nibh sodales. Curabitur tincidunt mi nec justo scelerisque suscipit. Vestibulum ut ligula ut nisi hendrerit ultricies nec eu erat. Nullam consequat tincidunt nibh, ut tincidunt mi auctor nec. Proin nec dictum nisl. Aenean eget mi hendrerit, ultricies diam ac, feugiat lacus. In consectetur est non volutpat feugiat. Vivamus auctor, velit et tincidunt pharetra, sapien nisi porta purus, nec congue sem enim et magna. Maecenas vel lobortis neque. Integer consectetur velit non odio feugiat, id tempor tortor tincidunt. Donec at velit nec lorem consequat viverra. Vivamus fermentum libero a eros cursus, nec gravida eros cursus. Curabitur commodo purus eget quam iaculis aliquam. Donec eget elit mauris.

// Fusce nec ipsum in nisi suscipit hendrerit. Suspendisse sed tortor et neque dictum ullamcorper. Curabitur id luctus metus. Nullam et vehicula nunc, id fermentum magna. Proin interdum justo magna, eget feugiat libero rutrum et. Nam consequat justo eu magna scelerisque dictum. Mauris consequat quam ac nisi feugiat condimentum. Vivamus accumsan purus ut eros posuere, non tincidunt turpis volutpat. Nullam finibus dui at dapibus feugiat. Cras fermentum magna nec diam ullamcorper commodo. Vivamus sodales sagittis aliquet. Nam sit amet felis ligula. Sed commodo justo quis feugiat volutpat. Vivamus eget massa nec tortor facilisis vehicula. Integer sodales augue vel massa fermentum ullamcorper. Phasellus ut diam a nunc lacinia ultricies. Sed in ligula metus.

// Morbi fringilla scelerisque risus, non scelerisque lorem congue in. Nam sed velit quis est luctus tincidunt. Pellentesque sollicitudin lacus sit amet augue ultricies, eget vehicula risus placerat. Aenean consequat ullamcorper urna id blandit. Mauris nec diam vitae dolor vestibulum accumsan. Vivamus ut velit
//         ...

//         </p>
//       </div> */}
//     </div>
     
//     </>
//   );
// };

// export default RightPane;
