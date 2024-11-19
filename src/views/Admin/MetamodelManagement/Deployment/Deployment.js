import React, { useState } from "react";
import { connect } from "react-redux";
import { Box } from "@mui/material";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import CustomButton from "../../../../components/CustomButton/CustomButton";

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
    { field: "id", headerName: "ID", flex: 1, hide: true },
    { field: "metamodelId", headerName: "Metamodel Id", flex: 1 },
    { field: "metamodelName", headerName: "Metamodel Name", flex: 1 },
    { field: "publishedBy", headerName: "Published By", flex: 1 },
    { field: "publishedOn", headerName: "Published On", flex: 1 },
    { field: "deployedBy", headerName: "Deployed By", flex: 1 },
    { field: "deployedOn", headerName: "Deployed On", flex: 1 },
    { field: "version", headerName: "Version", flex: 1 },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        const isDeployed = params.row.isDeployed;
        return (
          <CustomButton
            title={isDeployed ? "Deployed" : "Deploy"}
            Theme={isDeployed ? "success" : "default"}
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
