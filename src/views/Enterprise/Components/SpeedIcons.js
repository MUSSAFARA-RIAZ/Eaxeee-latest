import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import Draggable from 'react-draggable';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import StorageIcon from '@mui/icons-material/Storage';
import ComputerIcon from '@mui/icons-material/Computer';
import GroupIcon from '@mui/icons-material/Group';
import CloudIcon from '@mui/icons-material/Cloud';
import LayersIcon from '@mui/icons-material/Layers';
import SettingsIcon from '@mui/icons-material/Settings';
import CodeIcon from '@mui/icons-material/Code';
import Grid from '@mui/material/Grid';

export default function OpenIconSpeedDial({ theme }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const icons = [
    { icon: <BusinessIcon />, label: 'Business Actor' },
    { icon: <PersonIcon />, label: 'Business Role' },
    { icon: <StorageIcon />, label: 'Data Entity' },
    { icon: <ComputerIcon />, label: 'Application Component' },
    { icon: <GroupIcon />, label: 'Business Collaboration' },
    { icon: <CloudIcon />, label: 'Technology Service' },
    { icon: <LayersIcon />, label: 'Technology Component' },
    { icon: <SettingsIcon />, label: 'Infrastructure' },
    { icon: <CodeIcon />, label: 'Software' },
    { icon: <BusinessIcon />, label: 'Business Actor' },
    { icon: <PersonIcon />, label: 'Business Role' },
    { icon: <StorageIcon />, label: 'Data Entity' },
    { icon: <ComputerIcon />, label: 'Application Component' },
    { icon: <GroupIcon />, label: 'Business Collaboration' },
    { icon: <CloudIcon />, label: 'Technology Service' },
    { icon: <LayersIcon />, label: 'Technology Component' },
    { icon: <SettingsIcon />, label: 'Infrastructure' },
    { icon: <CodeIcon />, label: 'Software' },
  ];

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'absolute', top: 16, left: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        direction="right"
        FabProps={{
          size: 'small',
          onClick: handleClick,
        }}
      />
      {open && (
        <Draggable>
          <Box
            sx={{
              position: 'absolute',
              top: 64, // Adjust based on where you want the box to appear
              left: 16, // Adjust based on where you want the box to appear
              width: 300,
              bgcolor: 'background.paper',
              boxShadow: 1,
              p: 2,
              borderRadius: 1,
            }}
          >
            <Grid container spacing={2}>
              {icons.map((item, index) => (
                <Grid item xs={4} sm={3} key={index} style={{ textAlign: 'center' }}>
                  <Box>
                    {item.icon}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Draggable>
      )}
    </Box>
  );
}
