import React, { useState } from 'react';
import { Box } from '@mui/material';
import { connect } from 'react-redux';
import styles from './UserManagement.module.css';
import CustomTable from '../../../components/CustomTable/CustomTable';
import CustomButton from '../../../components/CustomButton/CustomButton';
// import ModalAddLayer from './Modals/ModalAddElement';
import ModalAddElement from './Modals/ModalAddRelation';
import { useSelector } from 'react-redux';
import GreenEaxee from "../../../Assets/Images/ModalEaxeeLogo.png";
// import GreenEaxeeLogo from "../../../../Assets/Images/ModalEaxeeLogo.png";
import Crop75Icon from '@mui/icons-material/Crop75';
import ModalAddRelation from './Modals/ModalAddRelation';

const RelationShipRegistration = (props) => {
    const { language, theme } = props;
    const layers = useSelector((state) => state.layers);
    console.log("layers in element registration===> redux ", layers);


    const [openModal, setOpenModal] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]); // Tracks selected rows
    const [selectedRowData, setSelectedRowData] = useState(null); // Store the data of the selected row for editing
    const [tableRowData, setTableRowData] = useState([
        {
            id: 1,
            RelationName: "Information System Service",
            ConceptType: "Element",
            Color: "#87CEEB", // Light Blue
            RelationShipNotation: "A",
            LineStyle: "Crop75Icon", // LineStyle with an icon
            StartShape: "GreenEaxee", // StartShape using image
            EndShape: "Crop75Icon",   // EndShape using icon
            FromtoToInterpretation: "Interpreted from A to B",
            TotoFromInterpretation: "Interpreted from B to A",
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
            RelationName: "Logical Application Component",
            ConceptType: "Element",
            Color: "#87CEEB", // Light Blue
            RelationShipNotation: "B",
            LineStyle: "Crop75Icon", // Text fallback or icon
            StartShape: "Crop75Icon",
            EndShape: "GreenEaxee",
            FromtoToInterpretation: "Interpreted from B to C",
            TotoFromInterpretation: "Interpreted from C to B",
            Description: "To be provided later",
            Originator: "EAXEE",
            isEnabled: "YES",
            isLocked: "NO",
            LockedBy: "N/A",
            isHidden: "NO",
            HiddenBy: "N/A"
        },
        {
            id: 3,
            RelationName: "External System Interface",
            ConceptType: "Interface",
            Color: "#FF6347", // Tomato Red
            RelationShipNotation: "C",
            LineStyle: "Default", // Fallback to text
            StartShape: "Square",
            EndShape: "Circle",
            FromtoToInterpretation: "Data flow from C to D",
            TotoFromInterpretation: "Data flow from D to C",
            Description: "External interface description",
            Originator: "EAXEE",
            isEnabled: "NO",
            isLocked: "YES",
            LockedBy: "User123",
            isHidden: "YES",
            HiddenBy: "Admin"
        }
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
        { field: 'RelationName', headerName: (language === 'en' ? 'Relation Name' : 'Relation Name'), flex: 1 },
        { field: 'ConceptType', headerName: (language === 'en' ? 'Concept Type' : 'Concept Type'), flex: 1 },


     
        {
            field: 'Color',
            headerName: (language === 'en' ? 'Color' : 'Color'),
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
        { field: 'RelationShipNotation', headerName: (language === 'en' ? 'RelationShip Notation' : 'RelationShip Notation'), flex: 1 },
        {
            field: 'LineStyle',
            headerName: 'Line Style',
            flex: 1,
            renderCell: (params) => {
                if (params.value === "Crop75Icon") {
                    return <Crop75Icon />;
                }
                
                return params.value; // Text-based icon like "★"
            },
        },
        {
            field: 'StartShape',
            headerName: 'Start Shape',
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
          {
            field: 'EndShape',
            headerName: 'End Shape',
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
          
          { field: 'FromtoToInterpretation', headerName: (language === 'en' ? 'From to To Interpretation' : 'From to To Interpretation'), flex: 1 },
          { field: 'TotoFromInterpretation', headerName: (language === 'en' ? 'To to From Interpretation' : 'To to From Interpretation'), flex: 1 },
          
        
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
            <ModalAddRelation
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
                            title={language === 'en' ? "Add Relation" : "Add Relation"}
                            variant='outlined'
                            onClick={handleAddUserClick}
                            fullWidth={true}
                            Theme={props.theme}
                        />
                        <CustomButton
                            title={language === 'en' ? 'Edit Relation' : 'Edit Relation'}
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

export default connect(mapStateToProps)(RelationShipRegistration);
