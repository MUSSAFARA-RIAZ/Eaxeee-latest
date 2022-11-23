import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { connect } from 'react-redux';
import { Box } from '@mui/system';


function CustomTable(props) {

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                sx={{
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                        // color: 'primary.main',
                    },
                    '& .MuiDataGrid-cell:focus-within': {
                        outline: 'none !important'
                    },
                    // border:'1px solid gray',
                    border: 'none',
                    width: '100%'
                }}
                rows={props.rows}
                columns={props.columns}
                pageSize={props.rowsPerPage}
                rowsPerPageOptions={[props.rowsPerPage]}
                checkboxSelection={false}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: false }}
                loading={false}
                density="standard" //"comfortable" //"compact"
                disableColumnSelector={true}
                disableColumnMenu={false}
                disableExtendRowFullWidth={true}
                AutoGenerateColumns={true}

            />
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        language: state.language,
        theme: state.theme
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: (lang) => {
            return dispatch({
                type: "TOGGLELANG",
                value: (lang === 'en') ? 'ar' : "en"
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomTable);

