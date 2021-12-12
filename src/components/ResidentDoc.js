import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import { FiChevronRight } from "react-icons/fi";
import { FcExport, FcUp, FcFile } from "react-icons/fc";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as api from "../api";

const ResidentDoc = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [docs, setDocs] = useState([]);

  const loadDocs = async () => {
    const res = await api.baseUrl.get("get_resident_accounting/");
    setDocs(res.data);
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const columns = [
    {
      title: "Profile",
      field: "customer_profile",
      render: (rowData) => (
        <img
          src={rowData.customer_profile}
          alt="Profile"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "First Name",
      field: "customer.first_name",
    },
    {
      title: "Middle Name",
      field: "customer.middle_name",
    },
    {
      title: "Last Name",
      field: "customer.last_name",
    },
    {
      title: "Email",
      field: "customer.email",
    },
    {
      title: "Status",
      field: "customer.status",
    },
    {
      title: "Account",
      field: "customer.is_active",
      render: (rowData) =>
        rowData.customer.is_active ? (
          <Button
            style={{ color: "white" }}
            size="small"
            color="secondary"
            variant="contained"
          >
            Active
          </Button>
        ) : (
          <Button
            size="small"
            style={{ backgroundColor: "rgba(235, 77, 75,0.9)", color: "white" }}
            variant="contained"
          >
            Not Active
          </Button>
        ),
    },
  ];

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

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Resident Documents"
        data={docs ? docs : docs.display}
        columns={columns}
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
        actions={[
          {
            icon: FcFile,
            tooltip: "View Document",
            onClick: (event, rowData) =>
              history.push(`/view-documents/${rowData.id}`),
          },
        ]}
      />
    </div>
  );
};

export default ResidentDoc;
