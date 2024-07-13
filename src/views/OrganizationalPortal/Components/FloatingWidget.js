import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import MinimizeRoundedIcon from '@mui/icons-material/MinimizeRounded';
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded'; // Import the square icon
import FilterNoneRoundedIcon from '@mui/icons-material/FilterNoneRounded';
import OrgDefaultTheme from "../OrganizationalPortal.default.module.css";
import OrgDarkTheme from "../OrganizationalPortal.dark.module.css";
import OrgLightTheme from "../OrganizationalPortal.light.module.css";

export default function FloatingWidget({ index, onMinimizedArtifact, isMinimized, theme }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {!isMinimized && (
        <Box>
          <div
            style={{
              position: expanded ? 'fixed' : 'relative',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: expanded ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
              zIndex: expanded ? 9998 : 'auto',
              display: expanded ? 'block' : 'none',
            }}
            onClick={() => setExpanded(false)}
          />
          <ResizableBox
            width={expanded ? window.innerWidth * 0.8 : 325}
            height={expanded ? window.innerHeight * 0.8 : 250}
            minConstraints={[64, 64]}
            maxConstraints={[2500, 2500]}
            resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
          >
            <Paper
              elevation={3}
              className={`${theme === 'default'
              ? OrgDefaultTheme.Organization_FloatingWidget
              : theme === 'light'
              ? OrgLightTheme.Organization_FloatingWidget
              : OrgDarkTheme.Organization_FloatingWidget}`}
             
              sx={{
                width: expanded ? '80vw' : '100%',
                height: expanded ? '80vh' : '100%',
                position: expanded ? 'fixed' : 'relative',
                top: expanded ? '50%' : 'auto',
                left: expanded ? '50%' : 'auto',
                transform: expanded ? 'translate(-50%, -50%)' : 'none',
                zIndex: expanded ? 9999 : 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '8px' }}>
                <MinimizeRoundedIcon 
                sx={{cursor: 'pointer',}} onClick={() => onMinimizedArtifact(index)} />
                {expanded ? (
                  <FilterNoneRoundedIcon fontSize='small' sx={{ marginTop: '10px',cursor: 'pointer', }} onClick={handleExpand} /> // Double overlayed squares when expanded
                ) : (
                  <CropSquareRoundedIcon fontSize='small' sx={{ marginTop: '10px',cursor: 'pointer', }} onClick={handleExpand} /> // Square when not expanded
                )}
              </div>
              {index}
            </Paper>
          </ResizableBox>
        </Box>
      )}
    </>
  );
}
