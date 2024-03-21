import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Messagesection() {
  return (
    <div
      style={{
        height: "100%",
      
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#0d7e8a",
          // border:"1px solid yellow",
          borderTopLeftRadius:"10px",
          borderTopRightRadius:"10px"
          

       //   borderRadius: "5px",
          // height:"100%"
        }}
      >
        <Box
          style={{
            display: "flex",
            // alignItems: "center",
            justifyContent: "center",
            padding: "0px 15px",
            height: "40px",
            //verticalAlign:"middle",
          }}
        >
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
            }}
          >
            {/* <h3 style={{ color: "white", }}>Message</h3> */}
            Message
          </Typography>
        </Box>
      </Box>

      <div
        style={{
          padding: "10px 15px",
          textAlign: "justify",
          overflowY: "auto",
        //  border:"2px solid purple",
          borderBottomLeftRadius:"10px",
          borderBottomRightRadius:"10px",
         
          height: "calc(100% - 40px)",
          
          // height:"calc(100% - 300px)",
         
       //   height:"441px",

        // height: "calc(100% - 441px)",
          // maxHeight:"calc(50px-20px)",
          //   maxHeight: "200px",
         // border: "1px solid ",
        //  white: #ffffff
        //  grey: eff3f7
     
        //  charcoal grey: #36454f OR Medium charcoal: #656e6b  OR Medium 2 
        //  Charcoal: #525858 or Light Charcoal: #757E7D
       //  grey: #e8ecef 
          scrollbarWidth: "thin",
          scrollbarColor: "#36454f #eff3f7",
          scrollbarTrackColor: "#cceaed",

          "&::-webkit-scrollbar": {
            width: "8px",
            backgroundColor: "#eff3f7",
            borderRadius: "30px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#36454f",
            borderRadius: "30px",
          },
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id
        lacus non justo scelerisque vehicula. Integer tincidunt accumsan lectus,
        id mollis velit viverra eget. Proin sit amet risus in ipsum aliquet
        fringilla. Nulla facilisi. Donec eget nisi in elit tempor laoreet.
        Vivamus ut metus et justo feugiat vestibulum. Sed vitae vestibulum eros.
        Sed commodo tellus vel leo ultricies, ac dignissim libero sodales. Ut
        eget ante vitae arcu bibendum accumsan. Sed nec congue dui. Cras in
        justo sit amet elit ultricies dignissim. Integer auctor libero vitae
        neque tempus, eu ullamcorper lacus eleifend. Sed vitae urna nec ipsum
        cursus hendrerit. Suspendisse ac velit at purus dapibus tincidunt. Sed
        eget felis eu libero laoreet rutrum eget nec ex. Vivamus eget
        ullamcorper mauris. Phasellus a fermentum tortor. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Fusce sagittis arcu ut eros maximus,
        non scelerisque magna rhoncus. Ut sed velit a lectus eleifend fermentum.
        Ut posuere tortor sed venenatis aliquam. Pellentesque id ante a nisi
        vehicula suscipit. Nulla facilisi. Nam sollicitudin dui eget nunc
        placerat, non fringilla felis efficitur. Integer finibus, nisi eget
        fringilla dictum, nulla ligula convallis ipsum, ac varius est metus ac
        eros. Aliquam sed purus quis odio blandit vestibulum. Fusce nec quam
        quam. Duis non lectus eget elit finibus suscipit id eu justo. Cras
        maximus quam ac est rhoncus, at commodo velit tristique. Donec rutrum
        felis ac bibendum suscipit. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nullam auctor, risus vel luctus faucibus, metus mauris
        vehicula odio, sed euismod quam tortor ut mauris. Cras ac scelerisque
        risus, nec ullamcorper sem. Nullam lacinia id sapien eu consectetur.
        Aliquam lobortis justo sed quam gravida, ut tincidunt lorem consequat.
        Ut fermentum, risus nec tristique feugiat, odio ipsum elementum metus,
        nec ultricies magna diam vitae est. Vestibulum dapibus tincidunt
        hendrerit. Cras at volutpat velit. Duis pulvinar nisl vitae ante
        tristique, sed gravida nisi commodo. Nulla facilisi. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Suspendisse potenti. Sed quis
        quam sit amet justo pharetra tristique. Integer lacinia est sed lorem
        vehicula, vitae placerat velit vehicula. Morbi in arcu diam. Sed aliquet
        nibh quis urna scelerisque aliquam. Pellentesque habitant morbi
        tristique senectus et netus et malesuada fames ac turpis egestas. Nam
        quis odio aliquam, ultricies nisl vel, tristique ligula. Aenean vel elit
        a turpis consectetur dictum. Nulla facilisi. Duis ut nisl eget mauris v
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id
        lacus non justo scelerisque vehicula. Integer tincidunt accumsan lectus,
        id mollis velit viverra eget. Proin sit amet risus in ipsum aliquet
        fringilla. Nulla facilisi. Donec eget nisi in elit tempor laoreet.
        Vivamus ut metus et justo feugiat vestibulum. Sed vitae vestibulum eros.
        Sed commodo tellus vel leo ultricies, ac dignissim libero sodales. Ut
        eget ante vitae arcu bibendum accumsan. Sed nec congue dui. Cras in
        justo sit amet elit ultricies dignissim. Integer auctor libero vitae
        neque tempus, eu ullamcorper lacus eleifend. Sed vitae urna nec ipsum
        cursus hendrerit. Suspendisse ac velit at purus dapibus tincidunt. Sed
        eget felis eu libero laoreet rutrum eget nec ex. Vivamus eget
        ullamcorper mauris. Phasellus a fermentum tortor. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Fusce sagittis arcu ut eros maximus,
        non scelerisque magna rhoncus. Ut sed velit a lectus eleifend fermentum.
        Ut posuere tortor sed venenatis aliquam. Pellentesque id ante a nisi
        vehicula suscipit. Nulla facilisi. Nam sollicitudin dui eget nunc
        placerat, non fringilla felis efficitur. Integer finibus, nisi eget
        fringilla dictum, nulla ligula convallis ipsum, ac varius est metus ac
        eros. Aliquam sed purus quis odio blandit vestibulum. Fusce nec quam
        quam. Duis non lectus eget elit finibus suscipit id eu justo. Cras
        maximus quam ac est rhoncus, at commodo velit tristique. Donec rutrum
        felis ac bibendum suscipit. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nullam auctor, risus vel luctus faucibus, metus mauris
        vehicula odio, sed euismod quam tortor ut mauris. Cras ac scelerisque
        risus, nec ullamcorper sem. Nullam lacinia id sapien eu consectetur.
        Aliquam lobortis justo sed quam gravida, ut tincidunt lorem consequat.
        Ut fermentum, risus nec tristique feugiat, odio ipsum elementum metus,
        nec ultricies magna diam vitae est. Vestibulum dapibus tincidunt
        hendrerit. Cras at volutpat velit. Duis pulvinar nisl vitae ante
        tristique, sed gravida nisi commodo. Nulla facilisi. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Suspendisse potenti. Sed quis
        quam sit amet justo pharetra tristique. Integer lacinia est sed lorem
        vehicula, vitae placerat velit vehicula. Morbi in arcu diam. Sed aliquet
        nibh quis urna scelerisque aliquam. Pellentesque habitant morbi
        tristique senectus et netus et malesuada fames ac turpis egestas. Nam
        quis odio aliquam, ultricies nisl vel, tristique ligula. Aenean vel elit
        a turpis consectetur dictum. Nulla facilisi. Duis ut nisl eget mauris v
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id
        lacus non justo scelerisque vehicula. Integer tincidunt accumsan lectus,
        id mollis velit viverra eget. Proin sit amet risus in ipsum aliquet
        fringilla. Nulla facilisi. Donec eget nisi in elit tempor laoreet.
        Vivamus ut metus et justo feugiat vestibulum. Sed vitae vestibulum eros.
        Sed commodo tellus vel leo ultricies, ac dignissim libero sodales. Ut
        eget ante vitae arcu bibendum accumsan. Sed nec congue dui. Cras in
        justo sit amet elit ultricies dignissim. Integer auctor libero vitae
        neque tempus, eu ullamcorper lacus eleifend. Sed vitae urna nec ipsum
        cursus hendrerit. Suspendisse ac velit at purus dapibus tincidunt. Sed
        eget felis eu libero laoreet rutrum eget nec ex. Vivamus eget
        ullamcorper mauris. Phasellus a fermentum tortor. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Fusce sagittis arcu ut eros maximus,
        non scelerisque magna rhoncus. Ut sed velit a lectus eleifend fermentum.
        Ut posuere tortor sed venenatis aliquam. Pellentesque id ante a nisi
        vehicula suscipit. Nulla facilisi. Nam sollicitudin dui eget nunc
        placerat, non fringilla felis efficitur. Integer finibus, nisi eget
        fringilla dictum, nulla ligula convallis ipsum, ac varius est metus ac
        eros. Aliquam sed purus quis odio blandit vestibulum. Fusce nec quam
        quam. Duis non lectus eget elit finibus suscipit id eu justo. Cras
        maximus quam ac est rhoncus, at commodo velit tristique. Donec rutrum
        felis ac bibendum suscipit. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nullam auctor, risus vel luctus faucibus, metus mauris
        vehicula odio, sed euismod quam tortor ut mauris. Cras ac scelerisque
        risus, nec ullamcorper sem. Nullam lacinia id sapien eu consectetur.
      </div>
    </div>
  );
}
