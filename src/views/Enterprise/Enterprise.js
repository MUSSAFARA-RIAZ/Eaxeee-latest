import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { connect } from "react-redux";
import LeftPane from "../Layout/Leftpane";
import RightPane from "../Layout/Rightpane";
// import Enterprise_iconsTab from "./Components/Enterprise_iconsTab";
import { UserTabs } from "./Components/Enterprise_iconsTab";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';

import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import { InputLabel } from "@mui/material";
import { EnterpriseContent } from "./Components/Enterprise_iconsTab";
import DropDownInputField from "./Components/DropDownInputField";



// import { faCubes } from '@fortawesome/free-solid-svg-icons';

const Enterprise = (props) => {
  console.log("props in enterprise", props)
  // const {language}=props;

  const [open, setOpen] = useState(true);
  // const [view, setView] = useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [value, setValue] = useState(0);


  const view = 0;




  const tabs = [
    { icon: <ViewInArOutlinedIcon /> },

    { icon: <DescriptionOutlinedIcon /> },
    // { icon: <LockIcon /> },
    { icon: <ShareOutlinedIcon /> },
    { icon: <DescriptionOutlinedIcon /> },
    { icon: <ViewInArOutlinedIcon /> },
    // { icon: <LockIcon /> },
    { icon: <ShareOutlinedIcon /> },
    { icon: <DescriptionOutlinedIcon /> },
    // { icon: <LockIcon /> },
    { icon: <ShareOutlinedIcon /> }
  ];
  const handleMainChange = (event, newValue) => {
    console.log("value", value)
    console.log("view", view)
    setValue(newValue);


  };



  console.log("props enterprise ", props.subpage);


  useEffect(() => {

  }, [props.subpage])
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />

      {

        (props.subPage === "architecture") ?

          <>
            <LeftPane open={open} onClose={handleDrawerClose} props={props}>
              <div>
                <UserTabs value={value} handleChange={handleMainChange} tabs={tabs} language={props.language} theme={props.theme} onClick={()=>props.settree("tree1")} />


              </div>

              <div>

                <DropDownInputField props={props} />
              </div>
              <div>

                {view === 0 && <EnterpriseContent value={value} language={props.language} />}

              </div>


            </LeftPane>
            <RightPane open={open} props={props} handleDrawerOpen={handleDrawerOpen}>

              <div>




              </div>
              <div>

                {/* asdsadas

                {"activeTab" === "tree1" &&
                  <div>
                    activeTab.clikedItem

                    {

                    }
                  </div>
                } */}

              </div>
            </RightPane>
          </> :
          <>
            QuickAccess module
          </>
      }
    </Box>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
  theme: state.theme,
  subPage: state.subPage
});

const mapDispatchToProps = (dispatch) => ({
  setLanguage: (lang) =>
    dispatch({
      type: "TOGGLELANG",
      value: lang === "en" ? "ar" : "en",
    }),
  setTheme: (theme) =>
    dispatch({
      type: "UPDATETHEME",
      value: theme,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Enterprise);
