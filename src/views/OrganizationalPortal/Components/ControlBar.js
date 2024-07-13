import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import AddchartIcon from "@mui/icons-material/Addchart";
import HistoryIcon from "@mui/icons-material/History";
import Tooltip from "@mui/material/Tooltip";
import ArtifactDialog from "./ArtifactDialog";
import savealldark from "../../../Assets/Images/palegraysaveall.svg";
import savealldefault from "../../../Assets/Images/charcoalgraysaveall.svg";
import savedark from "../../../Assets/Images/palegraysave.svg";
import savedefault from "../../../Assets/Images/charcoalgraysave.svg";
import DefaultTheme from "../../../Themes/default_theme.module.css";
import DarkTheme from "../../../Themes/dark_theme.module.css";

const ControlBar = ({ onSelectArtifact, theme }) => {
  // Receive onSelectArtifact prop
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Stack
        direction="row"
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        spacing={0}
      >
        <Tooltip title="Add Artifact">
          <IconButton
            aria-label="Add artifact"
            onClick={() => handleOpenDialog(null)}
            sx={{
              "&:hover": {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(165,209, 73, 0.5)"
                    : "rgba(33,88, 164, 0.2)",
              },
            }}
          >
            <AddchartIcon
              fontSize="medium"
              className={`${
                theme === "default"
                  ? DefaultTheme.default_iconcolor
                  : theme === "dark"
                  ? DarkTheme.dark_iconcolor
                  : ''
              }`}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save">
          <IconButton
            aria-label="save"
            sx={{
              "&:hover": {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(165,209, 73, 0.5)"
                    : "rgba(33,88, 164, 0.2)",
              },
            }}
          >
            <img
              src={theme === "dark" ? savedark : savedefault}
              alt="save"
              style={{ width: 23, height: 23 }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save All">
          <IconButton
            aria-label="save all"
            sx={{
              "&:hover": {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(165,209, 73, 0.5)"
                    : "rgba(33,88, 164, 0.2)",
              },
            }}
          >
            <img
              src={theme === "dark" ? savealldark : savealldefault}
              alt="saveall"
              style={{ width: 23, height: 23 }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Previous Page">
          <IconButton
            aria-label="move left"
            sx={{
              "&:hover": {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(165,209, 73, 0.5)"
                    : "rgba(33,88, 164, 0.2)",
              },
            }}
          >
            <NavigateBeforeIcon
              fontSize="medium"
              className={`${
                theme === "default"
                  ? DefaultTheme.default_iconcolor
                  : theme === "dark"
                  ? DarkTheme.dark_iconcolor
                  : ''
              }`}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Next Page">
          <IconButton aria-label="move right" sx={{"&:hover":{backgroundColor:
              theme === "dark"
                ? "rgba(165,209, 73, 0.5)"
                : "rgba(33,88, 164, 0.2)"}
            }}>
            <NavigateNextIcon
              fontSize="medium"
              className={`${
                theme === "default"
                  ? DefaultTheme.default_iconcolor
                  : theme === "dark"
                  ? DarkTheme.dark_iconcolor
                  : ''
              }`}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="History">
          <IconButton aria-label="history" sx={{"&:hover":{backgroundColor:
              theme === "dark"
                ? "rgba(165,209, 73, 0.5)"
                : "rgba(33,88, 164, 0.2)"}
            }}>
            <HistoryIcon
              fontSize="medium "
              className={`${
                theme === "default"
                  ? DefaultTheme.default_iconcolor
                  : theme === "dark"
                  ? DarkTheme.dark_iconcolor
                  : ''
              }`}
            />
          </IconButton>
        </Tooltip>
      </Stack>
      <ArtifactDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSelectArtifact={onSelectArtifact}
        theme={theme}
      />
    </>
  );
};

export default ControlBar;
