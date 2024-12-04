import React from 'react';
import Button from '@mui/material/Button';

const myButton = ({ onClick, children }) => {
    return (
        <Button  
        variant='contained'
        sx={{
            padding: "5px 28px !important",
            borderRadius: "0px !important", 
            fontSize: "12px !important",
            textTransform:"unset"
          }}
           onClick={onClick}>
            {children}
        </Button>
    );
};

export default myButton;