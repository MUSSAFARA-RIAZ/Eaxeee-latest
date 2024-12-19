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
import { exportTemplate } from "../../../apis/impex_management";
export default function ExportTemplateModal({ open, handleClose, dialogTitle, dialogButtons, props, items }) {

    console.log("dialog title===>", dialogTitle);

    const theme = props.theme;
    const language = props.language;
    const [selectedItems, setSelectedItems] = useState([]);

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


        const selectedItemDetails = items.filter((item) => selectedItems.includes(item.id));
        console.log("Selected Items details are:", selectedItemDetails);
        const nameList = selectedItemDetails.map(element => element.name);
        console.log("nameList is: ", nameList)
        // const res = exportTemplate(nameList)
        console.log("dialogTitleis: ",dialogTitle)

        if (dialogTitle === 'Export Template'){
            const result = await exportTemplate(nameList);

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
        
        // console.log("res is:",res)
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
                    <List>
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
                                onClick={button.label === "Import" || button.label === "Export" || button.label === "ExportTemplate" ? handleAdd : button.onClick}
                                // onClick={button.onClick}
                                sx={{ width: "auto" }}
                            />
                        ))}
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
