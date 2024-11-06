import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Tooltip from '@mui/material/Tooltip';
import CustomTabs from '../../../components/CustomTabs/CustomTabs';
import { Home, Settings, Info } from '@mui/icons-material';

// Import the additional components for Settings and Info
import Bpmn from './Bpmn';

import SimpleDrawingTool from './SimpleDrawingTool';
// Assuming Bpmn component is located here
// import  from './SimpleDrawing';  // Assuming SimpleDrawing component is located here

// Importing the icons for Iconbox images
import ApplicationInteractionIcon from '../../../Assets/Images/application-interaction-01.svg';
import ApplicationInterfaceIcon from '../../../Assets/Images/application-interface-01.svg';
import ApplicationProcessIcon from '../../../Assets/Images/application-process-01.svg';
import ApplicationServiceIcon from '../../../Assets/Images/application-service1-01.svg';
import ArtifactIcon from '../../../Assets/Images/artifact-01.svg';
import AssessmentIcon from '../../../Assets/Images/assessment-01.svg';
import BusinessActorIcon from '../../../Assets/Images/business-actor.svg';
import BusinessCollaborationIcon from '../../../Assets/Images/business-collaboration-01.svg';
import BusinessEventIcon from '../../../Assets/Images/business-event-01.svg';
import BusinessFunctionIcon from '../../../Assets/Images/Business-function-01.svg';
import BusinessInteractionIcon from '../../../Assets/Images/business-interaction-01.svg';
import BusinessInterfaceIcon from '../../../Assets/Images/business-interface-01.svg';
import BusinessObjectIcon from '../../../Assets/Images/business-object-01.svg';
import BusinessProcessIcon from '../../../Assets/Images/business-process-01.svg';
import BusinessRoleIcon from '../../../Assets/Images/business-role-01.svg';
import TextIcon from "../../../Assets/Images/text-box.svg";
import Container from "../../../Assets/Images/container.svg";


const Iconbox = ({ onSelectImage, props }) => {
  const [hovered, setHovered] = useState(false);
  const [tabValue, setTabValue] = useState(0);


  const images = [
    { src: ApplicationInteractionIcon, title: 'Application Interaction' },
    { src: ApplicationInterfaceIcon, title: 'Application Interface' },
    { src: ApplicationProcessIcon, title: 'Application Process' },
    { src: ApplicationServiceIcon, title: 'Application Service' },
  
    { src: ArtifactIcon, title: 'Artifact' },
    { src: AssessmentIcon, title: 'Assessment' },
    { src: BusinessActorIcon, title: 'Business Actor' },
    { src: BusinessCollaborationIcon, title: 'Business Collaboration' },
    { src: BusinessEventIcon, title: 'Business Event' },
    { src: BusinessFunctionIcon, title: 'Business Function' },
    { src: BusinessInteractionIcon, title: 'Business Interaction' },
    { src: BusinessInterfaceIcon, title: 'Business Interface' },
    { src: BusinessObjectIcon, title: 'Business Object' },
    { src: BusinessProcessIcon, title: 'Business Process' },
    { src: BusinessRoleIcon, title: 'Business Role' },
    { src: TextIcon, title: 'Text' },
    { src: Container, title: 'Container' },
    
    
   

    

  ];

  const imageColors = {
    [ApplicationInteractionIcon]: '#70e5fa',
    [ApplicationInterfaceIcon]: '#70e5fa',
    [ApplicationProcessIcon]: '#70e5fa',
    [ApplicationServiceIcon]: '#70e5fa',
    [ArtifactIcon]: '#65fc65',
    [AssessmentIcon]: '#cd9cff',
    [BusinessActorIcon]: '#f5e29d',
    [BusinessCollaborationIcon]: '#f5e29d',
    [BusinessEventIcon]: '#f5e29d',
    [BusinessFunctionIcon]: '#f5e29d',
    [BusinessInteractionIcon]: '#f5e29d',
    [BusinessInterfaceIcon]: '#f5e29d',
    [BusinessObjectIcon]: '#f5e29d',
    [BusinessProcessIcon]: '#f5e29d',
    [BusinessRoleIcon]: '#f5e29d',
    [TextIcon]: '#f5e29d',
  };

  const handleImageClick = (imageSrc, title) => (event) => {
    if (event.button === 0) {
      const backgroundColor = imageColors[imageSrc];
      onSelectImage(imageSrc, backgroundColor, title);
    }
  };


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  const tabs = [
    { label: 'Eaxee' },
    { label: 'Bpmn' },
    { label: 'Simple' },
  ];


  const renderTabContent = () => {
    switch (tabValue) {
      case 0:
        return (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              height:"70%",
              overflowY: 'auto',
              marginTop: "50px",

              // border: "2px solid blue",

              width: "100%",
              '&::-webkit-scrollbar': {
                width: '20px',
              },

              '&::-webkit-scrollbar-thumb': {
                // backgroundColor: 'yellow',
                borderRadius: '10px',
                backgroundColor:
              props.theme === "default"
                ? "#2158a4"
                : props.theme === "light"
                  ? "#cbd0d7"
                  : "#a5d149",
              },

              '&::-webkit-scrollbar-track': {
                // backgroundColor: 'red',
                background:
              props.theme === "default"
                ? "#cecece"
                : props.theme === "light"
                  ? "#eff3f7"
                  : "#212121",
              },
            }}
          >
            {images.map(({ src, title }) => (
              <Tooltip key={src} title={title}>
                <img
                  src={src}
                  alt={title.toLowerCase().replace(' ', '-')}
                  style={{ width: '30px', height: '30px', margin: '9px' }}
                  onClick={handleImageClick(src, title)}
                />
              </Tooltip>
            ))}
          </Box>
        );
      case 1:
        return <Bpmn />;  // Render Bpmn component for Settings tab
      case 2:
        return <SimpleDrawingTool />;  // Render SimpleDrawing component for Info tab
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        width: hovered ? '25%' : '1%',
        height: 'calc(100vh - 100px)',
        position: 'relative',
        transition: 'width 0.5s ease',
        overflow: 'hidden',
        borderRadius: 2,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        sx={{
          width: '15px',
          height: '100%',
          backgroundColor: props.theme === 'default' ? '#2158a4' : '#a5d149',
          borderLeft: '1px solid #cecece',
          position: 'absolute',
          right: 0,
          top: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton>
          <ArrowForwardIosIcon
            sx={{
              color: props.theme === 'default' ? '#cecece' : '#393a3a',
              width: '15px',
              ml: 0.5,
            }}
          />
        </IconButton>
      </Box>

      <div style={{ padding: "0px", margin: "0px", position: "absolute", left: 0 }}>
        <CustomTabs
          value={tabValue}
          onChange={handleTabChange}
          tabs={tabs}
          orientation="horizontal"
          language={props.language}
          theme={props.theme}
        />
      </div>


      {renderTabContent()}


    </Box>
  );
};

export default Iconbox;
