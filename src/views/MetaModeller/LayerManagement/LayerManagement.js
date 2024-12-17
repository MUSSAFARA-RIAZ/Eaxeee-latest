import React from "react";

import CustomTabs from "../../../components/CustomTabs/CustomTabs";
import LayerRegistration from "./LayerRegistration";
function LayerTabs(props) {
  
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

function LayerContent() {
  

  return (
    <div>
      {<LayerRegistration />}
      {/* {value === 1 && <PasswordManagement />}
      {value === 2 && <DirectoryUser />} */}
    </div>
  );
}

export { LayerTabs, LayerContent};
