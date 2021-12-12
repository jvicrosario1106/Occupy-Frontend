import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ReactoPrint from "react-to-print";
import { makeStyles } from "@material-ui/core";
import { FcExport, FcUp, FcRules, FcNext } from "react-icons/fc";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { useHistory } from "react-router-dom";
import { FiEye, FiEyeOff, FiChevronRight } from "react-icons/fi";
import * as api from "../../api";
import Title from "../Title";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: 20,
    marginTop: 10,
    flexGrow: 1,
  },
  paper1: {
    padding: 3,
    width: "19vw",
    display: "flex",
  },
  paper2: {
    padding: 3,
    width: "13vw",
    display: "flex",
  },
  grid1: {
    flexGrow: 1,
  },
  reservation: {
    marginLeft: 10,
  },
}));

const PaymentHistory = () => {
  const classes = useStyles();
  const history = useHistory();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user && user.id;

  const loadPaymentHistory = async () => {
    const res = await api.baseUrl.get(`get_payment_history/${userId}/`);
    setPaymentHistory(res.data);
  };

  useEffect(() => {
    loadPaymentHistory();

    if (
      user.role === "Admin" ||
      user.role === "Staff" ||
      user.role === "Agent" ||
      user.role === "Manager"
    ) {
      history.push("/home");
    }
  }, []);

  const Unread = paymentHistory.filter((unread) => unread.status == "Unread");
  const Read = paymentHistory.filter((unread) => unread.status == "Read");

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

  return (
    <div>
      <Title title={"Payment History"} />
      <Container style={{ minHeight: "90vh" }}>
        <Grid container spacing={2}>
          <Grid item className={classes.grid1}>
            <Typography className={classes.title} variant="h6" color="primary">
              <Paper className={classes.paper1}>
                <FcRules size={30} />
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.reservation}
                >
                  Your Payment History ({paymentHistory.length})
                </Typography>
              </Paper>
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.title} variant="h6" color="primary">
              <Paper className={classes.paper2}>
                <FiEyeOff size={25} />
                <Typography variant="body1" className={classes.reservation}>
                  Unverified ({Unread.length})
                </Typography>
              </Paper>
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.title} variant="h6" color="primary">
              <Paper className={classes.paper2}>
                <FiEye size={25} />
                <Typography variant="body1" className={classes.reservation}>
                  Verified ({Read.length})
                </Typography>
              </Paper>
            </Typography>
          </Grid>
        </Grid>

        <MaterialTable
          icons={tableIcons}
          title="Payment History"
          data={paymentHistory ? paymentHistory : paymentHistory.display}
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
        />
      </Container>
    </div>
  );
};

export default PaymentHistory;
