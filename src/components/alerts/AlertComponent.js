import React, { useState } from "react";
import { Box, Alert } from "@mui/material";

const AlertComponent = ({ message, severity,  duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  // Auto-hide the alert after the specified duration
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 1500,
      }}
    >
      <Alert severity={severity} onClose={() => setVisible(false)}>
        {message}
      </Alert>
    </Box>
  );
};

export default AlertComponent;
