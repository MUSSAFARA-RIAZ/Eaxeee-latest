import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@mui/material';
import styles from "./RepositoryManagement.module.css";
import AdminTranslation from '../../../Utils/AdminTranslation/AdminTranslation';
import CustomTabs from '../../../components/CustomTabs/CustomTabs';
import Architecture from './Architecture/Architecture';
import Documents from './Documents/Documents';
import Process from './Process/Process';
import Repository from './Repository/Repository';

function RepositoryTabs(props) {
  const { value, handleChange, tabs, language } = props;
  const isArabic = props.language === 'ar'

  return (
    <div style={{
      position: "relative",


      right: isArabic ? "30px" : undefined,
      left: !isArabic ? "0px" : undefined,


    }}>
      <CustomTabs value={value} onChange={handleChange} tabs={tabs} />
    </div>
  )
}

function RepositoryContent(props) {
  const { language, value } = props;

  return (
    <Box className={styles.repositoryManagementSubTabsGroup}>
      {value === 0 && <Architecture />}
      {value === 1 && <Documents />}
      {value === 2 && <Process />}
      {value === 3 && <Repository />}
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

export { RepositoryManagementTabsConnected as RepositoryTabs, RepositoryManagementContentConnected as RepositoryContent };
