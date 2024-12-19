import React, { useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, IconButton, List,
    ListItem,
    Checkbox,
    ListItemText,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import GreenEaxee from "../../../Assets/Images/ModalEaxeeLogo.png";
import CustomButton from '../../../components/CustomButton/CustomButton';
import { exportTemplate, exportData } from "../../../apis/impex_management";
export default function ExportTemplateModal({ open, handleClose, dialogTitle, dialogButtons, props, items, selectedArchitecture, onDisabledChange }) {

    console.log("dialog title===>", dialogTitle);

    const theme = props.theme;
    const [isDisabled, setisDisabled] = useState(false);
    const language = props.language;
    const [selectedItems, setSelectedItems] = useState([]);
    useEffect(() => {
        // Notify parent about the isDisabled state change
        if (onDisabledChange) {
            onDisabledChange(isDisabled);
        }
    }, [isDisabled, onDisabledChange]);
    // const items = [
    //     { id: 1, name: "Item 1" },
    //     { id: 2, name: "Item 2" },
    //     { id: 3, name: "Item 3" },
    //     { id: 4, name: "Item 4" },
    //     { id: 1, name: "Item 1" },
    //     { id: 2, name: "Item 2" },
    //     { id: 3, name: "Item 3" },
    //     { id: 4, name: "Item 4" },
    //     { id: 1, name: "Item 1" },
    //     { id: 2, name: "Item 2" },
    //     { id: 3, name: "Item 3" },
    //     { id: 4, name: "Item 4" },
    //     { id: 1, name: "Item 1" },
    //     { id: 2, name: "Item 2" },
    //     { id: 3, name: "Item 3" },
    //     { id: 4, name: "Item 4" },
    // ];




    // Reset selectedItems when the modal is closed
    useEffect(() => {
        if (!open) {
            setSelectedItems([]); // Reset checkboxes when the modal is closed
        }
    }, [open]);

    const handleToggle = (id) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((item) => item !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items.map((item) => item.id));
        }
    };



    const handleAdd = async () => {


        console.log("isdisbaled in handle add ", isDisabled);

        setisDisabled(true);



        const selectedItemDetails = items.filter((item) => selectedItems.includes(item.id));
        console.log("Selected Items details are:", selectedItemDetails);
        const sheetList = selectedItemDetails.map(element => element.name);
        console.log("sheetList is: ", sheetList)
        // const res = exportTemplate(sheetList)
        console.log("dialogTitleis: ", dialogTitle)

        // Call Export/Down Template API here
        if (dialogTitle === 'Export Template') {
            const result = await exportTemplate(sheetList);  //Call download template API if user is exporting template

            if (result.code === 200) {
                const { data, headers } = result;

                // Create a Blob URL
                const blob = new Blob([data], { type: headers['content-type'] });
                const downloadUrl = URL.createObjectURL(blob);

                // Extract filename from headers or use a default
                const filename = headers['content-disposition']
                    ? headers['content-disposition'].split('filename=')[1]
                    : 'template.xlsx'; // Default filename

                // Trigger download
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = filename.replace(/['"]/g, ''); // Remove quotes if present
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                // Revoke the Blob URL to free up memory
                URL.revokeObjectURL(downloadUrl);
            } else {
                alert("couldn't download file....")
                console.error(`Error downloading file: ${result.error}`);
            }
        }
        // Call Export Data API here that takes in selected Architecture in input and list of selected sheets
        else if (dialogTitle == 'Export Data') {
            // TBD (waiting for Ali to provide API)
            console.log("archietecture is: ", selectedArchitecture)
            console.log("selected-sheet-list: ", sheetList)

            const result = await exportData(sheetList, selectedArchitecture);  //Call download template API if user is exporting template

            if (result.code === 200) {
                const { data, headers } = result;

                // Create a Blob URL
                const blob = new Blob([data], { type: headers['content-type'] });
                const downloadUrl = URL.createObjectURL(blob);

                // Extract filename from headers or use a default
                const filename = headers['content-disposition']
                    ? headers['content-disposition'].split('filename=')[1]
                    : 'Exported-Data.xlsx'; // Default filename

                // Trigger download
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = filename.replace(/['"]/g, ''); // Remove quotes if present
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                // Revoke the Blob URL to free up memory
                URL.revokeObjectURL(downloadUrl);
            } else {
                alert("couldn't download file....")
                console.error(`Error downloading file: ${result.error}`);
            }

        }
        // else if (dialogTitle == 'Import Data') {
        //     // TBD (waiting for Ali to provide API)
        //     console.log("calling import Data API")
        //     console.log("archietecture is: ", selectedArchitecture)
        //     console.log("selected-sheet-list: ", sheetList)

        //     const result = await importData(sheetList,selectedArchitecture);  //Call download template API if user is exporting template

        //     if (result.code === 200) {
        //         const { data, headers } = result;

        //         // Create a Blob URL
        //         const blob = new Blob([data], { type: headers['content-type'] });
        //         const downloadUrl = URL.createObjectURL(blob);

        //         // Extract filename from headers or use a default
        //         const filename = headers['content-disposition']
        //             ? headers['content-disposition'].split('filename=')[1]
        //             : 'Exported-Data.xlsx'; // Default filename

        //         // Trigger download
        //         const a = document.createElement('a');
        //         a.href = downloadUrl;
        //         a.download = filename.replace(/['"]/g, ''); // Remove quotes if present
        //         document.body.appendChild(a);
        //         a.click();
        //         document.body.removeChild(a);

        //         // Revoke the Blob URL to free up memory
        //         URL.revokeObjectURL(downloadUrl);
        //     } else {
        //         alert("couldn't download file....")
        //         console.error(`Error downloading file: ${result.error}`);
        //     }

        // }

        // console.log("res is:",res)

        setisDisabled(false)
        handleClose();
    };
    const isAllSelected = selectedItems.length === items.length;

    return (
        <div>
            <Dialog open={open} onClose={handleClose} PaperProps={{
                sx: { width: "500px", maxWidth: "70%" },
            }}>
                <DialogTitle
                    sx={{
                        backgroundColor: theme === "default" ? "#2158a4" : theme === "dark" ? "#393a3a" : "",
                        color: "#cecece",
                        padding: "3px 16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "relative",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img src={GreenEaxee} alt="img" style={{ width: "40px", height: "40px", marginRight: "5px" }} />
                        <Typography variant="h6">{dialogTitle}</Typography>
                    </Box>
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#cecece",
                            [language === "ar" ? "left" : "right"]: 0,
                        }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{
                    backgroundColor: theme === "default" ? "#cecece" : theme === "dark" ? "#212121" : "",
                }}>
                    <List sx={{
                        marginBottom: "50px",
                        height: "400px",
                        // border: "2px solid red",
                        padding: "10px",
                        overflowY: "auto", // Enable vertical scrolling
                        // Scrollbar styles
                        "&::-webkit-scrollbar": {
                            width: "10px",
                        },
                        "&::-webkit-scrollbar-track": {
                            background:
                                theme === "default"
                                    ? "#cecece"
                                    : theme === "light"
                                        ? "#eff3f7"
                                        : "#212121",
                            borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background:
                                theme === "default"
                                    ? "#2158a4"
                                    : theme === "light"
                                        ? "#cbd0d7"
                                        : "#a5d149",
                            borderRadius: "10px",
                        },
                    }}>
                        {/* Select All */}
                        <ListItem
                            button
                            onClick={handleSelectAll}
                        >
                            <Checkbox
                                checked={isAllSelected}
                                indeterminate={selectedItems.length > 0 && selectedItems.length < items.length}
                                tabIndex={-1}
                                disableRipple
                            />
                            <ListItemText primary="Select All" />
                        </ListItem>

                        {/* Individual Items */}
                        {items.map((item) => (
                            <ListItem
                                key={item.id}
                                button
                                onClick={() => handleToggle(item.id)}
                            >
                                <Checkbox
                                    checked={selectedItems.includes(item.id)}
                                    tabIndex={-1}
                                    disableRipple
                                />
                                <ListItemText primary={item.name} />
                            </ListItem>
                        ))}
                    </List>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            gap: "10px",
                            marginTop: "20px",
                        }}
                    >
                        {dialogButtons.map((button, index) => (
                            <CustomButton
                                key={index}
                                title={button.label}
                                type="submit"
                                Theme={theme}
                                disabled={
                                    (button.label === "Import" && isDisabled) || (button.label === "Export" && isDisabled) ||
                                        (
                                            (button.label === "Import" || button.label === "Export") &&
                                            selectedItems.length === 0
                                        )
                                }

                                onClick={
                                    button.label === "Import" ||
                                        button.label === "Export" ||
                                        button.label === "ExportTemplate"
                                        ? handleAdd
                                        : button.onClick
                                }
                                sx={{ width: "auto" }}
                            />
                        ))}

                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
