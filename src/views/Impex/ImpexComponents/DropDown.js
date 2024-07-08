import * as React from "react";


import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";



const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];



export default function DropDown({props}) {
  console.log("propsssssssssssss",props)
  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    sx: {
      maxHeight: ITEM_HEIGHT * 2.5 + ITEM_PADDING_TOP,
      // border:"2px solid yellow",
      width: 250,
      '&::-webkit-scrollbar': {
        width: '10px',
      },
      '&::-webkit-scrollbar-track': {
        background: props.theme === "default" ? "#cceaed" : props.theme === "light" ? "#eff3f7" : "#212121",
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: props.theme === "default" ? "#0d7e8a" : props.theme === "light" ? "#cbd0d7" : "white",
        borderRadius: '10px',
      },
      


    },
  },
};
  
  // const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ width: 360, marginBottom: "10px" }} size="small">
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
                        color:props.theme === "default" ? "#cceaed" : props.theme === "light" ? "#eff3f7" : "#212121",
                        backgroundColor: props.theme === "default" ? "#0d7e8a" : props.theme === "light" ? "#cbd0d7" : "white",
                        borderRadius: "10px",
                        borderWidth:"1px",
                        borderStyle:"solid",
                        borderColor: props.theme === "default" ? "#cceaed" : props.theme === "light" ? "#eff3f7" : "#212121",
                        padding: "5px",

                        margin: "1px",
                        fontSize: "14px",
                        

                      }}
                    >
                      {item}
                    </span>
                    <span>{index < selected.length - 1 && ", "}</span>
                  </>
                ))}
              </span>
            );
          }}
          MenuProps={MenuProps}
          // inputProps={{ 'aria-label': 'Without label' }}
        >
          {/* <MenuItem disabled value="" >
            <em>Placeholder</em>
          </MenuItem> */}
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              sx={{
               "&:hover":{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                    
                },
                // border:"2px solid red"
               
              
              
              }}
             
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
