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
import ContractIcon from '../../../Assets/Images/contract-01.svg';
// import DataObjectIcon from '../../../Assets/Images/data-object-01.svg';
import DeliverableIcon from '../../../Assets/Images/deliverable-01.svg';
import DeviceIcon from '../../../Assets/Images/device-01.svg';
import DistributionNetworkIcon from '../../../Assets/Images/distribution-network-01.svg';
import DriverIcon from '../../../Assets/Images/driver1-01.svg';
import EquipmentIcon from '../../../Assets/Images/equipment-01.svg';
import FacilityIcon from '../../../Assets/Images/facility-01.svg';
// import GapIcon from '../../../Assets/Images/gap-01.svg';
// import GoalIcon from '../../../Assets/Images/goal-01.svg';
import GroupingIcon from '../../../Assets/Images/grouping.svg';
import ImplementationEventIcon from '../../../Assets/Images/implementation-event-01.svg';

const Iconbox = (props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      sx={{
        width: '80%',
        height: '400px',
        border: '1px solid #cecece',
        position: 'relative',
        transform: hovered ? 'translateX(0)' : 'translateX(-99%)',
        transition: 'transform 0.5s ease',
        overflow: 'hidden',
        mt: 10,
        borderRadius: 2,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        sx={{
          width: '15px',
          height: '100%',
          backgroundColor: props.theme === "default" ? "#2158a4" : "#cecece",
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
          <ArrowForwardIosIcon sx={{
            color: props.theme === "default" ? "#cecece" : "#393a3a",
            width: "15px", ml: 0.5
          }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <img src={ApplicationInteractionIcon} alt="application interaction" style={{ width: '50px', height: '50px', margin: '10px' }} />
        <img src={ApplicationInterfaceIcon} alt="application interface" style={{ width: '50px', height: '50px', margin: '10px' }} />
        <img src={ApplicationProcessIcon} alt="application process" style={{ width: '50px', height: '50px', margin: '10px' }} />
        <img src={ApplicationServiceIcon} alt="application service" style={{ width: '50px', height: '50px', margin: '10px' }} />
        <img src={ArtifactIcon} alt="artifact" style={{ width: '50px', height: '50px', margin: '10px' }} />
        <img src={AssessmentIcon} alt="assessment" style={{ width: '50px', height: '50px', margin: '10px' }} />
        <img src={BusinessActorIcon} alt="business actor" style={{ width: '50px', height: '50px', margin: '10px' }} />
        <img src={BusinessCollaborationIcon} alt="business collaboration" style={{ width: '50px', height: '50px', margin: '10px' }} />
        <img src={BusinessEventIcon} alt="business event" style={{ width: '50px', height: '50px', margin: '10px' }} />
        <img src={BusinessFunctionIcon} alt="business function" style={{ width: '50px', height: '50px', margin: '10px' }} />
        <img src={BusinessInteractionIcon} alt="business interaction" style={{ width: '50px', height: '50px', margin: '10px' }} />
        <img src={BusinessInterfaceIcon} alt="business interface" style={{ width: '50px', height: '50px', margin: '10px' }} />
        <img src={BusinessObjectIcon} alt="business object" style={{ width: '50px', height: '50px', margin: '10px' }} />
        <img src={BusinessProcessIcon} alt="business process" style={{ width: '50px', height: '50px', margin: '10px' }} />
        <img src={BusinessRoleIcon} alt="business role" style={{ width: '50px', height: '50px', margin: '10px' }} />
        {/* <img src={BusinessServiceIcon} alt="business service" style={{ width: '50px', height: '50px', margin: '10px' }} /> */}
        <img src={CapabilityIcon} alt="capability" style={{ width: '50px', height: '50px', margin: '10px' }} />
        {/* <img src={CommunicationNetworkIcon} alt="communication network" style={{ width: '50px', height: '50px', margin: '10px' }} /> */}
        <img src={ConstraintIcon} alt="constraint" style={{ width: '50px', height: '50px', margin: '10px' }} />
      </Box>
    </Box>
  );
};

export default Iconbox;
