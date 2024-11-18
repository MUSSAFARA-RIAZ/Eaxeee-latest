

import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { connect } from "react-redux";
import { Tooltip, Box, TextField, IconButton, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import AutorenewIcon from "@mui/icons-material/Autorenew";



function CustomTable(props) {
  console.log("props in custom table=>", props);
  
  const currentLang = props.language;
  const theme = props.theme; // Access the theme
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

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
    const selectedRowObjects = newSelection.map((id) =>
      props.rows.find((row) => row.id === id)
    );
    setSelectedRows(selectedRowObjects);
    if (props.onSelectionChange) {
      props.onSelectionChange(selectedRowObjects);
    }
  };

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel); // Update pagination state when user changes page or pageSize
  };

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
      {!props.nosearch && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
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
                  <DeleteIcon style={{ color: "deleteIcon.main" }} />
                </Tooltip>
              </IconButton>
            )}
          </Stack>
        </Box>
      )}
      <Box
        sx={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          overflowX: "hidden",

          "& ::-webkit-scrollbar": {
            position: "absolute",
            width: "8px",
            [currentLang === 'ar' ? 'right' : 'left']: '0', // Scrollbar position based on language
          },
        

          [currentLang === 'ar' ? '& .MuiDataGrid-scrollbar' : '']: {
            '&.MuiDataGrid-scrollbar--vertical': {

              left: 0, // Move scrollbar to the left for RTL
              right: 'unset', // Unset the right property
            },
          },

          ...props.DataGridDivHeight,
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
          onRowSelectionModelChange={(newSelection) =>
            handleSelectionChange(newSelection)
          }
       
          pagination
          pageSizeOptions={[5, 10, 25]}
          paginationModel={paginationModel}
         


          sx={{

            "& .MuiDataGrid-overlay": {
              backgroundColor: 'transparent',
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-footerContainer": {
              display: props.disablePagination ? "none" : "flex",
              direction: currentLang === 'ar' ? 'rtl' : 'ltr',
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-cell": {
              // color: theme.palette.tableTextColor.main,
              // border: "2px solid blue",
              textAlign: currentLang === 'ar' ? 'right' : 'left',

            },
            "& .MuiDataGrid-columnHeaders": {
              position: "sticky",
              top: 0,
              zIndex: 2,
              direction: currentLang === 'ar' ? 'rtl' : 'ltr',
            },
            "& .MuiDataGrid-container--top [role='row']": {
              // backgroundColor: theme.palette.columnHeaderColor.main,
              // color: theme.palette.tableTextColor.main,
            },
            "& .MuiTablePagination-root": {
              // color: theme.palette.paginationaction.main,
              direction: currentLang === 'ar' ? 'rtl' : 'ltr',
            },
            "& .MuiButtonBase-root .css-i4bv87-MuiSvgIcon-root": {
              rotate: currentLang === 'ar' ? "180deg" : "0deg",
            },
            "& .MuiCheckbox-root": {
              // color: theme.palette.checkboxColormain.main,
              rotate: currentLang === 'ar' ? "0deg" : "0deg",

            },
            "& .MuiCheckbox-root.Mui-checked": {
              // color: theme.palette.checkboxCheckedColor.main,
              rotate: currentLang === 'ar' ? "0deg" : "0deg",


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