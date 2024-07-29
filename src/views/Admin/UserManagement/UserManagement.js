import React from "react";
// import styles from "./UserManagement.module.css";
import UserRegistration from "./UserRegistration";
import PasswordManagement from "./PasswordManagement";
import DirectoryUser from "./DirectoryUser";
import CustomTabs from "../../../components/CustomTabs/CustomTabs";

function UserTabs(props) {
  const { value, handleChange, tabs } = props;

  return <CustomTabs value={value} onChange={handleChange} tabs={tabs} />;
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
