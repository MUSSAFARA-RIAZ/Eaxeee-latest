import React from "react";
import ImpexDefaultTheme from "../ImpexComponents/ImpexDefault.module.css";
import ImpexDarkTheme from "../ImpexComponents/ImpexDark.module.css";
import ImpexLightTheme from "../ImpexComponents/ImpexLight.module.css";
import DownloadIcon from "@mui/icons-material/Download";

import { Box } from "@mui/system";
export default function Messagesection({ props }) {
  return (
    <div
      style={{
        height: props.adjustHeight,
        overflowY: "auto",
      }}
    >
      <div
        className={`${
          props.theme === "default"
            ? ImpexDefaultTheme.Impex_Messagesection_Header
            : props.theme === "light"
            ? ImpexLightTheme.Impex_Messagesection_Header
            : ImpexDarkTheme.Impex_Messagesection_Header
        }`}
      >
        <p style={{ fontSize: "20px", padding: "5px 10px" }}>
          Message
          <DownloadIcon
            sx={{ float: "right", position: "relative", top: "5px" }}
          />
        </p>
      </div>

      <Box className={`${
          props.theme === "default"
            ? ImpexDefaultTheme.Impex_Messagesection_Body
            : props.theme === "light"
            ? ImpexLightTheme.Impex_Messagesection_Body
            : ImpexDarkTheme.Impex_Messagesection_Body
        }`}
        sx={{
          padding: "10px 10px",
          textAlign: "justify",
          overflowY: "auto",
          height: "calc(100vh - 200px)",
          borderRadius: "20px",
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            background:
              props.theme === "default"
                ? "#cecece"
                : props.theme === "light"
                ? "#eff3f7"
                : "#212121",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background:
              props.theme === "default"
                ? "#2158a4"
                : props.theme === "light"
                ? "#cbd0d7"
                : "#cecece",
            borderRadius: "10px",
          },
        }}
      >
        <p className="scroll-demo">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac
          felis ut dui fringilla rutrum. Sed ut bibendum nibh. Integer facilisis
          nibh in ex luctus, vitae sollicitudin justo congue. Quisque quis arcu
          ligula. Nunc tincidunt metus eget est bibendum, nec efficitur ligula
          varius. Integer auctor ante nec dolor hendrerit, vel laoreet ligula
          laoreet. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Cras dapibus odio nec turpis
          efficitur tempus. Vestibulum ante ipsum primis in faucibus orci luctus
          et ultrices posuere cubilia Curae; Nullam at vestibulum velit. Donec
          interdum velit nec metus scelerisque, quis congue velit tempor.
          Vivamus efficitur ligula sit amet sapien varius faucibus. Proin
          vehicula magna a lorem molestie, eu eleifend magna volutpat. Vivamus
          auctor leo velit, id mattis odio dapibus in. Nam tincidunt interdum
          nisi, id varius ex tristique eget. Fusce vestibulum lacus id urna
          mattis, eu sodales nulla feugiat. Sed eget sodales mauris. Fusce
          placerat orci eu nisl eleifend, sit amet venenatis mi volutpat. Nulla
          dictum lectus eget nunc rutrum bibendum. Integer sed enim ultricies,
          consequat odio vitae, mattis purus. Nullam at magna vel magna
          consequat vehicula. Cras quis augue tellus. Sed consequat felis non
          nunc varius, eu commodo urna molestie. Duis tempor eros ac enim
          interdum, nec gravida leo cursus. Suspendisse potenti. Maecenas
          tincidunt mi sed ipsum pharetra faucibus. In hac habitasse platea
          dictumst. Nulla sit amet sodales elit. Vivamus nec diam consectetur,
          posuere felis a, vulputate lorem. Suspendisse ultricies vitae ipsum ut
          vehicula. Maecenas id feugiat neque. Curabitur pulvinar neque id magna
          pulvinar ultricies. Sed eleifend ante ac leo dignissim, id eleifend
          metus tempor. Morbi mattis ipsum vitae risus ultricies, vitae
          ullamcorper urna ultricies. Integer pharetra augue vel turpis tempor,
          quis suscipit sapien tincidunt. Nulla facilisi. Integer eu libero a
          est bibendum molestie. Donec eu velit risus. In hac habitasse platea
          dictumst. Nullam quis nisi odio. Integer ultricies mauris ut ex
          laoreet eleifend. Maecenas convallis lorem a est ultricies, at
          sollicitudin arcu commodo. Suspendisse ullamcorper ex sit amet nulla
          dapibus, vitae faucibus justo volutpat. Phasellus non augue nec nisl
          consectetur cursus. Nullam finibus fermentum velit. Vivamus sodales
          dolor magna, a tincidunt libero aliquet ut. Phasellus quis tellus quis
          metus consequat mattis. Vivamus ut mauris eget justo laoreet
          fermentum. Sed condimentum nisl eu lacus gravida, ac gravida nibh
          sodales. Curabitur tincidunt mi nec justo scelerisque suscipit.
          Vestibulum ut ligula ut nisi hendrerit ultricies nec eu erat. Nullam
          consequat tincidunt nibh, ut tincidunt mi auctor nec. Proin nec dictum
          nisl. Aenean eget mi hendrerit, ultricies diam ac, feugiat lacus. In
          consectetur est non volutpat feugiat. Vivamus auctor, velit et
          tincidunt pharetra, sapien nisi porta purus, nec congue sem enim et
          magna. Maecenas vel lobortis neque. Integer consectetur velit non odio
          feugiat, id tempor tortor tincidunt. Donec at velit nec lorem
          consequat viverra. Vivamus fermentum libero a eros cursus, nec gravida
          eros cursus. Curabitur commodo purus eget quam iaculis aliquam. Donec
          eget elit mauris. Fusce nec ipsum in nisi suscipit hendrerit.
          Suspendisse sed tortor et neque dictum ullamcorper. Curabitur id
          luctus metus. Nullam et vehicula nunc, id fermentum magna. Proin
          interdum justo magna, eget feugiat libero rutrum et. Nam consequat
          justo eu magna scelerisque dictum. Mauris consequat quam ac nisi
          feugiat condimentum. Vivamus accumsan purus ut eros posuere, non
          tincidunt turpis volutpat. Nullam finibus dui at dapibus feugiat. Cras
          fermentum magna nec diam ullamcorper commodo. Vivamus sodales sagittis
          aliquet. Nam sit amet felis ligula. Sed commodo justo quis feugiat
          volutpat. Vivamus eget massa nec tortor facilisis vehicula. Integer
          sodales augue vel massa fermentum ullamcorper. Phasellus ut diam a
          nunc lacinia ultricies. Sed in ligula metus. Morbi fringilla
          scelerisque risus, non scelerisque lorem congue in. Nam sed velit quis
          est luctus tincidunt. Pellentesque sollicitudin lacus sit amet augue
          ultricies, eget vehicula risus placerat. Aenean consequat ullamcorper
          urna id blandit. Mauris nec diam vitae dolor vestibulum accumsan.
          Vivamus ut velit
        </p>
      </Box>
    </div>
  );
}
