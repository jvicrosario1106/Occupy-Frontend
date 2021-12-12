import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button, makeStyles } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { FcPaid } from "react-icons/fc";
import ProofPayments from "../components/ProofPayments";
import { useParams, useHistory } from "react-router-dom";
import * as api from "../api";
import AddInHouse from "../components/AddInHouse";
import EditInHouse from "../components/EditInHouse";
import InHouse from "../components/InHouse";
import CustomerLogs from "../components/CustomerLogs";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Title from "./Title";
import { sendInvoice } from "../actions/customer";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: 20,
    marginTop: 10,
    flexGrow: 1,
  },
  paper1: {
    padding: 3,
    // width: "38vw",
    display: "flex",
  },
  paper2: {
    padding: 3,
    display: "flex",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
  },
  grid1: {
    flexGrow: 1,
  },
  reservation: {
    marginLeft: 10,
  },
}));

const ViewAccounting = () => {
  // Snackbar
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [ids, setId] = useState("");
  const [value, setValue] = React.useState(0);
  const [proofPayments, setProofPayments] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [inHouse, setInHouse] = useState([]);
  const [logs, setLogs] = useState([]);
  const [generate, setGenerate] = useState([]);
  const isStatus = useSelector((state) => state.customerReducer.status);
  const isStatusMessage = useSelector((state) => state.employeeReducer.status);

  const [deleteSuccess, setdeleteSuccess] = useState(false);
  const [updateSuccess, setupdateSuccess] = useState(false);
  const [invoice, setInvoice] = useState(false);
  const [editInHouse, setEditInhouse] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const loadProofpayments = async () => {
    const { data } = await api.baseUrl.get(`get_customer_accounting/${id}/`);
    setProofPayments(data);
  };

  const loadCustomer = async () => {
    const { data } = await api.baseUrl.get(`get_one_customer/${id}/`);
    setCustomer(data[0]);
  };

  const loadInHouse = async () => {
    const { data } = await api.baseUrl.get(`get_customer_house_ledger/${id}/`);
    setInHouse(data);
  };
  const loadCustomerLogs = async () => {
    const { data } = await api.baseUrl.get(`get_customer_logs/${id}/`);
    setLogs(data);
  };

  const loadMA = async () => {
    const { data } = await api.baseUrl.get(`get_all_ma/${id}/`);
    setGenerate(data);
  };

  const clickEditModal = (id) => {
    setId(id);
    setOpen(true);
    const filterItem = generate.filter((ih) => ih.id === id);
    setEditInhouse(filterItem);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const emailInvoice = (id, date, amount, code, paid_status) => {
    console.log(customer);
    const confirm = window.confirm(
      `WARNING: Are you sure you want to Send Email Invoice to ${
        customer && customer.customer.email
      }  to remind about ₱${new Intl.NumberFormat().format(
        amount
      )} (${code}) that due on ${new Date(
        date
      ).toLocaleDateString()}? The Status of this payment is ${
        paid_status === "Paid" ? "Already Paid" : "Unpaid"
      }`
    );
    if (confirm) {
      dispatch(sendInvoice(id));
      setInvoice(true);
      setTimeout(() => {
        setInvoice(false);
      }, 6000);
    }
  };

  useEffect(() => {
    loadProofpayments();
    loadCustomer();
    loadInHouse();
    loadCustomerLogs();
    loadMA();
  }, []);

  if (isStatusMessage === "SuccessAddLogs") {
    window.location.reload();
  }

  if (isStatus === "FailedHouseAdd") {
    window.location.reload();
  }

  return (
    <div>
      <Title
        title={`Accounts of ${customer ? customer.customer.email : ""} `}
      />
      <Container>
        {/* Delete Snackbar */}
        {deleteSuccess && (
          <Snackbar open={deleteSuccess}>
            <Alert severity="success">Successfully Delete </Alert>
          </Snackbar>
        )}

        {updateSuccess && (
          <Snackbar open={updateSuccess}>
            <Alert severity="success">Successfully Updated</Alert>
          </Snackbar>
        )}

        {invoice && (
          <Snackbar open={invoice}>
            <Alert severity="success">Successfully Send Email Invoice</Alert>
          </Snackbar>
        )}

        <Grid container>
          <Grid item>
            <Typography className={classes.title} variant="h6" color="primary">
              <Paper className={classes.paper1}>
                <FcPaid size={30} />
                <Typography
                  color="primary"
                  variant="h6"
                  className={classes.reservation}
                >
                  Account of{" "}
                  {customer ? (
                    customer.customer.email
                  ) : (
                    <Typography>Email is Missing</Typography>
                  )}
                </Typography>
              </Paper>
            </Typography>
          </Grid>
          <Grid item style={{ flexGrow: 1 }}></Grid>
          <Grid item>
            <Typography align="center" className={classes.title}>
              {customer && (
                <AddInHouse
                  customer={customer}
                  setGenerate={setGenerate}
                  generate={generate}
                />
              )}
            </Typography>
          </Grid>
        </Grid>

        {customer && open && (
          <EditInHouse
            setGenerate={setGenerate}
            generate={generate}
            open={open}
            setOpen={setOpen}
            ids={ids}
            customer={customer}
            editInHouse={editInHouse}
            setupdateSuccess={setupdateSuccess}
          />
        )}

        {customer && (
          <Grid container>
            <Grid item className={classes.grid1}>
              <Paper className={classes.paper2}>
                <Grid item>
                  <Typography color="primary" variant="h6">
                    <img
                      src={customer.customer_profile}
                      width="20%"
                      alt="Profile"
                      style={{ width: 150, height: 150, borderRadius: "50%" }}
                    />
                  </Typography>
                </Grid>

                <Grid item style={{ opacity: 0.6 }}>
                  <Typography>
                    Name: {customer.customer.first_name}{" "}
                    {customer.customer.middle_name}{" "}
                    {customer.customer.last_name}
                  </Typography>
                  <Typography>Age: {customer.age}</Typography>
                  <Typography>Sex: {customer.sex}</Typography>
                  <Typography>Citizenship: {customer.citizenship}</Typography>
                  <Typography>
                    Marital Status: {customer.marital_status}
                  </Typography>
                </Grid>
                <Grid item style={{ opacity: 0.6 }}>
                  <Typography>Job Description: {customer.job_desc}</Typography>
                  <Typography>
                    Reservation Fee:₱
                    {new Intl.NumberFormat().format(customer.reservation_fee)}
                  </Typography>
                  <Typography>
                    Property Price:
                    {customer.customer_property === null
                      ? "Choose Property First"
                      : `₱${new Intl.NumberFormat().format(
                          customer.customer_property.property_price
                        )}`}
                  </Typography>
                  <Typography>
                    Downpayment Amount: ₱
                    {new Intl.NumberFormat().format(customer.dp_amount)}
                  </Typography>
                  <Typography>Financing Scheme: {customer.scheme} </Typography>
                </Grid>

                <Grid item style={{ opacity: 0.6 }}>
                  <Typography>
                    Loan Amount:₱
                    {new Intl.NumberFormat().format(customer.loanable_amount)}
                  </Typography>
                  <Typography>
                    Monthly Amortization:₱
                    {new Intl.NumberFormat().format(
                      customer.month_amortization
                    )}
                  </Typography>
                  <Typography># of DP Terms: {customer.term_dp}</Typography>
                  <Typography>
                    # of MA Terms: {customer.term_property}
                  </Typography>
                  <Typography># of Terms (Year): {customer.term}</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    <Button color="secondary" variant="outlined" size="small">
                      {customer.customer.status}
                    </Button>
                  </Typography>
                  <Typography style={{ marginTop: 10 }}>
                    <Button
                      color="primary"
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        history.push(`/view-documents/${customer.id}`)
                      }
                    >
                      View Documents
                    </Button>
                  </Typography>
                  <Typography style={{ marginTop: 10 }}>
                    {customer.customer.status === "Resident" ? (
                      <Button
                        color="primary"
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          history.push(
                            `/view-customer-resident/${customer.customer.id}`
                          )
                        }
                      >
                        Edit Information
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          history.push(
                            `/view-customer-reservation/${customer.customer.id}`
                          )
                        }
                      >
                        Edit Information
                      </Button>
                    )}
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}

        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="In-House Ledger" />
          <Tab label="Proof of Payments" />
          <Tab label="Customer Logs" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <InHouse
            generate={generate}
            setGenerate={setGenerate}
            open={open}
            setOpen={setOpen}
            ids={ids}
            setId={setId}
            clickEditModal={clickEditModal}
            setInHouse={setInHouse}
            setdeleteSuccess={setdeleteSuccess}
            emailInvoice={emailInvoice}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProofPayments
            proofPayments={proofPayments}
            setProofPayments={setProofPayments}
            generate={generate}
            setGenerate={setGenerate}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CustomerLogs
            logs={logs}
            setLogs={setLogs}
            id={id}
            setValue={setValue}
          />
        </TabPanel>
      </Container>
    </div>
  );
  function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <Typography>{children}</Typography>}</div>;
  }
};

export default ViewAccounting;
