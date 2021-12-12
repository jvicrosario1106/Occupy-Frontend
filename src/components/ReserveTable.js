import React, { useState, useEffect } from "react";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import SaveAlt from "@material-ui/icons/SaveAlt";
import MaterialTable from "material-table";
import { FcExport, FcUp } from "react-icons/fc";
import * as api from "../api";
const ResidentTable = () => {
  const [ReservedCustomer, setReservedCustomer] = useState([]);
  //Geting all of Reserved Customers
  const loadReservedUser = async () => {
    const res = await api.baseUrl.get("get_all_customer_reserved/");
    setReservedCustomer(res.data);
  };
  //Geting all of Reserved Customers
  useEffect(() => {
    loadReservedUser();
  }, []);
  const columns = [
    {
      title: "First Name",
      field: "first_name",
    },
    {
      title: "Last Name",
      field: "last_name",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Status",
      field: "status",
    },
    {
      title: "Account",
      field: "is_active",
      render: (rowData) =>
        rowData.is_active ? (
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
  };
  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Reserved Customer"
        data={ReservedCustomer ? ReservedCustomer : ReservedCustomer.display}
        columns={columns}
        options={{
          headerStyle: {
            fontSize: 16,
            fontWeight: 100,
          },
          sorting: true,
          pageSize: 10,
          draggable: true,
          exportButton: true,
          searchAutoFocus: true,
          rowStyle: {
            fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif',
          },
          actionsColumnIndex: -1,
        }}
      />
    </div>
  );
};

export default ResidentTable;
