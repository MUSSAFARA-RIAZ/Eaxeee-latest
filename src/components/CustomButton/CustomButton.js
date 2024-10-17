import React from "react";
// import PropTypes from 'prop-types';
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
// import "./CustomButton.module.css"; // If you intend to use CSS modules, apply them to your JSX elements
import darktheme from "../../Themes/dark_theme.module.css";
import lighttheme from "../../Themes/light_theme.module.css";
import defaulttheme from "../../Themes/default_theme.module.css";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/system";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  "& .MuiTooltip-tooltip": {
    // backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[2],
    fontSize: 14,
    padding: "8px",
    margin: "4px",
  },
}));

const CustomButton = React.forwardRef((props, ref) => {
  const {
    title,
    Theme,
    tooltipTitle,
    variant,
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

  return (
    <Box>
      <LightTooltip title={tooltipTitle}>
        <Button
          variant="outlined"
          onClick={onClick}
          type={type}
          disabled={loading || disabled}
          fullWidth={fullWidth}
          ref={ref}
          className={`${
            Theme === "default"
              ? defaulttheme.default_themebtntextcolor
              : Theme === "dark"
              ? darktheme.dark_themebtntextcolor
              : lighttheme.light_themebtntextcolor
          } ${
            Theme === "default"
              ? defaulttheme.default_themebtnbordercolor
              : Theme === "dark"
              ?  darktheme.dark_themebtnbordercolor
              : lighttheme.light_themebtnbordercolor
              
          }`}
          sx={{
            borderColor: buttonBorderColor,
            color: buttonTitleColor,
            display: "flex",
            // flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            // gap: "10px",
            // alignItems: "center",
            minHeight: "unset",
            backgroundColor: bgcolor,
            
            
            "&:hover": {
                backgroundColor:
                  Theme === "dark"
                    ? "rgba(165,209, 73, 0.5)"
                    : "rgba(33,88, 164, 0.2)",
              },
          }}
          startIcon={startIcon}
        >
          {loading ? (
            <CircularProgress
              size={loaderSize}
              color={loaderColor}
              thickness={loaderThickness}
            />
          ) : (
            title
          )}
        </Button>
      </LightTooltip>
    </Box>
  );
});
export default CustomButton;
