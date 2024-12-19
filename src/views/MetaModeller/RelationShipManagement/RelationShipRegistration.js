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
import SolidLine from "../../../Assets/Images/MetaModellerImages/solid.svg";
import DashedLine from "../../../Assets/Images/MetaModellerImages/dashed.svg";
import DottedLine from "../../../Assets/Images/MetaModellerImages/dotted.svg";
import DiamondThin from "../../../Assets/Images/MetaModellerImages/diamondThin.svg";
import rightOpenArrow from "../../../Assets/Images/MetaModellerImages/open.svg";
import none from "../../../Assets/Images/MetaModellerImages/none.svg"; 
import Diamond from "../../../Assets/Images/MetaModellerImages/diamond.svg";
// import Diamond from "../../../../Assets/Images/MetaModellerImages/diamond.svg";
// import none from "../../../../Assets/Images/MetaModellerImages/none.svg";
import oval from "../../../Assets/Images/MetaModellerImages/oval.svg";
import UnfilledDiamond from "../../../Assets/Images/MetaModellerImages/unfilled-diamond.svg";
import Blockfilled from "../../../Assets/Images/MetaModellerImages/block.svg";
// import none from "../../../../Assets/Images/MetaModellerImages/CrossImage.svg";


const lineStyleOptions = [
    { id: "solid", label: "Solid", image: SolidLine },
    { id: "dashed", label: "Dashed", image: DashedLine },
    {
        id:"dotted", label:"Dotted", image:DottedLine
    }
];
const EndshapeOptions = [
    { id: "diamon", label: "Diamond", image: Diamond },
    { id: "none", label: "none", image: none },
    { id: "oval", label: "oval", image: oval },
    {
        id: "unfilled-diamond", label: "unfilled-diamond", image:
            UnfilledDiamond
    },
    { id: "block", label: "block", image: Blockfilled },

];

const StartshapeOptions = [
    { id: "diamon", label: "Diamond", image: Diamond },
    
    { id: "none", label: "none", image: none },
    { id: "oval", label: "oval", image: oval },
    {
        id: "unfilled-diamond", label: "unfilled-diamond", image:
            UnfilledDiamond
    },
    { id: "block", label: "block", image: Blockfilled },

];
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
            LineStyle: "solid", // LineStyle with an icon
            StartShape: "diamon", // StartShape using image
            EndShape: "DiamondThin",   // EndShape using icon
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
            LineStyle: "solid", // LineStyle with an icon
            StartShape: "diamon", // StartShape using image
            EndShape: "DiamondThin",   // EndShape using icon
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
            LineStyle: "solid", // LineStyle with an icon
            StartShape: "diamon", // StartShape using image
            EndShape: "DiamondThin",   // EndShape using icon
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
                const lineStyleOption = lineStyleOptions.find(option => option.id === params.value);
                return lineStyleOption ? (
                    <img
                        src={lineStyleOption.image}
                        alt={lineStyleOption.label}
                        style={{ width: "40px", height: "20px", objectFit: "contain" }}
                    />
                ) : params.value; // Fallback for unrecognized values
            },
        },
        {
            field: 'StartShape',
            headerName: 'Start Shape',
            flex: 1,
            renderCell: (params) => {
                const startShapeOption = StartshapeOptions.find(option => option.id === params.value);
                return startShapeOption ? (
                    <img
                        src={startShapeOption.image}
                        alt={startShapeOption.label}
                        style={{ width: "20px", height: "20px", objectFit: "contain" }}
                    />
                ) : params.value; // Fallback for unrecognized values
            },
        },
        {
            field: 'EndShape',
            headerName: 'End Shape',
            flex: 1,
            renderCell: (params) => {
                const endShapeOption = EndshapeOptions.find(option => option.id === params.value);
                return endShapeOption ? (
                    <img
                        src={endShapeOption.image}
                        alt={endShapeOption.label}
                        style={{ width: "20px", height: "20px", objectFit: "contain" }}
                    />
                ) : params.value; // Fallback for unrecognized values
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
                        display: "flex", justifyContent: "space-between", alignItems: "space-between", width: "380px", ...(language === 'ar' && {
                            display: "flex", width: "320px", justifyContent: "space-between", position: "relative", right: "10px"
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
