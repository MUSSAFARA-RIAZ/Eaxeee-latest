import * as React from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    border: '1px solid grey',
    fontSize: 14,
    padding: '8px 10px',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export default function DropDown({ menuItems, width, selectedValue, onValueChange }) {

  const handleChange = (event) => {
    onValueChange(event.target.value); // Call parent handler with the new value
  };

  return (
    <FormControl 
      variant="outlined" 
      size="small" 
      sx={{
        width: width || '15em',
      }}
    >
      <Select
        value={selectedValue} // Controlled by parent
        onChange={handleChange} // Handle change
        input={<BootstrapInput />}
        IconComponent={ArrowDropDownIcon}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
