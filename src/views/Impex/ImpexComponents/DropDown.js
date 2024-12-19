import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';

const DropDown = ({ language, theme, onValueChange, listOfDropdownElements }) => {
  const isRTL = language === "ar";
  const [selectedValue, setSelectedValue] = useState('');


  const handleChange = (event) => {
    console.log("dropdown-elements-are: ", listOfDropdownElements)
    const value = event.target.value;
    console.log("event_is: ",value)
    setSelectedValue(value);
    console.log("Selected Value:", value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <FormControl fullWidth sx={{ marginTop: 2 }}>
      <InputLabel
        id="pool-role-label"
        sx={{
          transformOrigin: isRTL ? 'top right' : 'top left',
          textAlign: isRTL ? 'right' : 'left',
          right: isRTL ? 24 : 'auto',
          "&.Mui-focused": { color: "dialogInputfield.main" },
        }}
      >
        {language === 'en' ? 'Select Architecture' : AdminTranslation["Select Architecture"]}
      </InputLabel>
      <Select
        labelId="pool-role-label"
        id="pool-role"
        size="small"
        value={selectedValue}
        onChange={handleChange}
        label={language === 'en' ? 'Architecture Name' : AdminTranslation["Select Architecture"]}
        sx={{
          "& .MuiSelect-select": {
            textAlign: isRTL ? 'right' : 'left',
            color: "inputfieldTextColor.main",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            textAlign: isRTL ? 'right' : 'left',
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "dialogInputfield.main",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "dialogInputfield.main",
          },
          "& .MuiSelect-icon": {
            right: isRTL ? 'unset' : 0,
            left: isRTL ? 0 : 'unset',
          },
        }}
      >
        {/* <MenuItem value={"Eaxee"}>{language === 'en' ? 'Eaxee' : AdminTranslation["Eaxee"]}</MenuItem>
        <MenuItem value={"Mussafara"}>{language === 'en' ? 'Mussafara' : AdminTranslation["Mussafara"]}</MenuItem>
        <MenuItem value={"KSBL"}>{language === 'en' ? 'KSBL' : AdminTranslation["KSBL"]}</MenuItem>
        <MenuItem value={"GM"}>{language === 'en' ? 'GM' : AdminTranslation["GM"]}</MenuItem> */}
        {listOfDropdownElements.map((element) => (
          <MenuItem value={element.id}>
            {language === 'en' ? element.architecture_name : AdminTranslation[element.architecture_name]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
