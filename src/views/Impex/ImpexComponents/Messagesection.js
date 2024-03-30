import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

export default function Messagesection(props) {
  return (
    <div
      style={{
        backgroundColor:" #cceaed",
        // border: "4px solid black",
        // borderRadius: "20px",
        // Set height to auto to adjust according to content
        height: props.adjustHeight // Optionally set maxHeight for limiting height
      }}
    >
      {/* <Box
        style={{
          display: "flex",
          flexDirection: "row",
          border: "2px solid purple",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0px 15px",
            height: "40px",
          }}
        >
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
            }}
          >
            Message
          </Typography>
        </Box>
      </Box>

      <div
        style={{
          padding: "10px 10px",
          textAlign: "justify",
          overflowY: "auto",
          border: "2px solid blue",
          backgroundColor: "#cceaed",
          scrollbarWidth: "thin",
          scrollbarColor: "#36454f #eff3f7",
          scrollbarTrackColor: "#cceaed",
          "&::-webkit-scrollbar": {
            width: "8px",
            backgroundColor: "#eff3f7",
            borderRadius: "30px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#36454f",
            borderRadius: "30px",
          },
        }}
      >
        {/* Your content goes here */}
      {/* </div>  */}
    </div>
  );
}
