import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 2.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
   // color: personName.indexOf(name) !== -1 ? 'red' : 'inherit', // Change color to red if selected
  };
}

export default function MultipleSelectPlaceholder() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ width: 290, marginBottom:"10px"}} size='small'>
    

        <Select
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
        //  input={<OutlinedInput />}
         
        //  style={{color:"white"}}
        
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select Architecture</em>;
            }
          
            return (
              <span>
                {selected.map((item, index) => (
                  <>
                  <span 
                    key={index} 
                    style={{ 
                      color: "white", 
                      backgroundColor:"#0D7E8A",
                      borderRadius:"10px",
                      border: "1px solid #0D7E8A", 
                      padding: "5px", 
                      margin: "1px" ,
                      fontSize:"14px"
                    }}
                  >
                    {item}
                    
                  </span>
                  <span>
                  {index < selected.length - 1 && ", "}
                  </span>

                  </>
                 
                ))}
              
              </span>
            );
          }}
          
          
          MenuProps={MenuProps}
         // inputProps={{ 'aria-label': 'Without label' }} 

          
        >
          <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
