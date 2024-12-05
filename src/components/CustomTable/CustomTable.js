import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { connect } from "react-redux";
import { Tooltip, Box, TextField, IconButton, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AdminTranslation from "../../Utils/AdminTranslation/AdminTranslation";

function CustomTable(props) {
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // const handleDeleteClick = () => {
  //   setSelectedRows([]);
  // };
  const filteredRows = props.rows.filter((row) =>
    props.columns.some((col) => {
      const value = row[col.field];
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
      );
    })
  );

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
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
  };

  return (
    <Box
      sx={{
        height: props.height ? "75vh" : "80vh",
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
              placeholder={props.language === "en" ? "Search..." : AdminTranslation["Search..."]}
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
                onClick={props.onDeleteClick}
                disabled={props.deleteButtonDisabled} // Control enabled/disabled from the parent
            >
              <Tooltip
                title={
                  props.deleteButtonDisabled
                    ? "No rows selected"
                    : "Delete selected rows"
                }
              >
                <DeleteIcon
                  style={{
                    color:
                      props.deleteButtonDisabled
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
          height: props.height ? "68vh" : "calc(80vh - 100px)", 
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
          // Show all rows if pagination is disabled
          sx={{
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-overlay": {
              backgroundColor: 'transparent',
            },
            "& .MuiButtonBase-root .css-i4bv87-MuiSvgIcon-root": {
              rotate: props.language === 'ar' ? "180deg" : "0deg",
            },
            "& .MuiCheckbox-root.Mui-checked": {
              color: props.theme === "default" ? "#2158a4" : "#a5d149",
              rotate: props.language === 'ar' ? "0deg" : "0deg",


            },
            // border:"2px solid red",
            color:props.theme==="dark"?"#cecece":"#000000DE",
          


          }}
          localeText={{
            // Determine locale based on currentLang
            ...(props.language === 'ar' ? {
              // Arabic translations
              MuiTablePagination: {
                labelRowsPerPage: "عدد الصفوف في الصفحة:",
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from}-${to} من ${count !== -1 ? count : `أكثر من ${to}`}`,
                toolbarDensity: 'Density', // Add translation for density
                noRowsLabel: 'No rows', // Add translation for no rows
              },
              footerRowSelected: (count) =>
                `${count} ${count === 1 ? 'صف' : 'صفوف'} محددة`,
            } : {
              // English translations
              MuiTablePagination: {
                labelRowsPerPage: "Rows per page:",
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`,
              },
              footerRowSelected: (count) =>
                `${count} row${count !== 1 ? 's' : ''} selected`,
            }),
            // Additional common properties can be added here if necessary
          }}

          pageSize={paginationModel.pageSize} // Bind pagination state
          page={paginationModel.page} // Bind pagination state
          onPageSizeChange={(newPageSize) =>
            setPaginationModel((prev) => ({ ...prev, pageSize: newPageSize, page: 0 }))
          }
          onPageChange={(newPage) =>
            setPaginationModel((prev) => ({ ...prev, page: newPage }))
          }
          pagination
          paginationMode="client"
          rowCount={filteredRows.length} // Total count of filtered rows
          rowsPerPageOptions={[5, 10, 25]}
          disableSelectionOnClick
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