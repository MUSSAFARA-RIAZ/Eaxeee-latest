import * as React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import { styled } from "@mui/system";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  "& .MuiTooltip-tooltip": {
    backgroundColor: theme.palette.common.white,
    color: '#FFA500',
    boxShadow: theme.shadows[2],
  
    fontSize: 14,
    padding: "8px", 
    margin: "4px", 
  },
}));

const Impexbtn = React.forwardRef((props, ref) => {
  const { btntitle, starticon, tooltipTitle } = props;

  return (
    <LightTooltip title={tooltipTitle}>
      <Button
        ref={ref}
        component="label"
        variant="outlined"
        sx={{
          border: "1.2px solid #0D7E8A",
          color: "#0D7E8A",
          width:"100%",
       //   width: 200,
          "&:hover": {
            borderColor: "#0D7E8A",
            // Change border color on hover
          },
          marginBottom: "10px",
          marginTop: "10px"
        }}
        startIcon={starticon}
      >
        {btntitle}
      </Button>
    </LightTooltip>
  );
});

export default Impexbtn;
