import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { connect } from "react-redux";
import { Box, TextField, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function CustomTable(props) {
  const { theme } = props;
  const [searchText, setSearchText] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Filter rows based on search text
  const filteredRows = props.rows.filter((row) =>
    props.columns.some((col) => {
      const value = row[col.field];
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
      );
    })
  );

  const columns = props.columns.map((col) => ({
    ...col,
    sortable: true,
  }));

  return (
    <Box
      sx={{
        height: "70vh",
        width: "100%",
        ...props.TableMainDivHeight,
      }}
    >
      {/* Search field */}
      {!props.nosearch && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Stack direction="row" spacing={1}>
            <TextField
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search..."
              InputProps={{
                startAdornment: <SearchIcon color="disabled" />,
              }}
              sx={{
                "& .MuiInputBase-input": {
                  height: "100%",
                  padding: "8px",
                },
              }}
            />
            {props.children}
          </Stack>
        </Box>
      )}

      <Box
        sx={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          ...props.DataGridDivHeight,
        }}
      >
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={paginationModel.pageSize}
        page={paginationModel.page}
        onPageSizeChange={(newPageSize) =>
          setPaginationModel((prev) => ({ ...prev, pageSize: newPageSize }))
        }
        onPageChange={(newPage) =>
          setPaginationModel((prev) => ({ ...prev, page: newPage }))
        }
        pagination
        paginationMode="server"
        rowCount={filteredRows.length}
        rowsPerPageOptions={[5, 10, 25]}
        disableSelectionOnClick
        autoHeight
      />
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  language: state.language,
  theme: state.theme,
});

export default connect(mapStateToProps)(CustomTable);
