
import React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function CustomButton(props) {
    const { title, buttonTitleColor, buttonBorderColor, variant, onClick, loading, type, disabled, fullWidth, loaderSize, loaderColor, loaderThickness, startIcon } = props;
    return (
        <Box>
            <Button
                variant={variant}
                onClick={onClick}
                type={type}
                disabled={loading || disabled}
                fullWidth={fullWidth}
                sx={{
                    color: buttonTitleColor,
                    borderColor: buttonBorderColor,
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                }}
                startIcon={startIcon}
            >
                {loading ? <CircularProgress size={loaderSize} color={loaderColor} thickness={loaderThickness} /> : title}
            </Button>
        </Box>
    )
}

export default CustomButton