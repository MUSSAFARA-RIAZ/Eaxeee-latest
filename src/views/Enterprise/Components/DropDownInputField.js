import * as React from 'react';
import TextField from '@mui/material/TextField';
import DropDown from './DropDown'; // Ensure DropDown component is imported

export default function DropDownInputField(props) {
  const items = [
    { value: 10, label: 'None' },
    { value: 20, label: 'Select One' },
    { value: 30, label: 'Select Two' },
  ];

  // State to control the selected value in DropDown
  const [selectedValue, setSelectedValue] = React.useState(10); // Default to 10 ("None")

  // Handle value change in DropDown
  const handleDropDownChange = (newValue) => {
    setSelectedValue(newValue); // Update the selected value
  };
  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
  };

  return (
    <div style={{ marginTop: 10, display: "flex", justifyContent: "space-around" }}>
      <div>
        <TextField id="outlined-basic" label="Filter" variant="outlined" size="small" sx={{ width: 240 }} />
      </div>
      <div>
        <DropDown
          menuItems={items} // Pass the options
          selectedValue={selectedValue} // Pass the current selected value
          onValueChange={handleValueChange} 
          width="100px"
          
          
          // Handle when the value changes
          // width="200px" // Optional: specify the width
        />
      </div>
    </div>
  );
}
