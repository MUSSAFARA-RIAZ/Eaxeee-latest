import * as React from 'react';
import { styled } from '@mui/material/styles';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DropDown from './DropDown';


const BootstrapInput = styled(InputBase)(({ theme, props }) => ({
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

export default function DropDownInputField(props) {
  console.log("props in dropdown input field", props);
  const items = [
    { value: 10, label: 'None' },
    { value: 20, label: 'Select One' },
    { value: 30, label: 'Select Two' },
  ];
  
  // Set the default value to 10 to display "None"
 

  return (
    <div style={{ marginTop: 10, display: "flex", justifyContent: "space-around" }}>
      <div>
        <TextField id="outlined-basic" label="Filter" variant="outlined" size="small" sx={{ width: 240 }} />
      </div>
      <div>
        <DropDown menuItems={items} width="7em" />
      </div>
    </div>
  );
}
