import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { connect } from "react-redux";
import { Tooltip, Box, TextField, IconButton, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import AutorenewIcon from "@mui/icons-material/Autorenew";

function CustomTable(props) {
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleDeleteClick = () => {
    setSelectedRows([]);
  };

  const handleRestoreIconButton = () => {
    setSelectedRows([]);
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
    if (props.onSelectionChange) {
      props.onSelectionChange(newSelection);
    }
  };

  const columns = props.columns.map((col) => ({
    ...col,
    sortable: true,
  }));

  return (
    <Box
      sx={{
        height: "80vh",
        width: "100%",
        ...props.TableMainDivHeight,
      }}
    >
      {!props.nosearch && ( // Conditionally render search bar based on props.nosearch
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            top: 0,
            zIndex: 1,
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
          <Stack
            direction="row"
            spacing={1}
            sx={{ flex: 1, justifyContent: "flex-end" }}
          >
            {props.showRestoreButton && (
              <IconButton
                onClick={handleRestoreIconButton}
                disabled={selectedRows.length === 0}
              >
                <AutorenewIcon
                  style={{
                    color:
                      selectedRows.length === 0
                        ? "#a5b7b9"
                        : props.theme === "default"
                        ? "#2158a4"
                        : props.theme === "light"
                        ? "#4A4A4A"
                        : "#a5d149",
                  }}
                />
              </IconButton>
            )}
            {props.showDeleteButton && (
              <IconButton
                onClick={handleDeleteClick}
                disabled={selectedRows.length === 0}
              >
                <Tooltip
                  title={
                    selectedRows.length === 0
                      ? "No rows selected"
                      : "Delete selected rows"
                  }
                >
                  <DeleteIcon
                    style={{
                      color:
                        selectedRows.length === 0
                          ? "#a5b7b9"
                          : props.theme === "default"
                          ? "#2158a4"
                          : props.theme === "light"
                          ? "#4A4A4A"
                          : "#a5d149",
                    }}
                  />
                </Tooltip>
              </IconButton>
            )}
          </Stack>
        </Box>
      )}
      <Box
        sx={{
          height: "calc(80vh - 48px)", // Subtracting the height of the search and delete button container
          width: "100%",
          overflowY: "auto",
          "& ::-webkit-scrollbar": {
            width: "8px",
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
                : "#a5d149",
            borderRadius: "10px",
          },
          ...props.DataGridDivHeight, // Merge custom styles
        }}
      >
        <DataGrid
          {...props}
          rows={props.rows.filter((row) =>
            columns.some((col) => {
              const value = row[col.field];
              return (
                typeof value === "string" &&
                value.toLowerCase().includes(searchText.toLowerCase())
              );
            })
          )}
          columns={columns}
          checkboxSelection={props.checkboxSelection}
          onSelectionModelChange={(newSelection) =>
            handleSelectionChange(newSelection)
          }
          pagination={!props.disablePagination}
          pageSize={props.disablePagination ? props.rows.length : 10} // Show all rows if pagination is disabled
          sx={{
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-footerContainer": {
              display: props.disablePagination ? 'none' : 'flex', 
            },
          }}
        />
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(CustomTable);
