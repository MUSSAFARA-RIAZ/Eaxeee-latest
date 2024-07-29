import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { connect } from "react-redux";
import { Box } from "@mui/system";

function CustomTable(props) {
  return (
    <Box
      sx={{
        height: "80vh",
        width: "100%",
        overflowY: "auto",
        "& ::-webkit-scrollbar": {
          width: "10px",
        },
        "& ::-webkit-scrollbar-track": {
          background:
            props.theme === "default"
              ? "#cecece"
              : props.theme === "light"
              ? "#eff3f7"
              : "#212121",
          borderRadius: "10px",
        },
        "& ::-webkit-scrollbar-thumb": {
          background:
            props.theme === "default"
              ? "#2158a4"
              : props.theme === "light"
              ? "#cbd0d7"
              : "#393a3a",
          borderRadius: "10px",
        },
      }}
    >
      <DataGrid
        sx={{
          width: "100%",
          height: "100%",
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
        }}
        rows={props.rows}
        columns={props.columns}
        pageSize={props.rowsPerPage}
        rowsPerPageOptions={[props.rowsPerPage]}
        checkboxSelection={props.checkBoxSelection}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: false }}
        loading={false}
        density="standard" // "comfortable" // "compact"
        disableColumnSelector={true}
        disableColumnMenu={false}
        disableExtendRowFullWidth={true}
        AutoGenerateColumns={true}
      />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomTable);
