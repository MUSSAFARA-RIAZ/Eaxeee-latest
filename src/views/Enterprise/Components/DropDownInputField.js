import * as React from 'react';
import { styled } from '@mui/material/styles';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const BootstrapInput = styled(InputBase)(({ theme, props }) => ({
  

  'label + &': {
    marginTop: theme.spacing(3),
  },

  '& .MuiInputBase-input': {
    borderRadius: 4,
 
    position: 'relative',
   
     
  
    border:"1px solid grey",
  
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
      // borderColor: '#80bdff',
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
  console.log("props in dropdown input field", props)
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div style={{ marginTop: 10, display: "flex", justifyContent: "space-around" }}>
      <div>
        <TextField id="outlined-basic" label="Filter" variant="outlined" size="small" sx={{ width: 240,  }} />
      </div>
      <div>
        <FormControl variant="outlined" size="small" sx={{


          borderColor:props.theme==="default"?"black":"green"

        }}>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={age}
            props={props}
            onChange={handleChange}
            input={<BootstrapInput />}
            IconComponent={ArrowDropDownIcon}
          >
            <MenuItem value={10}>None</MenuItem>
            <MenuItem value={20}>Select One</MenuItem>
            <MenuItem value={30}>Select Two</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
