import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FileItem = ({ fileName }) => {
  const [anchorEl, setAnchorEl] = useState(null); // For menu
  const [dialogOpen, setDialogOpen] = useState(false); // For dialog
  const [uploadedFile, setUploadedFile] = useState(null); // Uploaded file

  // Handle menu open
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle dialog open
  const handleDialogOpen = () => {
    setDialogOpen(true);
    handleMenuClose(); // Close the menu when opening the dialog
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/xml') {
      setUploadedFile(file);
    } else {
      alert('Please select a valid XML file.');
    }
  };

  // Handle file submission
  const handleAddFile = () => {
    if (uploadedFile) {
      alert(`File "${uploadedFile.name}" uploaded successfully!`);
    } else {
      alert('Please select a file to upload.');
    }
    setDialogOpen(false);
  };

  return (
    <div>
      {/* File name displayed as a clickable text */}
      <Typography
        onClick={handleMenuClick}
        style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        {fileName}
      </Typography>

      {/* Material-UI Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleDialogOpen}>Open</MenuItem>
        <MenuItem onClick={() => alert('Save action triggered')}>Save</MenuItem>
        <MenuItem onClick={() => alert('Delete action triggered')}>Delete</MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="dialog-title">
        <DialogTitle
          id="dialog-title"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography variant="h6">Upload File</Typography>
          <IconButton onClick={handleDialogClose} aria-label="Close dialog">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <TextField
            label="Folder name"
            fullWidth
            variant="outlined"
            size="small"
            sx={{ mt: 2 }}
            placeholder="Enter folder name"
          />
          <Box sx={{ mt: 2 }}>
            {/* Restrict file input to XML files */}
            <input type="file" accept=".xml" onChange={handleFileChange} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleAddFile}>
              Add
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleDialogClose}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileItem;
