import React, { useState } from 'react';
import { Box } from '@mui/material';
import { connect } from 'react-redux';
import styles from './UserManagement.module.css';
import CustomTable from '../../../components/CustomTable/CustomTable';
import CustomButton from '../../../components/CustomButton/CustomButton';
// import ModalAddLayer from './Modals/ModalAddElement';
import ModalAddElement from './Modals/ModalAddElement';
import { useSelector } from 'react-redux';
import GreenEaxee from "../../../Assets/Images/ModalEaxeeLogo.png";
// import GreenEaxeeLogo from "../../../../Assets/Images/ModalEaxeeLogo.png";
import Crop75Icon from '@mui/icons-material/Crop75';

const ElementRegistration = (props) => {
    const { language, theme } = props;
    const layers = useSelector((state) => state.layers);
    console.log("layers in element registration===> redux ", layers);


    const [openModal, setOpenModal] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]); // Tracks selected rows
    const [selectedRowData, setSelectedRowData] = useState(null); // Store the data of the selected row for editing
    const [tableRowData, setTableRowData] = useState([
        {
            id: 1,
            ElementName: "Information System Service",
            ConceptType: "Element",
            ElementLayer: "Application Architecture",
            ElementColor: "#87CEEB", // Light Blue
            ElementNotation: "A",
            ElementIcon: "★",
            ElementShape: "Square",
            Description: "To be provided later",
            Originator: "EAXEE",
            isEnabled: "YES",
            isLocked: "NO",
            LockedBy: "N/A",
            isHidden: "NO",
            HiddenBy: "N/A"
        },
        {
            id: 2,
            ElementName: "Logical Application Component",
            ConceptType: "Element",
            ElementLayer: "Application Architecture",
            ElementColor: "#87CEEB", // Light Blue
            ElementNotation: "B",
            ElementIcon: "☐",
            ElementShape: "Square",
            Description: "To be provided later",
            Originator: "EAXEE",
            isEnabled: "YES",
            isLocked: "NO",
            LockedBy: "N/A",
            isHidden: "NO",
            HiddenBy: "N/A"
        },

        // Continue similarly for all rows as per the provided table
    ]);


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
        if (selectedRowData) {

            const updatedData = tableRowData.map(row =>
                row.id === selectedRowData.id ? newLayer : row
            );
            setTableRowData(updatedData);
        } else {

            setTableRowData((prevData) => [...prevData, newLayer]);
        }
        setSelectedRows([]);
        setOpenModal(false);
    };


    const columns = [
        { field: 'ElementName', headerName: (language === 'en' ? 'Element Name' : 'Element Name'), flex: 1 },
        { field: 'ConceptType', headerName: (language === 'en' ? 'Concept Type' : 'Concept Type'), flex: 1 },


        { field: 'ElementLayer', headerName: (language === 'en' ? 'Element Layer' : 'Element  Layer'), flex: 1 },
        {
            field: 'ElementColor',
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
        { field: 'ElementNotation', headerName: (language === 'en' ? 'Element Notation' : 'Element Notation'), flex: 1 },
        {
            field: 'ElementIcon',
            headerName: 'Element Icon',
            flex: 1,
            renderCell: (params) => {
                if (params.value === "Crop75Icon") {
                    return <Crop75Icon />;
                }
                
                return params.value; // Text-based icon like "★"
            },
        },
        {
            field: 'ElementShape',
            headerName: 'Element Shape',
            flex: 1,
            renderCell: (params) => {
              switch (params.value) {
                case "GreenEaxee":
                  return (
                    <img
                      src={GreenEaxee}
                      alt="GreenEaxee"
                      width="20"
                      height="20"
                    />
                  );
                case "Crop75Icon":
                  return <Crop75Icon />;
                default:
                  return params.value; // Fallback for text-based shapes
              }
            },
          },
          
        
        { field: 'Description', headerName: (language === 'en' ? 'Description' : 'Description'), flex: 1 },
        { field: 'Originator', headerName: (language === 'en' ? 'Originator' : 'Originator'), flex: 1 },
        { field: 'isEnabled', headerName: (language === 'en' ? 'isEnabled?' : 'isEnabled?'), flex: 1 },
        { field: 'isLocked', headerName: (language === 'en' ? 'isLocked?' : 'isLocked?'), flex: 1 },
        { field: 'LockedBy', headerName: (language === 'en' ? 'Locked By' : 'Locked By'), flex: 1 },
        { field: 'isHidden', headerName: (language === 'en' ? 'isHidden?' : 'isHidden?'), flex: 1 },
        { field: 'HiddenBy', headerName: (language === 'en' ? 'Hidden By' : 'Hidden By'), flex: 1 },




    ];

    return (
        <Box className={styles.userRegistrationMain}>
            <ModalAddElement
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
                    showDeleteButton={false}
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
                            title={language === 'en' ? "Add Element" : "Add Element"}
                            variant='outlined'
                            onClick={handleAddUserClick}
                            fullWidth={true}
                            Theme={props.theme}
                        />
                        <CustomButton
                            title={language === 'en' ? 'Edit Element' : 'Edit Element'}
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

const mapStateToProps = (state) => {
    return {
        language: state.language,
        theme: state.theme,
    };
};

export default connect(mapStateToProps)(ElementRegistration);
