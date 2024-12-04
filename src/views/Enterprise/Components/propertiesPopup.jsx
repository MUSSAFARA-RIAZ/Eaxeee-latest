// PropertiesPopup.jsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
// import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import PopupButton from './PopupButton';

const PropertiesPopup = ({ closePropertiesModal, updateTreeState }) => {
  // const { t } = useTranslation();
  // Dummy data from a hook
  const [properties, setProperties] = useState({
    property1: 'Value 1',
    property2: 'Value 2',
    property3: 'Value 3',
  });

  return (
    <div className="popup">
      <div className='popupChildDiv'>
        <Box className='popupHeader' sx={{ backgroundColor: 'primary.main' }}>
          {updateTreeState.action == "show folder properties" ? ("Meta-model Properties") : ("Repository Properties")}          {/* <span>Properties</span> */}
          <div className='popupClose' onClick={closePropertiesModal}></div>
        </Box>
        <div className='propertiesContainer'>
          {Object.entries(properties).map(([key, value]) => (
            <div key={key} className='propertyItem'>
              <span className='propertyName'>{key}:</span>
              <span className='propertyValue'>{value}</span>
            </div>
          ))}
        </div>
        <div className='popupBottomButtonsDiv'>
          <Box>
            {/* <button className="cancelButton" onClick={closePropertiesModal}>{t("Close")}</button> */}
            {/* <Button variant='contained'
              sx={{
                padding: "5px 28px !important",
                borderRadius: "0px !important", 
                // fontWeight: "10px !important",
                fontSize: "12px !important",
                textTransform:"unset"
              }} onClick={closePropertiesModal}>{t("Close")}</Button> */}
          <PopupButton onClick={closePropertiesModal}>{("Close")}</PopupButton>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default PropertiesPopup;