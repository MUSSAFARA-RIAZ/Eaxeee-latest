import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { connect } from "react-redux";
import { Box, TextField, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function CustomTable(props) {
  const { theme } = props;
  const currentLang = props.language;

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

  // Calculate rows to display for the current page
  const startIndex = paginationModel.page * paginationModel.pageSize;
  const currentPageRows = filteredRows.slice(
    startIndex,
    startIndex + paginationModel.pageSize
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
          width: "100%",
          // border: "2px solid red",
          height: "100%", // Set the height of the box containing the DataGrid
          overflowY: "auto", // Enable vertical scrolling
          "& ::-webkit-scrollbar": {
            position: "absolute",
            width: "8px",
            [currentLang === 'ar' ? 'right' : 'left']: '0', // Scrollbar position based on language
          },
          "& ::-webkit-scrollbar-track": {
            backgroundColor: props.theme === 'default' ? '#cecece' : '#212121',
            borderRadius: "10px",
          },
          "& ::-webkit-scrollbar-thumb": {
            backgroundColor: props.theme === 'default' ? '#2158a4' : '#a5d149',
            borderRadius: "10px",
          },
          [currentLang === 'ar' ? '& .MuiDataGrid-scrollbar' : '']: {
            '&.MuiDataGrid-scrollbar--vertical': {
              left: 0, // Move scrollbar to the left for RTL
              right: 'unset', // Unset the right property
            },
          },
        }}
      >
        <DataGrid
          rows={currentPageRows} // Use rows for the current page
          columns={columns}
          pageSize={paginationModel.pageSize}
          page={paginationModel.page}
          onPageSizeChange={(newPageSize) =>
            setPaginationModel((prev) => ({ ...prev, pageSize: newPageSize, page: 0 })) // Reset to page 0
          }
          onPageChange={(newPage) =>
            setPaginationModel((prev) => ({ ...prev, page: newPage }))
          }
          pagination
          paginationMode="client" // Change to client for local pagination
          rowCount={filteredRows.length} // Total count of filtered rows
          rowsPerPageOptions={[5, 10, 25]}
          disableSelectionOnClick
          autoHeight={false} // Set autoHeight to false to maintain a fixed height
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
