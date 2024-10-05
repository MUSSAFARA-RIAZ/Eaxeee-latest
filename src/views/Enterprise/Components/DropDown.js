import * as React from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    border: "1px solid grey",
    fontSize: 14,
    padding: '8px 26px 8px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  '& .MuiSelect-icon': {
    right: 10,
    top: 'calc(50% - 12px)',
    position: 'absolute',
    pointerEvents: 'none',
  },
}));

export default function DropDown({ menuItems, width, marginleft }) {
  const [selectedValue, setSelectedValue] = React.useState(menuItems.length > 0 ? menuItems[0].value : '');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl 
      variant="outlined" 
      size="small" 
      sx={{
        width: width || '15em',  // Dynamic width for the red border
        // border: "2px solid red",
        margin: marginleft ? marginleft : '0px',
        
      }}
    >
      <Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={selectedValue}
        onChange={handleChange}
        sx={{
          
          //  border: "2px solid blue", 
        
        width: "100%" }}  // Set width to 100% so it fits the red border
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
