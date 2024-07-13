import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import OrgDefaultTheme from "../OrganizationalPortal.default.module.css";
import OrgDarkTheme from "../OrganizationalPortal.dark.module.css";
import OrgLightTheme from "../OrganizationalPortal.light.module.css";

const Item = ({ type, onSelectArtifact }) => {
  let imageSource;
  switch (type) {
    case "Catalog":
      imageSource = require("../../../Assets/Images/catalog.png");
      break;
    case "Matrix":
      imageSource = require("../../../Assets/Images/matrix.png");
      break;
    case "Computation":
      imageSource = require("../../../Assets/Images/computation.png");
      break;
    case "Roadmap":
      imageSource = require("../../../Assets/Images/roadmap.png");
      break;
    case "Diagram":
      imageSource = require("../../../Assets/Images/diagram.png");
      break;
    case "Chart":
      imageSource = require("../../../Assets/Images/chart.png");
      break;
    case "Navigation":
      imageSource = require("../../../Assets/Images/navigation.png");
      break;
    case "Treemap":
      imageSource = require("../../../Assets/Images/treemap.png");
      break;
    default:
      imageSource = require("../../../Assets/Images/matrix.png").default; // Default image if type is not recognized
  }
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const handleItemClick = () => {
    onSelectArtifact(type);
    setShowSuccessAlert(true);

    // Hide the success alert after 5 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000); // Pass the selected artifact type to the parent component
  };

  return (
    <div
      onClick={handleItemClick}
      style={{ cursor: "pointer", textAlign: "center" }}
    >
      <div>
        <img
          src={imageSource}
          alt={type}
          style={{ width: "100%", height: "auto" }}
        />
        <span style={{ display: "block" }}>{type}</span>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSuccessAlert}
        autoHideDuration={1500}
        onClose={() => setShowSuccessAlert(false)}
      >
        <Alert severity="success">Artifact added successfully!</Alert>
      </Snackbar>
    </div>
  );
};

const AddArtifactDialog = ({ open, onClose, onSelectArtifact, theme }) => {
  // Receive onSelectArtifact prop
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        className={`${
          theme === "default"
            ? OrgDefaultTheme.Organization_ArtifactDialogTitle
            : theme === "light"
            ? OrgLightTheme.Organization_ArtifactDialogTitle
            : OrgDarkTheme.Organization_ArtifactDialogTitle
        }`}
        sx={{ padding: "6px", paddingLeft: "35px" }}
      >
        New Artifact
      </DialogTitle>
      <div
        className={`${
          theme === "default"
            ? OrgDefaultTheme.Organization_ArtifactDialogContent
            : theme === "light"
            ? OrgLightTheme.Organization_ArtifactDialogContent
            : OrgDarkTheme.Organization_ArtifactDialogContent
        }`}
      >
        <DialogContent sx={{ marginTop: "20px" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {[
                "Catalog",
                "Matrix",
                "Computation",
                "Roadmap",
                "Diagram",
                "Chart",
                "Navigation",
                "Treemap",
              ].map((type, index) => (
                <Grid item xs={2} sm={3} md={3} key={index}>
                  <Item type={type} onSelectArtifact={onSelectArtifact} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Back</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AddArtifactDialog;
