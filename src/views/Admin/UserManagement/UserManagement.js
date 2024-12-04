import React from "react";
// import styles from "./UserManagement.module.css";
import UserRegistration from "./UserRegistration";
import PasswordManagement from "./PasswordManagement";
import DirectoryUser from "./DirectoryUser";
import CustomTabs from "../../../components/CustomTabs/CustomTabs";
function UserTabs(props) {
  
  const { value, handleChange, tabs , language,open } = props;
  const isArabic=props.language==='ar'

  console.log("open state", open);


  return (
    <div style={{ position: "relative",
    
    
      // right: (!open && isArabic) ? "100px" : undefined,
      right:(!open && isArabic)?"100px":(isArabic)?"30px":undefined,
      left: !isArabic ? "0px" : undefined,
       
       
        }}>
        <CustomTabs value={value} onChange={handleChange} tabs={tabs} />
      </div>
  )
}

function UserContent(props) {
  const { value} = props; 

  return (
    <div>
      {value === 0 && <UserRegistration />}
      {value === 1 && <PasswordManagement />}
      {value === 2 && <DirectoryUser />}
    </div>
  );
}

export { UserTabs, UserContent };
