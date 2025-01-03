import React from "react";

import CustomTabs from "../../../components/CustomTabs/CustomTabs";
// import LayerRegistration from "./LayerRegistration";
import ElementRegistration from "./RelationShipRegistration";
import RelationShipRegistration from "./RelationShipRegistration";
function RelationShipTabs(props) {
  
  const { value, handleChange, tabs , language,open } = props;

  console.log("value",value);

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

function RelationShipContent() {
 

  return (
    <div>
      {<RelationShipRegistration/>}
     
    </div>
  );
}

export {RelationShipTabs,RelationShipContent};
