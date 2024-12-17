import React, { useState } from "react";
import { connect } from "react-redux";
import { Box } from "@mui/material";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import AdminTranslation from "../../../../Utils/AdminTranslation/AdminTranslation";

function Deployment(props) {
  const [tableRowData, setTableRowData] = useState([
    {
      id: "1",
      metamodelId: "EAXEEMM_ARC_01",
      metamodelName: "archimate_metamodel",
      publishedBy: "Framework",
      publishedOn: "2024-10-02 13:39:28",
      deployedBy: "admin@eaxee.com",
      deployedOn: "2024-10-05 12:42:37",
      isDeployed: false,
      version: "v1",
    },
    {
      id: "2",
      metamodelId: "EAXEEMM_TOG_01",
      metamodelName: "togaf_metamodel",
      publishedBy: "Framework",
      publishedOn: "2024-10-08 08:37:58",
      deployedBy: "admin@eaxee.com",
      deployedOn: "2024-10-08 08:38:56",
      isDeployed: true,
      version: "v1",
    },
  ]);

  const handleActionClick = (row) => {
    const updatedRows = tableRowData.map((data) =>
      data.id === row.id
        ? { ...data, isDeployed: !data.isDeployed }
        : data
    );
    setTableRowData(updatedRows);
  };



  const columns = [
    {
      field: "id",
      headerName: props.language === "en" ? "ID" : AdminTranslation["ID"],
      flex: 1,
      hide: true
    },

    {
      field: "metamodelId",
      headerName: props.language === "en" ? "Metamodel Id" : AdminTranslation["Metamodel Id"],
      flex: 1
    },
    {
      field: "metamodelName",
      headerName: props.language === "en" ? "Metamodel Name" : AdminTranslation["Metamodel Name"],
      flex: 1
    },
    {
      field: "publishedBy",
      headerName: props.language === "en" ? "Published By" : AdminTranslation["Published By"],
      flex: 1
    },

    {
      field: "publishedOn",
      headerName: props.language === "en" ? "Published On" : AdminTranslation["Published On"],
      flex: 1
    },
    {
      field: "deployedBy",
      headerName: props.language === "en" ? "Deployed By" : AdminTranslation["Deployed By"],
      flex: 1
    },
    {
      field: "deployedOn",
      headerName: props.language === "en" ? "Deployed On" : AdminTranslation["Deployed On"],
      flex: 1
    },
    {
      field: "version",
      headerName: props.language === "en" ? "Version" : AdminTranslation["Version"],
      flex: 1
    },
    {
      field: "Action",
      headerName: props.language === "en" ? "Action" : AdminTranslation["Action"],
      flex: 1,
      renderCell: (params) => {
        const isDeployed = params.row.status === "DEPLOYED";
        return (
          <CustomButton
            title={isDeployed ? (props.language === "en" ? "Deployed" : AdminTranslation["Deployed"]) : (props.language === "en" ? "Deploy" : AdminTranslation["Deploy"])}

            Theme={props.theme}
            variant="outlined"
            onClick={() => handleActionClick(params.row)}
          />
        );
      },
    },








  ];

  return (
    <Box sx={{ height: "calc(100vh - 100px - 8%)" }}>
      <Box sx={{ margin: "5px", padding: "5px" }}>
        <CustomTable rows={tableRowData} columns={columns} checkBoxSelection={false} />
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(Deployment);
