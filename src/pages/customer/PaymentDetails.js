import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import * as api from "../../api";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { paymentCustomer } from "../../actions/customer";
import Title from "../Title";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper1: {
    height: 600,
    width: 500,
    padding: 30,
  },
  paper2: {
    height: 600,
    padding: 30,
  },
  form: {
    marginTop: 10,
  },
  upload: {
    marginTop: 20,
    marginBottom: 15,
  },
  comment: {
    marginTop: 30,
  },
  details: {
    margin: "20px 0px",
  },
  button: {
    width: "13rem",
  },
  transaction: {
    width: "500px",
  },
  drag: {
    border: "3px dashed #eeeeee",
    padding: "30px",
    cursor: "pointer",
    color: "#bdbdbd",
  },
  dragover: {
    border: "3px dashed black",
    padding: "30px",
    cursor: "pointer",
    color: "#bdbdbd",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  radio: {
    "&$checked": {
      color: "#7440FF",
    },
  },
  checked: {},
}));

const PaymentDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const history = useHistory();
  const [allTransactions, setallTransactions] = useState(null);
  const [files, setFiles] = useState("");
  const [transaction, setTransaciton] = useState("");
  const [ledger, setLedger] = useState([]);
  const [advanced, setAdvanced] = useState(0);
  const [add, setAdd] = useState(1);
  const customer_id =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

  const [paymentData, setPaymentData] = useState({
    customer_payment: customer_id.id,
    or_number: "",
    reference_number: "",
    amount: "",
    comments: "",
    status: "Unread",
    advance: "",
  });

  const isStatus = useSelector((state) => state.customerReducer.status);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles[0]);
    },
  });

  const onChangeTransaction = (e) => {
    setTransaciton(e.target.value);

    if (e.target.options[e.target.selectedIndex].text === "Reservation fee") {
      setCode("RF");
    } else if (
      e.target.options[e.target.selectedIndex].text === "Downpayment"
    ) {
      setCode("DP");
    } else if (
      e.target.options[e.target.selectedIndex].text === "Monthly Amortization"
    ) {
      setCode("MA");
    } else if (
      e.target.options[e.target.selectedIndex].text ===
      "Financing charges (HDMF / Bank fees)"
    ) {
      setCode("FC");
    } else if (
      e.target.options[e.target.selectedIndex].text === "Construction bond"
    ) {
      setCode("CB");
    } else if (
      e.target.options[e.target.selectedIndex].text === "Move In fee"
    ) {
      setCode("MIF");
    } else if (
      e.target.options[e.target.selectedIndex].text ===
      "Admin and transfer fees"
    ) {
      setCode("ATF");
    } else if (
      e.target.options[e.target.selectedIndex].text === "Loan take out"
    ) {
      setCode("LTO");
    } else if (
      e.target.options[e.target.selectedIndex].text ===
      "Advance Payment ( DP and MA )"
    ) {
      setCode("Advance Payment ( DP and MA )");
    } else {
      setCode("");
    }
  };

  const onChangeData = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const OnSubmitPayment = (e) => {
    e.preventDefault();
    console.log("Submit");
    if (files === "" || files === null) {
      window.alert(
        "Please Upload your Receipt to Verify your payment. Thank you"
      );
    } else if (paymentData.amount === 0) {
      window.alert("0 amount is invalid");
    } else {
      const form_data = new FormData();
      form_data.append("customer_payment", paymentData.customer_payment);
      form_data.append("transactions", transaction);
      form_data.append("or_number", paymentData.or_number);
      form_data.append("reference_number", paymentData.reference_number);
      form_data.append("amount", paymentData.amount);
      form_data.append("status", paymentData.status);
      form_data.append("comments", paymentData.comments);
      form_data.append("advance", paymentData.advance);
      form_data.append("image_receipt", files, files.name);
      const alert = window.confirm(
        "Are you Sure your want to Proceed?. Please Check Carefully"
      );
      if (alert) {
        dispatch(paymentCustomer(form_data));
        setBackdrop(true);
      }
    }
  };

  const loadTransactions = async () => {
    const { data } = await api.baseUrl.get("get_all_transactions/");
    setallTransactions(data);
  };

  const loadLedger = async () => {
    const res = await api.baseUrl.get(`get_all_ma/${customer_id.id}/`);
    setLedger(res.data);
  };

  useEffect(() => {
    loadTransactions();
    loadLedger();

    if (code === "Advance Payment ( DP and MA )") {
      const getSum =
        ledger.length > 0 &&
        ledger
          .filter((data) => data.code === "MA" || data.code === "DP")
          .filter((status) => status.paid_status === "Unpaid")
          .splice(0, advanced)
          .map((amnt) => amnt.amount)
          .reduce((a, b) => a + b, 0);

      setPaymentData({
        ...paymentData,
        amount: Math.round(getSum * 100) / 100,
        advance: advanced,
      });
    } else {
      setAdvanced(0);

      const filtered =
        ledger.length > 0 &&
        ledger.filter(
          (ledge) => ledge.code === code && ledge.paid_status === "Unpaid"
        )[0];

      if (filtered === undefined) {
        setPaymentData({ ...paymentData, amount: 0, advance: 0 });
      } else {
        setPaymentData({ ...paymentData, amount: filtered.amount, advance: 0 });
      }
    }
    if (
      customer_id.role === "Admin" ||
      customer_id.role === "Staff" ||
      customer_id.role === "Agent" ||
      customer_id.role === "Manager"
    ) {
      history.push("/home");
    }
  }, [code, advanced]);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [opens, setOpen] = useState(true);

  //BackDrop
  const [backdrop, setBackdrop] = useState(false);

  if (isStatus === "Payment Success") {
    window.location.reload();
  }

  if (isStatus === "Payment Failed") {
    window.location.reload();
  }

  const dpMa =
    ledger.length > 0 &&
    ledger[0].customer_ma.term_dp + ledger[0].customer_ma.term_property;
  const arrayofTerms = new Array();
  for (var i = 2; i <= dpMa + 1; i++) {
    arrayofTerms.push(i);
  }

  return (
    <div>
      <Title title={"Payment Details"} />
      <Container>
        <Backdrop className={classes.backdrop} open={backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>

        {isStatus === "Payment Success" && (
          <Snackbar open={opens} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              You successfully submit your receipt. Please Wait and Check your
              Payment History
            </Alert>
          </Snackbar>
        )}
        {isStatus === "Payment Failed" && (
          <Snackbar open={opens} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Please Try again and Refresh your page
            </Alert>
          </Snackbar>
        )}

        <form onSubmit={OnSubmitPayment} className={classes.form}>
          <Typography align="center">
            {" "}
            <img
              src="https://occupyrem-bucket.s3.ap-southeast-1.amazonaws.com/bank.png"
              width="80%"
            />
          </Typography>

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "90vh" }}
          >
            <Grid item>
              <Paper className={classes.paper1}>
                <img
                  src="https://occupyrem-bucket.s3.ap-southeast-1.amazonaws.com/occupy.PNG"
                  width="20%"
                  alt="Bank"
                />
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.details}
                >
                  <b> PAYMENT DETAILS </b>
                </Typography>

                <Typography variant="subtitle1" color="primary">
                  TRANSACTION TYPE
                </Typography>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="filled-age-native-simple">
                    Transaction (Required)
                  </InputLabel>
                  <Select
                    required
                    value={transaction}
                    onChange={onChangeTransaction}
                    native
                    label="Transaction (Required)"
                    name="transaction"
                    autoWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.transaction}
                  >
                    <option>Choose an Option</option>
                    {allTransactions &&
                      allTransactions.map((transact) => (
                        <option key={transact.id} value={transact.id}>
                          {transact.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>

                {code === "Advance Payment ( DP and MA )" && (
                  <FormControl
                    variant="outlined"
                    margin="normal"
                    style={{ width: 300 }}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      For how many months?
                    </InputLabel>
                    <Select
                      native
                      value={advanced}
                      onChange={(e) => setAdvanced(e.target.value)}
                      label="For how many months?"
                      inputProps={{
                        name: "age",
                        id: "outlined-age-native-simple",
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      <option aria-label="None" value="" />
                      {arrayofTerms.length > 0 &&
                        arrayofTerms.map((term) => (
                          <option key={term} value={term}>
                            {term - 1} Months
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                )}

                <Typography variant="subtitle1" color="primary">
                  AMOUNT
                </Typography>
                <TextField
                  required
                  type="number"
                  variant="outlined"
                  fullWidth
                  name="amount"
                  disabled
                  autoComplete
                  onChange={(e) => onChangeData(e)}
                  placeholder="Amount (Required)"
                  margin="normal"
                  value={paymentData.amount}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Amount (Required)"
                />

                <Typography variant="subtitle1" color="primary">
                  OR NUMBER
                </Typography>
                <TextField
                  required
                  variant="outlined"
                  fullWidth
                  autoComplete
                  placeholder="Original Receipt (Required)"
                  name="or_number"
                  onChange={(e) => onChangeData(e)}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Or Number (Required)"
                />
                <Typography variant="subtitle1" color="primary">
                  REFERENCE NUMBER
                </Typography>
                <TextField
                  required
                  variant="outlined"
                  fullWidth
                  autoComplete
                  placeholder="Refenrence Number (Required)"
                  onChange={(e) => onChangeData(e)}
                  name="reference_number"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Reference Number (Required)"
                />
              </Paper>
            </Grid>

            <Grid item>
              <Paper className={classes.paper1}>
                <Typography variant="h3" color="primary" align="center">
                  <b> FILE UPLOAD</b>
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  PROOF OF PAYMENT (Required)
                </Typography>

                <Typography align="center" className={classes.upload}>
                  {/* <CircularProgress /> */}
                  <div {...getRootProps()} className={classes.drag}>
                    <input {...getInputProps()} />
                    <Typography variant="subtitle1" align="center">
                      DRAG and DROP your receipt image here (Required)
                    </Typography>
                    <Typography variant="subtitle1" align="center">
                      {files && files.name}
                    </Typography>
                  </div>
                </Typography>

                <Typography variant="caption" color="primary">
                  The format of the image is important. Pleasesave or convert
                  your image as JPEG, JPG or PNG to match the format before
                  uploading. Thank you
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="primary"
                  className={classes.comment}
                >
                  COMMENTS
                </Typography>
                <TextField
                  multiline
                  rows={6}
                  variant="outlined"
                  fullWidth
                  name="comments"
                  autoComplete
                  onChange={(e) => onChangeData(e)}
                  placeholder="Add Comment"
                  type="email"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Comment"
                />

                {/* <Grid container justifyContent="center" spacing={1}>
                  <Grid item> */}
                <Button
                  fullWidth
                  variant="contained"
                  fullWidth
                  type="submit"
                  color="primary"
                  // className={classes.button}
                >
                  Submit
                </Button>
                {/* </Grid> */}
                {/* <Grid item>
                    <Button
                      variant="text"
                      fullWidth
                      component="span"
                      className={classes.button}
                    >
                      Cancel
                    </Button>
                  </Grid> */}
                {/* </Grid> */}
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default PaymentDetails;
