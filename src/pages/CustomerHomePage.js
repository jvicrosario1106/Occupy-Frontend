import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { Button, makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import * as api from "../api";
import moment from "moment";
import Title from "./Title";
import {
  FiMousePointer,
  FiMail,
  FiHome,
  FiBox,
  FiBookmark,
  FiMapPin,
  FiCalendar,
  FiClipboard,
  FiTag,
} from "react-icons/fi";
import { loadUser, verifyUser } from "../actions/auth";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper1: {
    padding: 30,
    width: "74vw",
    margin: "20px 0px",
    borderTop: "3px solid #8E30FF",
  },
  paper2: {
    marginBottom: "10px",
    height: 400,
    padding: 16,
  },
  paper3: {
    width: "30vw",
    height: 400,
    // margin: 10,
    padding: 16,
  },
  customerdetails: {
    display: "flex",

    margin: "3px",
    padding: 10,
  },
  button: {
    margin: "30px 0px",
  },
  amount: {
    marginTop: 30,
  },
  title: {
    background: theme.palette.primary.main,
    color: "white",
    padding: 3,
    borderRadius: "5px",
    textAlign: "center",
  },
}));

const Balance = () => {
  const classes = useStyles();
  const history = useHistory();
  const [customer, setCustomer] = useState([]);
  const [balance, setBalance] = useState(null);
  const [penalty, setPenalty] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user && user.id;
  const dispatch = useDispatch();

  const loadCustomer = async () => {
    const res = await api.baseUrl.get(`get_one_customer/${user.id}/`);
    setCustomer(res.data);
  };

  const loadBalance = async () => {
    const res = await api.baseUrl.get(`customer_homepage/${user.id}/`);
    setBalance(res.data.balance);
    setPenalty(res.data.penalty);
  };

  useEffect(() => {
    dispatch(verifyUser());
    dispatch(loadUser());
    loadCustomer();
    loadBalance();
  }, [userId]);

  console.log(customer);

  return (
    <div>
      <Title title={"Home"} />
      <Container>
        <Grid container>
          <Grid item>
            <Paper className={classes.paper1}>
              <Typography align="right">
                <img src="img/occupy.png" width="10%" alt="" />
              </Typography>
              {customer.length > 0 && (
                <Typography variant="h2" color="primary" align="center">
                  👋🏻 Hello, {customer[0].customer.first_name}
                </Typography>
              )}

              {customer.length > 0 && (
                <Typography
                  variant="h6"
                  align="center"
                  style={{ opacity: 0.6 }}
                >
                  Welcome to your Occupy Portal Account. Your last login was on{" "}
                  {moment(customer[0].customer.last_login).fromNow()} 💻
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          style={{ minHeight: "50vh" }}
          spacing={3}
        >
          {customer.length > 0 && (
            <Grid item>
              <Paper className={classes.paper2}>
                <Typography align="center" className={classes.amount}>
                  {customer[0].payment_status !== null &&
                  customer[0].payment_status === "Complete" ? (
                    <Button variant="outlined" color="secondary" size="small">
                      {customer[0].payment_status} Payments 🏆
                    </Button>
                  ) : (
                    <Button variant="outlined" color="primary" size="small">
                      {customer[0].payment_status !== null &&
                        customer[0].payment_status}{" "}
                      Payments ⏳
                    </Button>
                  )}
                  {balance && (
                    <Typography variant="h6" style={{ marginTop: 10 }}>
                      RUNNING BALANCE ({balance.code})
                    </Typography>
                  )}

                  {balance && (
                    <Typography variant="h2">
                      ₱{" "}
                      {new Intl.NumberFormat().format(balance.running_balance)}
                    </Typography>
                  )}
                  {balance && (
                    <Typography variant="subtitle1">
                      DUE DATE {new Date(balance.due_date).toDateString()}
                    </Typography>
                  )}

                  {balance && (
                    <Typography variant="subtitle1">
                      Penalty:{" "}
                      {typeof penalty === "string"
                        ? penalty
                        : `₱ ${penalty} ( Check your Balance )`}
                    </Typography>
                  )}

                  <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    onClick={() => history.push("/payment-details")}
                    startIcon={<FiMousePointer />}
                  >
                    Upload Proof of Payments 📃
                  </Button>
                  <Divider />
                </Typography>

                <Typography align="center" style={{ marginTop: 10 }}>
                  📨 Need help? Email worldwide5@gmail.com or visit our Help
                  Center
                </Typography>
              </Paper>
            </Grid>
          )}

          {customer.length > 0 && (
            <Grid item>
              {/* <Paper className={classes.paper2}> */}
              <Paper className={classes.paper3}>
                <Typography variant="h6" className={classes.title}>
                  Unit Details
                </Typography>
                <Typography className={classes.customerdetails}>
                  <FiHome size={20} style={{ marginRight: 10 }} /> Project Type:{" "}
                  {customer[0].customer_property === null ? (
                    "N/A"
                  ) : (
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <Typography>
                        {customer[0].customer_property.project_type}
                      </Typography>
                      <Typography
                        style={{
                          marginLeft: 10,
                          background: "#8E30FF",
                          padding: "0px 3px",
                          borderRadius: "3px",
                          color: "white",
                        }}
                      >
                        {customer[0].customer_property.property_status}
                      </Typography>
                    </div>
                  )}
                </Typography>
                <Divider />
                <Typography className={classes.customerdetails}>
                  <FiBox size={20} style={{ marginRight: 10 }} />
                  Block:{" "}
                  {customer[0].customer_property === null
                    ? "N/A"
                    : customer[0].customer_property.block}
                </Typography>
                <Divider />
                <Typography className={classes.customerdetails}>
                  <FiBookmark size={20} style={{ marginRight: 10 }} />
                  Lot:{" "}
                  {customer[0].customer_property === null
                    ? "N/A"
                    : customer[0].customer_property.lot}
                </Typography>
                <Divider />
                <Typography className={classes.customerdetails}>
                  <FiMapPin size={20} style={{ marginRight: 10 }} />
                  Phase:{" "}
                  {customer[0].customer_property === null
                    ? "N/A"
                    : customer[0].customer_property.phase}
                </Typography>
                <Divider />
                <Typography className={classes.customerdetails}>
                  <FiCalendar size={20} style={{ marginRight: 10 }} />
                  MA Term:{" "}
                  {customer[0].term === null
                    ? "N/A"
                    : `${customer[0].term} Years or ${customer[0].term_property} Months`}
                </Typography>
                <Divider />
                <Typography className={classes.customerdetails}>
                  <FiClipboard size={20} style={{ marginRight: 10 }} />
                  DP Term:{" "}
                  {customer[0].term_dp === null
                    ? "N/A"
                    : `${customer[0].term_dp} Months`}
                </Typography>
                <Divider />
                <Typography className={classes.customerdetails}>
                  <FiTag size={20} style={{ marginRight: 10 }} />
                  Loan Amount:{" "}
                  {customer[0].loanable_amount === null
                    ? "N/A"
                    : ` ₱ ${new Intl.NumberFormat().format(
                        customer[0].loanable_amount
                      )} `}
                </Typography>
              </Paper>
              {/* </Paper> */}
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Balance;
