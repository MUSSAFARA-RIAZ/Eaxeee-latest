// import React from 'react'
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ApplicationInteractionIcon from '../../../Assets/Images/application-interaction-01.svg';
import ApplicationInterfaceIcon from '../../../Assets/Images/application-interface-01.svg';
// Import other icons similarly
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
// import BusinessServiceIcon from '../../../Assets/Images/business-service-01.svg';
import CapabilityIcon from '../../../Assets/Images/capability-01.svg';
// import CommunicationNetworkIcon from '../../../Assets/Images/communication-network-01.svg';
import ConstraintIcon from '../../../Assets/Images/constraint-01.svg';
export default function StaticIconLeftPane() {
  return (
    <div>
        <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          overflowY: 'auto',
          width:"60%",
          margin:"auto"

        }}
      >
        <img src={ApplicationInteractionIcon} alt="application interaction" style={{ width: '30px', height: '30px', margin: '10px' }} />
        <img src={ApplicationInterfaceIcon} alt="application interface" style={{ width: '30px', height: '30px', margin: '10px' }} />
        <img src={ApplicationProcessIcon} alt="application process" style={{ width: '30px', height: '30px', margin: '10px' }} />
        <img src={ApplicationServiceIcon} alt="application service" style={{ width: '30px', height: '30px', margin: '10px' }} />
        <img src={ArtifactIcon} alt="artifact" style={{ width: '30px', height: '30px', margin: '10px' }} />
        <img src={AssessmentIcon} alt="assessment" style={{ width: '30px', height: '30px', margin: '10px' }} />
        <img src={BusinessActorIcon} alt="business actor" style={{ width: '30px', height: '30px', margin: '10px' }} />
        <img src={BusinessCollaborationIcon} alt="business collaboration" style={{ width: '30px', height: '30px', margin: '10px' }} />
        <img src={BusinessEventIcon} alt="business event" style={{ width: '30px', height: '30px', margin: '10px' }} />
        <img src={BusinessFunctionIcon} alt="business function" style={{ width: '30px', height: '30px', margin: '10px' }} />
        <img src={BusinessInteractionIcon} alt="business interaction" style={{ width: '30px', height: '30px', margin: '10px' }} />
        <img src={BusinessInterfaceIcon} alt="business interface" style={{ width: '30px', height: '30px', margin: '10px' }} />
        <img src={BusinessObjectIcon} alt="business object" style={{ width: '30px', height: '30px', margin: '10px' }} />
        <img src={BusinessProcessIcon} alt="business process" style={{ width: '30px', height: '30px', margin: '10px' }} />
        <img src={BusinessRoleIcon} alt="business role" style={{ width: '30px', height: '30px', margin: '10px' }} />
        {/* <img src={BusinessServiceIcon} alt="business service" style={{ width: '30px', height: '30px', margin: '10px' }} /> */}
        <img src={CapabilityIcon} alt="capability" style={{ width: '30px', height: '30px', margin: '10px' }} />
        {/* <img src={CommunicationNetworkIcon} alt="communication network" style={{ width: '30px', height: '30px', margin: '10px' }} /> */}
        <img src={ConstraintIcon} alt="constraint" style={{ width: '30px', height: '30px', margin: '10px' }} />
      </Box>
    </div>
  )
}
