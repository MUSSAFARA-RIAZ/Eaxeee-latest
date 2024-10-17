import React from 'react';
import { connect } from 'react-redux';
import { Box} from '@mui/material';
import styles from "./MetamodelManagement.module.css";
import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';
import CustomTabs from '../../../components/CustomTabs/CustomTabs';
import Architecture from './Deployment/Deployment';
import Documents from './Framework/Framework';
import Process from './Process/Process';

function RepositoryTabs(props) {  
  const { value, handleChange, tabs} = props; 
  console.log("RepositoryMangement Props: ", props);

  return (
    <CustomTabs value={value} onChange={handleChange} tabs={tabs} />
  );
}

function RepositoryContent(props) {
  const { language, value} = props; 

  return (
    <Box className={styles.repositoryManagementSubTabsGroup}>
      {value === 0 && <Architecture />}
      {value === 1 && <Documents />} 
      {value === 2 && <Process />}
    </Box>
  );
}

const mapStateToProps = state => ({
  language: state.language,
  theme: state.theme
});

const mapDispatchToProps = dispatch => ({
  setLanguage: (lang) => dispatch({
      type: "TOGGLELANG",
      value: lang === 'en' ? 'ar' : 'en'
  })
});

// export {RepositoryTabs, RepositoryContent}

const RepositoryManagementTabsConnected = connect(mapStateToProps, mapDispatchToProps)(RepositoryTabs);
const RepositoryManagementContentConnected = connect(mapStateToProps, mapDispatchToProps)(RepositoryContent);

export { RepositoryManagementTabsConnected as RepositoryTabs, RepositoryManagementContentConnected as MetaModelContent };
