import React, { useState,useEffect } from 'react';
import { Box } from '@mui/material';
import { connect } from 'react-redux';
import styles from './UserManagement.module.css';
import CustomTable from '../../../components/CustomTable/CustomTable';
import CustomButton from '../../../components/CustomButton/CustomButton';
import ModalAddLayer from './Modals/ModalAddLayer';
import { useDispatch, useSelector } from 'react-redux';

const LayerRegistration = (props) => {
    const { language, theme } = props;
    const dispatch = useDispatch();
    const layers = useSelector((state) => state.layers);
    console.log("layerss=>",layers);




    const [openModal, setOpenModal] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]); // Tracks selected rows
    const [selectedRowData, setSelectedRowData] = useState(null); // Store the data of the selected row for editing
    const [tableRowData, setTableRowData] = useState(layers); // Use Redux state

    // const [tableRowData, setTableRowData] = useState([
    //     { id: 1, layername: "Architecture", layernotation: "A", layercolor: "Red", parentlayer: "None" },
    //     { id: 2, layername: "as", layernotation: "f", layercolor: "Blue", parentlayer: "Architecture" },
    //     { id: 3, layername: "Mussafara", layernotation: "s", layercolor: "Black", parentlayer: "None" },
    //     { id: 4, layername: "Mark", layernotation: "s", layercolor: "Black", parentlayer: "None" },
    //     { id: 5, layername: "Ben", layernotation: "s", layercolor: "Black", parentlayer: "None" },
    //     { id: 6, layername: "Liu", layernotation: "s", layercolor: "Black", parentlayer: "None" },
    //     { id: 7, layername: "Cal", layernotation: "s", layercolor: "Black", parentlayer: "None" },
    //     { id: 8, layername: "michalea", layernotation: "s", layercolor: "Black", parentlayer: "None" },
    //     { id: 9, layername: "pearson", layernotation: "s", layercolor: "Black", parentlayer: "None" },
    // ]);

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedRowData(null); // Reset selected row data when closing the modal
    };

    const handleAddUserClick = () => {
        setOpenModal(true);
    };

    const handleDeleteClick = () => {
        if (selectedRows.length === 0) return;
        const updatedData = tableRowData.filter(row => !selectedRows.includes(row.id));
        setTableRowData(updatedData);
        setSelectedRows([]);
    };

    const handleEditClick = () => {
        if (selectedRows.length === 0) return;
        const rowData = tableRowData.find(row => row.id === selectedRows[0]); 
        setSelectedRowData(rowData); 
        setOpenModal(true); 
    };

    const handleUserAdded = (newLayer) => {
        let updatedData;
        if (selectedRowData) {
            updatedData = layers.map((row) => (row.id === selectedRowData.id ? newLayer : row));
        } else {
            updatedData = [...layers, newLayer];
        }
        dispatch({ type: 'SET_LAYERS', payload: updatedData });
        setSelectedRows([]);
        setOpenModal(false);
    };
    useEffect(() => {
        setTableRowData(layers);
    }, [layers]);
    
    

    const columns = [
        { field: 'layername', headerName: (language === 'en' ? 'Layer Name' : 'Layer Name'), flex: 1 },
        { field: 'layernotation', headerName: (language === 'en' ? 'Layer Notation' : 'Layer Notation'), flex: 1 },
        { 
            field: 'layercolor', 
            headerName: (language === 'en' ? 'Layer Color' : 'Layer Color'), 
            flex: 1,
            renderCell: (params) => (
                <Box 
                    sx={{
                        width: '40%',
                        height: '20px',
                        backgroundColor: params.value,
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }} 
                    title={params.value}
                />
            ),
        },
        { field: 'parentlayer', headerName: (language === 'en' ? 'Parent Layer' : 'Parent Layer'), flex: 1 },
    ];

    return (
        <Box className={styles.userRegistrationMain}>
            <ModalAddLayer 
                open={openModal} 
                handleClose={handleCloseModal} 
                onUserAdded={handleUserAdded} 
                selectedRowData={selectedRowData} // Pass selected data to modal
            />

            <Box className={`${styles.userRegistrationTableDiv}`}>
                <CustomTable
                    rows={tableRowData}
                    columns={columns}
                    onDeleteClick={handleDeleteClick}
                    showDeleteButton={true}
                    onSelectionChange={setSelectedRows}
                    Theme={theme}
                    checkboxSelection={true}
                    deleteButtonDisabled={selectedRows.length === 0}
                >
                    <Box sx={{
                        display: "flex", justifyContent: "space-between", alignItems: "space-between", width: "350px", ...(language === 'ar' && {
                            display: "flex", width: "300px", justifyContent: "space-between", position: "relative", right: "10px"
                        })
                    }}>
                        <CustomButton
                            title={language === 'en' ? "Add Layer" : "Add Layer"}
                            variant='outlined'
                            onClick={handleAddUserClick}
                            fullWidth={true}
                            Theme={props.theme}
                        />
                        <CustomButton
                            title={language === 'en' ? 'Edit Layer' : 'Edit Layer'}
                            variant="outlined"
                            onClick={handleEditClick} // Edit logic
                            fullWidth={true}
                            disabled={selectedRows.length === 0}
                            Theme={props.theme}
                        />
                        <CustomButton
                            title={language === 'en' ? 'Delete' : 'Delete'}
                            variant="outlined"
                            onClick={handleDeleteClick}
                            fullWidth={true}
                            disabled={selectedRows.length === 0}
                            Theme={theme}
                        />
                    </Box>
                </CustomTable>
            </Box>
        </Box>
    );
};
const mapDispatchToProps = (dispatch) => {
    return {
      setLanguage: (lang) => dispatch({ type: "TOGGLELANG", value: lang === "en" ? "ar" : "en" }),
      setTheme: (theme) => dispatch({ type: "UPDATETHEME", value: theme }),
      setRoute: (route) => dispatch({ type: "UPDATEROUTE", value: route }),
      setActivePage: (pageName) => dispatch({ type: "SETACTIVEPAGE", value: pageName }),
      setSubPage: (subpage) => dispatch({ type: "SETSUBPAGE", value: subpage }),
      setActiveTree: (activeTree) => dispatch({ type: "ACTIVETREE", value: activeTree }),
      setActiveTable: (activeTable) => dispatch({ type: "ACTIVETABLE", value: activeTable }),

    //     case 'SET_LAYERS':
    // return { ...state, layers: action.payload };

  
    };
  };
  

const mapStateToProps = (state) => {
    return {
        language: state.language,
        theme: state.theme,
        layers:state.layer,
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(LayerRegistration);
