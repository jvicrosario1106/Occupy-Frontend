import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddReservation from "../components/staff/AddReservation";
import { FcPaid } from "react-icons/fc";
import ListPayments from "../components/ListPayments";
import ResidentAccounts from "../components/ResidentAccounts";
import ReservedAccounts from "../components/ReserveAccounts";
import AccountingResidentChart from "./accounting/AccountingResidentChart";
import AccountingReserveChart from "./accounting/AccountingReserveChart";
import AccountingProof from "./accounting/AccountProof";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import * as api from "../api";
import Title from "./Title";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: 20,
    marginTop: 10,
    flexGrow: 1,
  },
  paper1: {
    padding: 3,
    width: "21vw",
    display: "flex",
  },
  grid1: {
    flexGrow: 1,
  },
  reservation: {
    marginLeft: 10,
  },
}));

const Accounting = () => {
  // Snackbar

  const [payments, setPayments] = useState([]);
  const [residentaccounts, setResidentAccounts] = useState([]);
  const [reserveaccounts, setReserveAccounts] = useState([]);
  const [cancel, setCancel] = useState(false);
  const roleTypes = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();

  const loadPayments = async () => {
    const res = await api.baseUrl.get("get_all_customer_balance/");
    setPayments(res.data);
  };

  const loadAccounts = async () => {
    const res = await api.baseUrl.get("get_resident_accounting/");
    setResidentAccounts(res.data);
  };

  const loadAccountsReserve = async () => {
    const res = await api.baseUrl.get("get_reserved_accounting/");
    setReserveAccounts(res.data);
  };

  useEffect(() => {
    loadPayments();
    loadAccounts();
    loadAccountsReserve();

    if (roleTypes.role === "Client" || roleTypes.role === "Agent") {
      history.push("/home");
    }
  }, []);

  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const verified =
    payments.length > 0 &&
    payments.filter((payment) => payment.status === "Read");
  const unverified =
    payments.length > 0 &&
    payments.filter((payment) => payment.status === "Unread");

  const residentComplete =
    residentaccounts.length > 0 &&
    residentaccounts.filter((payment) => payment.payment_status === "Complete");
  const residentGoing =
    residentaccounts.length > 0 &&
    residentaccounts.filter((payment) => payment.payment_status === "On Going");

  const reserveComplete =
    reserveaccounts.length > 0 &&
    reserveaccounts.filter((payment) => payment.payment_status === "Complete");
  const reserveGoing =
    reserveaccounts.length > 0 &&
    reserveaccounts.filter((payment) => payment.payment_status === "On Going");

  return (
    <div>
      <Title title={"Accounting"} />
      <Container>
        {cancel && (
          <Snackbar open={cancel}>
            <Alert severity="success">Successfully Send Email</Alert>
          </Snackbar>
        )}

        <Grid container>
          <Grid item className={classes.grid1}>
            <Typography className={classes.title} variant="h6" color="primary">
              <Paper className={classes.paper1}>
                <FcPaid size={30} />
                <Typography
                  color="primary"
                  variant="h6"
                  className={classes.reservation}
                >
                  Accounting Management
                </Typography>
              </Paper>
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="center" className={classes.title}>
              {/* <AddReservation
              // setReservedCustomer={setReservedCustomer}
              // ReservedCustomer={ReservedCustomer}
              // isMessage={isMessage}
              /> */}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          style={{ marginBottom: 10 }}
        >
          <Grid item style={{ width: "30%" }}>
            <Paper>
              {residentaccounts.length > 0 && (
                <AccountingResidentChart
                  residentComplete={residentComplete.length}
                  residentGoing={residentGoing.length}
                />
              )}
            </Paper>
          </Grid>
          <Grid item style={{ width: "30%" }}>
            <Paper>
              {reserveaccounts.length > 0 && (
                <AccountingReserveChart
                  reserveComplete={reserveComplete.length}
                  reserveGoing={reserveGoing.length}
                />
              )}
            </Paper>
          </Grid>
          <Grid item style={{ width: "30%" }}>
            <Paper>
              {payments.length > 0 && (
                <AccountingProof
                  verified={verified.length}
                  unverified={unverified.length}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
        <Paper style={{ marginBottom: 15 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label={`Resident Accounts (${residentaccounts.length})`} />
            <Tab label={`Reserved Accounts (${reserveaccounts.length})`} />
            <Tab label={`Proof of Payments (${payments.length})`} />
          </Tabs>
        </Paper>

        <TabPanel value={value} index={0}>
          <ResidentAccounts
            setCancel={setCancel}
            residentaccounts={residentaccounts}
            setResidentAccounts={setResidentAccounts}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ReservedAccounts
            setCancel={setCancel}
            reserveaccounts={reserveaccounts}
            setReserveAccounts={setReserveAccounts}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ListPayments payments={payments} setPayments={setPayments} />
        </TabPanel>
      </Container>
    </div>
  );
  function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <Typography>{children}</Typography>}</div>;
  }
};

export default Accounting;
