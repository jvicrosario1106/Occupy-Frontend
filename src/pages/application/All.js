import React from "react";
import MaterialTable from "material-table";
import Typography from "@material-ui/core/Typography";
import { FcExport, FcUp } from "react-icons/fc";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import {
  FiCheck,
  FiXCircle,
  FiRefreshCw,
  FiTrash,
  FiChevronRight,
} from "react-icons/fi";
import { Button, Container, Divider, Grid, Paper } from "@material-ui/core";
import DetailPanel from "./DetailPanel";

const All = ({
  applicants,
  approvedApplication,
  rejectApplication,
  progressApplication,
  deleteItemApplication,
}) => {
  const roleTypes = JSON.parse(localStorage.getItem("user"));
  const tableIcons = {
    Search: Search,
    Clear: Clear,
    FirstPage: FirstPage,
    LastPage: LastPage,
    PreviousPage: ChevronLeft,
    NextPage: ChevronRight,
    ResetSearch: Clear,
    SortArrow: FcUp,
    Export: FcExport,
    DetailPanel: FiChevronRight,
  };

  const columns = [
    {
      title: "First Name",
      field: "borrower_firstname",
    },
    {
      title: "Middle Name",
      field: "borrower_middlename",
    },
    {
      title: "Last Name",
      field: "borrower_lastname",
    },
    {
      title: "Application Date",
      field: "date_added",
      type: "date",
    },
    {
      title: "Project Type",
      field: "project_type",
    },
    {
      title: "Application Status",
      field: "applicants_status",
      render: (rowData) =>
        rowData.applicants_status === "Pending" ? (
          <Button variant="contained" color="primary" size="small">
            Pending
          </Button>
        ) : rowData.applicants_status === "Approved" ? (
          <Button
            variant="contained"
            color="secondary"
            style={{ color: "white" }}
            size="small"
          >
            Approved
          </Button>
        ) : (
          <Button
            variant="contained"
            style={{
              backgroundColor: "rgba(235, 77, 75,0.9)",
              border: "1px solid rgba(235, 77, 75,0.9)",
              color: "white",
            }}
            size="small"
          >
            Rejected
          </Button>
        ),
    },
  ];

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="List of Applicants"
        data={applicants ? applicants : applicants.display}
        columns={columns}
        editable
        options={{
          headerStyle: {
            fontSize: 16,
            fontWeight: 100,
          },
          sorting: true,
          pageSize: 20,
          draggable: true,
          exportButton: true,
          searchAutoFocus: true,
          rowStyle: {
            fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif',
          },
          actionsColumnIndex: -1,
        }}
        detailPanel={(rowData) => {
          return <DetailPanel rowData={rowData} />;
        }}
        actions={
          roleTypes &&
          roleTypes.role !== "Agent" && [
            {
              icon: FiCheck,
              iconProps: { opacity: 0.6 },
              tooltip: "Approved Application",
              onClick: (event, rowData) =>
                approvedApplication(rowData.id, "Approved"),
            },
            {
              icon: FiXCircle,
              iconProps: { opacity: 0.6 },
              tooltip: "Reject Application",
              onClick: (event, rowData) =>
                rejectApplication(rowData.id, "Rejected"),
            },
            {
              icon: FiRefreshCw,
              iconProps: { opacity: 0.6 },
              tooltip: "Back to Pending",
              onClick: (event, rowData) =>
                progressApplication(rowData.id, "Progress"),
            },
            {
              icon: FiTrash,
              iconProps: { opacity: 0.6 },
              tooltip: "Delete Application",
              onClick: (event, rowData) => deleteItemApplication(rowData.id),
            },
          ]
        }
      />
    </div>
  );
};

export default All;
