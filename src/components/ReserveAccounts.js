import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import { FiChevronRight } from "react-icons/fi";
import {
  FcExport,
  FcUp,
  FcAnswers,
  FcBinoculars,
  FcMediumPriority,
} from "react-icons/fc";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { updatecustomerPaymentStatus, sendCancel } from "../actions/customer";
import * as api from "../api";

const ReservedAccounts = ({
  reserveaccounts,
  setReserveAccounts,
  setCancel,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const statusChange = (id, status) => {
    const changeStatus = reserveaccounts.map((res) =>
      res.id === id ? { ...res, payment_status: status } : res
    );

    const confirm = window.confirm(
      `Are you sure you want to update customer's payment status to ${status}? This will send email message to customer`
    );
    if (confirm) {
      dispatch(
        updatecustomerPaymentStatus(JSON.stringify({ id: id, status: status }))
      );
      setReserveAccounts(changeStatus);
    }
  };

  const cancelContract = (id) => {
    const confirm = window.confirm(
      "This will send email to customer about the cancelation of contract"
    );
    if (confirm) {
      dispatch(sendCancel(id));
      setCancel(true);
      setTimeout(() => {
        setCancel(false);
      }, 6000);
    }
  };

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
      title: "Last Name",
      field: "customer.last_name",
    },
    {
      title: "Email",
      field: "customer.email",
    },
    {
      title: "Payment Status",
      field: "payment_status",
      render: (rowData) =>
        rowData.payment_status === "Complete" ? (
          <Button
            style={{ color: "white" }}
            size="small"
            color="secondary"
            variant="contained"
          >
            Complete
          </Button>
        ) : (
          <Button size="small" color="primary" variant="contained">
            On-Going
          </Button>
        ),
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
        title="Customer Accounts"
        data={reserveaccounts ? reserveaccounts : reserveaccounts.display}
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
            icon: FcBinoculars,
            tooltip: "View Account",
            onClick: (event, rowData) =>
              history.push(`/view-accounting/${rowData.customer.id}`),
          },
          {
            icon: FcAnswers,
            tooltip: "Update Payment Status",
            onClick: (event, rowData) => {
              rowData.payment_status === "Complete"
                ? statusChange(rowData.id, "On Going")
                : statusChange(rowData.id, "Complete");
            },
          },
          {
            icon: FcMediumPriority,
            tooltip: "Cancelation of Contract",
            onClick: (event, rowData) => cancelContract(rowData.customer.id),
          },
        ]}
      />
    </div>
  );
};

export default ReservedAccounts;
