import React, { useEffect } from "react";
import MaterialTable from "material-table";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { FiChevronRight } from "react-icons/fi";
import { FcExport, FcUp, FcAnswers } from "react-icons/fc";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { customerPaymentStatus } from "../actions/customer";
import { useDispatch } from "react-redux";

const ProofPayments = ({
  proofPayments,
  setProofPayments,
  generate,
  setGenerate,
}) => {
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Transaction Type",
      field: "transactions.name",
    },
    {
      title: "Reference #",
      field: "reference_number",
    },
    {
      title: "Original Receipt",
      field: "or_number",
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
      title: "Payment Status",
      field: "status",
      render: (rowData) =>
        rowData.status === "Unread" ? (
          <Button
            size="small"
            style={{ backgroundColor: "rgba(235, 77, 75,0.9)", color: "white" }}
            variant="contained"
          >
            Unverified
          </Button>
        ) : (
          <Button
            style={{ color: "white" }}
            size="small"
            color="secondary"
            variant="contained"
          >
            Verified
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

  const updatePaymentStatus = (id, status, paid, advanced, name) => {
    // const confirm = window.confirm();
    const isStatus = status === "Unread" ? "Unverified" : "Verified";
    const confirm = window.confirm(
      `📢 INFO: Are you sure you want to update payment status to ${isStatus}? It will send notification via email and sms to customer`
    );
    const payment_id = proofPayments.map((payment) =>
      payment.id === id ? { ...payment, status: status } : payment
    );
    if (confirm) {
      if (advanced > 0) {
        const getId =
          generate.length > 0 && status === "Unread"
            ? generate
                .filter((data) => data.code === "MA" || data.code === "DP")
                .filter((statuses) => statuses.paid_status === "Paid")
                .splice(-Math.abs(advanced))
                .map((stats) => stats.id)
            : generate
                .filter((data) => data.code === "MA" || data.code === "DP")
                .filter((statuses) => statuses.paid_status === "Unpaid")
                .splice(0, advanced)
                .map((stats) => stats.id);

        const updateStatus =
          generate.length > 0 && status === "Read"
            ? generate.map((item) =>
                getId.includes(item.id)
                  ? {
                      ...item,
                      paid_status: paid,
                      remarks: "Paid",
                    }
                  : item
              )
            : generate.map((item) =>
                getId.includes(item.id)
                  ? {
                      ...item,
                      paid_status: paid,
                      remarks: "In Progress",
                    }
                  : item
              );

        dispatch(
          customerPaymentStatus(
            JSON.stringify({ id: id, status: status, ma: getId })
          )
        );

        setGenerate(updateStatus);
        setProofPayments(payment_id);
      } else {
        var code;

        if (name === "Reservation fee") {
          code = "RF";
        } else if (name === "Downpayment") {
          code = "DP";
        } else if (name === "Monthly Amortization") {
          code = "MA";
        } else if (name === "Financing charges (HDMF / Bank fees)") {
          code = "FC";
        } else if (name === "Construction bond") {
          code = "CB";
        } else if (name === "Move In fee") {
          code = "MIF";
        } else if (name === "Admin and transfer fees") {
          code = "ATF";
        } else if (name === "Loan take out") {
          code = "LTO";
        } else if (name === "Advance Payment ( DP and MA )") {
          code = "Advance Payment ( DP and MA )";
        } else {
          code = "";
        }

        const updateOne =
          generate.length > 0 && status === "Read"
            ? generate.filter(
                (ledge) => ledge.code === code && ledge.paid_status === "Unpaid"
              )[0]
            : generate.filter(
                (ledge) => ledge.code === code && ledge.paid_status === "Paid"
              )[0];

        const allGenerate =
          updateOne && status === "Read"
            ? generate.map((gen) =>
                gen.id === updateOne.id
                  ? { ...gen, paid_status: paid, remarks: "Paid" }
                  : gen
              )
            : generate.map((gen) =>
                gen.id === updateOne.id
                  ? { ...gen, paid_status: paid, remarks: "In Progress" }
                  : gen
              );

        setGenerate(allGenerate);
        setProofPayments(payment_id);
        dispatch(
          customerPaymentStatus(
            JSON.stringify({
              id: id,
              status: status,
              getId: updateOne && updateOne.id,
            })
          )
        );
      }
    }
  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Proof of Payments"
        data={proofPayments ? proofPayments : proofPayments.display}
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
                    "Paid",
                    rowData.advance,
                    rowData.transactions.name
                  )
                : updatePaymentStatus(
                    rowData.id,
                    "Unread",
                    "Unpaid",
                    rowData.advance,
                    rowData.transactions.name
                  ),
          },
        ]}
      />
    </div>
  );
};

export default ProofPayments;
