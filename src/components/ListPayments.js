import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { FiChevronRight } from "react-icons/fi";
import { FcExport, FcUp, FcAnswers } from "react-icons/fc";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { useDispatch } from "react-redux";
import { customerPaymentStatus, updateProof } from "../actions/customer";
import * as api from "../api";

const ListPayments = ({ payments, setPayments }) => {
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Transaction Type",
      field: "transactions.name",
    },
    {
      title: "Paid by",
      field: "customer_payment.email",
    },
    {
      title: "Payment Date",
      field: "date_added",
      type: "date",
    },
    {
      title: "Amount Paid",
      field: "amount",
    },
    {
      title: "Advance Payment",
      field: "advance",
      render: (rowData) =>
        rowData.advance > 0 ? (
          <Typography>{Number(rowData.advance) - 1} Months</Typography>
        ) : (
          <Typography>{rowData.advance} Month</Typography>
        ),
    },
    {
      title: "Status",
      field: "status",
      render: (rowData) =>
        rowData.status === "Read" ? (
          <Button
            style={{ color: "white" }}
            size="small"
            color="secondary"
            variant="contained"
          >
            Verified
          </Button>
        ) : (
          <Button
            size="small"
            style={{ backgroundColor: "rgba(235, 77, 75,0.9)", color: "white" }}
            variant="contained"
          >
            Unverified
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

  const updatePaymentStatus = (id, status, advance, customer, name) => {
    // const confirm = window.confirm();
    const isStatus = status === "Unread" ? "Unverified" : "Verified";
    const confirm = window.confirm(
      `📢 INFO: Are you sure you want to update payment status to ${isStatus}? It will send notification via email and sms to customer`
    );
    const payment_id = payments.map((payment) =>
      payment.id === id ? { ...payment, status: status } : payment
    );
    if (confirm) {
      dispatch(
        updateProof(
          JSON.stringify({
            id: id,
            status: status,
            advance: advance,
            user: customer,
            name: name,
          })
        )
      );
      setPayments(payment_id);
    }
  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="List of Customer Payments"
        data={payments ? payments : payments.display}
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
        detailPanel={(rowData) => {
          return (
            <Typography align="center">
              <img src={rowData.image_receipt} width="60%" alt="" />
              <Typography>{rowData.comments && rowData.comments}</Typography>
            </Typography>
          );
        }}
        actions={[
          {
            icon: FcAnswers,
            tooltip: "Update Payment Status",
            onClick: (event, rowData) =>
              rowData.status === "Unread"
                ? updatePaymentStatus(
                    rowData.id,
                    "Read",
                    rowData.advance,
                    rowData.customer_payment.id,
                    rowData.transactions.name
                  )
                : updatePaymentStatus(
                    rowData.id,
                    "Unread",
                    rowData.advance,
                    rowData.customer_payment.id,
                    rowData.transactions.name
                  ),
          },
        ]}
      />
    </div>
  );
};

export default ListPayments;
