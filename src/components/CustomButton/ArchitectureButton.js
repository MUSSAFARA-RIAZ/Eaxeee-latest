import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/system";
import darktheme from "../../Themes/dark_theme.module.css";
import lighttheme from "../../Themes/light_theme.module.css";
import defaulttheme from "../../Themes/default_theme.module.css";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  "& .MuiTooltip-tooltip": {},
}));

const ArchitectureButton = React.forwardRef((props, ref) => {
  const {
    title,
    Theme,
    tooltipTitle,
    onClick,
    loading,
    type,
    disabled,
    fullWidth,
    loaderSize,
    loaderColor,
    loaderThickness,
    bgcolor,
    buttonTitleColor,
    startIcon,
    buttonBorderColor,
  } = props;

  const tooltipContent = tooltipTitle; // Use tooltip content if available

  return (
    <Box>
      <LightTooltip title={tooltipContent}>
        <Button
          onClick={onClick}
          type={type}
          disabled={loading || disabled}
          fullWidth={fullWidth}
          ref={ref}
          className={`${Theme === "default"
            ? defaulttheme.default_themebtntextcolor
            : Theme === "dark"
              ? darktheme.dark_themebtntextcolor
              : lighttheme.light_themebtntextcolor
            }`}
          sx={{
            color: buttonTitleColor,
            display: "flex",
            flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center",
            padding: "7px",
            width: "auto", 
            height: "58px", 
            textTransform: "capitalize",
            borderRadius: "8px",
            backgroundColor: "transparent",
            '&:hover': {
              textTransform:"none",
              transition:"none",
             
              backgroundColor: 'transparent',  
            },
          

            fontSize: "8.5px",

          }}
        >
          {loading ? (
            <CircularProgress
              size={loaderSize}
              color={loaderColor}
              thickness={loaderThickness}
            />
          ) : (
            <>
              {startIcon && (
                <>
                <Box
                  sx={{
                    flex: "0 0 80%", 
                    display: "flex",
                    justifyContent: "center",
                    alignItems:"center",
                    

                    "&:hover": {
                    
                      backgroundColor: "transparent",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: buttonBorderColor,
                      padding: "3px",
                      width: "50px",
                      height: "50px",
                      borderRadius: "8px",
                      textTransform:"none",
                     

                      
                    },
                  }}
                >
                  {startIcon}
                </Box>
                <Box
                sx={{
                
                  textAlign: "center",
                 
                 
                }}
              >
                {title}
              </Box>
              </>
              )}
              
            </>
          )}
        </Button>
      </LightTooltip>
    </Box>
  );
});

export default ArchitectureButton;
