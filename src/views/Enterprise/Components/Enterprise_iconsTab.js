// import React from 'react'
// import CustomButton from '../../../components/CustomButton/CustomButton'
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
// import CustomTabs from '../../../components/CustomTabs/CustomTabs';
// export default function Enterprise_iconsTab({ props }) {
//     const {value,handleChange, tabs}=props;

//     return (
//         <div style={{display:"flex"}}>

//             <CustomButton


//                 variant="outlined"


//                 type="submit"
//                 Theme={props.theme}


//                 loading={false}
//                 disabled={false}

//                 loaderSize={25}
//                 loaderColor="success"
//                 loaderThickness={5}
//                 startIcon={<DescriptionOutlinedIcon />}




//             />
//              <CustomButton


// variant="outlined"


// type="submit"
// Theme={props.theme}


// loading={false}
// disabled={false}

// loaderSize={25}
// loaderColor="success"
// loaderThickness={5}
// startIcon={<DescriptionOutlinedIcon />}




// />
//             <CustomTabs value={value} onChange={handleChange} tabs={tabs}/>
//         </div>
//     )
// }
import React  from 'react';
// import { Box } from '@mui/material';
// import { connect } from 'react-redux';
// import HowToRegIcon from '@mui/icons-material/HowToReg';
// import LockIcon from '@mui/icons-material/Lock';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import styles from "../../Admin/UserManagement/UserManagement.module.css";
import UserRegistration from '../../Admin/UserManagement/UserRegistration'
import PasswordManagement from '../../Admin/UserManagement/PasswordManagement';
import ActiveDirectoryUser from '../../Admin/UserManagement/ActiveDirectoryUser';
// import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';
import CustomTabs from '../../../components/CustomTabs/CustomTabs';

//   const [value, setValue] = useState(0);
//   const { language } = props;

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

function UserTabs(props) {
  
  const { value, handleChange, tabs } = props; // Destructure props

  return (
    // <h1>Mussafara Riaz </h1>
   
    <CustomTabs value={value} onChange={handleChange} tabs={tabs}    />
  
  );
}

function UserContent(props) {
  const { value, language } = props; // Destructure props

  return (
    <div > {/* Container div */}
      {value === 0 && <UserRegistration />} {/* Render UserRegistration component if value is 0 */}
      {value === 1 && <PasswordManagement />} {/* Render PasswordManagement component if value is 1 */}
      {value === 2 && <ActiveDirectoryUser language={language} />} {/* Render ActiveDirectoryUser component if value is 2 */}
    </div>
  );
}


export {UserTabs,UserContent}
