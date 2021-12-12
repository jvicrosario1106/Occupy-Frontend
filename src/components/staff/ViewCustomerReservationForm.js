import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  reservationDetails,
  updateCustomer,
  uploadReq,
  uploadId,
} from "../../actions/customer";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import * as api from "../../api";
import RequirementTable from "../RequirementTable";
import Title from "../../pages/Title";

const ViewCustomerReservationForm = ({ cust, classes }) => {
  const [term, setTerm] = useState(cust.term);
  const [ma, setMa] = useState(cust.term_property);
  const [customerData, setcustomerData] = useState({
    id: cust.customer.id,
    ids: cust.id,
    first_name: cust.customer.first_name,
    middle_name: cust.customer.middle_name,
    last_name: cust.customer.last_name,
    dateofbirth: cust.customer.dateofbirth,
    age: cust.age,
    citizenship: cust.citizenship,
    address: cust.address,
    occupation: cust.occupation,
    contact_no: cust.contact_no,
    years_employment: cust.years_employment,
    reservation_fee: cust.reservation_fee,
    loanable_amount: cust.loanable_amount,
    dp_amount: cust.dp_amount,
    scheme: cust.scheme,
    term_dp: cust.term_dp,
  });

  const isMessage = useSelector((state) => state.customerReducer.message);
  const isStatus = useSelector((state) => state.customerReducer.status);
  const [open, setOpen] = useState(true);

  const [opens, setOpens] = useState(false);

  const [generate, setGenerate] = useState(false);

  const [maritalStatus, setmaritalStatus] = useState(cust.marital_status);
  const [sex, setSex] = useState(cust.sex);
  const [status, setStatus] = useState(cust.customer.status);
  const [jobDesc, setJobdesc] = useState(cust.job_desc);
  const [property, setProperty] = useState(
    cust.customer_property && cust.customer_property.id
  );
  const [scheme, setScheme] = useState(cust.scheme);
  const [properties, setProperties] = useState(null);
  const [files, setFiles] = useState([]);
  const [frontId, setFrontId] = useState();
  const [backId, setBackId] = useState();
  const [requirements, setRequirements] = useState([]);
  const dispatch = useDispatch();

  const [error, setError] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 10000000,
    accept:
      "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    multiple: true,
    onDrop: (acceptedFiles, rejectedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      if (acceptedFiles.length > 0) {
        setError(false);
      }

      if (rejectedFiles.length > 0) {
        setError(true);
      }
    },
  });

  const onChangeCustomer = (e) => {
    setcustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const onChangeYear = (e) => {
    const paymentMA = e.target.value * 12;
    setTerm(e.target.value);
    setMa(paymentMA);
  };

  const onSumbmitCustomerReservationForm = (e) => {
    e.preventDefault();
    const data = {
      ...customerData,
      marital_status: maritalStatus,
      sex: sex,
      status: status,
      job_desc: jobDesc,
      customer_property: property,
    };

    var num = `${customerData.contact_no}`;

    if (num.includes("+") === false) {
      window.alert(
        "⚠ WARNING: Enter the Country Code in the Contact Number Field for the future messages and notifications"
      );
    } else {
      const confirm = window.confirm(
        "Are you sure you want to update customer information? Please Check carefully"
      );
      if (confirm) {
        dispatch(updateCustomer(data));
      }
    }
  };

  const onSubmitReservationDetails = (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      id: cust.id,
      reservation_fee: customerData.reservation_fee,
      loanable_amount: customerData.loanable_amount,
      dp_amount: customerData.dp_amount,
      scheme: scheme,
      term_dp: customerData.term_dp,
      term_property: customerData.term_property,
      term: term,
      ma: ma,
    });

    if (property === null) {
      window.alert(
        "Please select first the choosen property and Save it. Before Adding Reservation Details. Thank you"
      );
    } else if (parseInt(customerData.term_dp) === 0) {
      window.alert("0 Downpayment Term is not Applicable");
    } else {
      const confirm = window.confirm(
        "⚠ WARNING: Are you sure you want to update customer reservation details? This will affect the previous input, It will reset from the start"
      );
      if (confirm) {
        dispatch(reservationDetails(data));
        setGenerate(true);
      }
    }
  };

  const onSubmitReq = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("id", cust.id);
    for (let i = 0; i < files.length; i++) {
      form_data.append(`files`, files[i], files[i].name);
    }

    if (files.length <= 0) {
      window.alert("No Files to be Uploaded");
    } else {
      const confirm = window.confirm(
        `Are you sure you want to ${files.length} Uploaded Files Requirement?`
      );

      if (confirm) {
        dispatch(uploadReq(form_data));
        setOpens(true);
      }
    }
  };

  const resetUpload = () => {
    const confirm = window.confirm(
      "Are you sure you want to Reset what you uploaded?"
    );
    if (confirm) {
      setFiles([]);
      setError(false);
    }
  };

  const onSubmitId = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("id", cust.id);
    form_data.append("frontId", frontId, frontId.name);
    form_data.append("backId", backId, backId.name);
    const confirm = window.confirm("Are you sure you want to Upload ID?");
    if (confirm) {
      dispatch(uploadId(form_data));
      setOpens(true);
    }
  };

  //Snackbar
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const loadProperties = async () => {
    const { data } = await api.baseUrl.get("get_all_available_properties/");
    setProperties(data);
  };

  const loadRequirements = async () => {
    const { data } = await api.baseUrl.get(`get_requirements/${cust.id}/`);
    setRequirements(data);
  };

  useEffect(() => {
    loadProperties();
    loadRequirements();
  }, []);

  if (
    isStatus === "Success" ||
    isStatus === "SuccessID" ||
    isStatus === "successreserved" ||
    isMessage === "Success"
  ) {
    window.location.reload();
  }

  if (
    isStatus === "Failed" ||
    isStatus === "FailedID" ||
    isStatus === "failedreserved" ||
    isMessage === "Success"
  ) {
    window.location.reload();
  }

  return (
    <div>
      <Title title={`Reservation | ${cust.customer.email}`} />
      <Grid
        spacing={3}
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "92vh" }}
      >
        <Backdrop className={classes.backdrop} open={opens}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Backdrop className={classes.backdrop} open={generate}>
          <div>
            <Typography>
              Generating Reservation Details. Please Wait 😀{" "}
              <CircularProgress size={25} color="inherit" />
            </Typography>
          </div>
        </Backdrop>

        {isMessage === "Success" && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Successfully Updated 😀
            </Alert>
          </Snackbar>
        )}

        {isMessage === "Failed" && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Sorry, Updated Failed 🙁
            </Alert>
          </Snackbar>
        )}

        {isStatus === "Success" && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {isMessage}😀
            </Alert>
          </Snackbar>
        )}

        {isMessage === "SuccessReserved" && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Successfully Generated 😀
            </Alert>
          </Snackbar>
        )}

        {isMessage === "FailedReserved" && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Successfully Generated 😀
            </Alert>
          </Snackbar>
        )}

        {isStatus === "Failed" && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {isMessage}
            </Alert>
          </Snackbar>
        )}

        {isStatus === "SuccessID" && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {isMessage}😀
            </Alert>
          </Snackbar>
        )}

        {isStatus === "FailedID" && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {isMessage}
            </Alert>
          </Snackbar>
        )}

        <Grid item>
          <form
            method="post"
            onSubmit={(e) => onSumbmitCustomerReservationForm(e)}
          >
            <Paper className={classes.paper1}>
              <Typography className={classes.title}>
                Personal Information of {cust.customer.email}
              </Typography>
              <img
                src={cust.customer_profile}
                alt=""
                className={classes.image}
              />
              <Typography style={{ marginBottom: 15 }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <TextField
                      className={classes.name}
                      size="small"
                      variant="outlined"
                      label="First Name"
                      value={customerData.first_name}
                      onChange={(e) => onChangeCustomer(e)}
                      name="first_name"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.name}
                      size="small"
                      variant="outlined"
                      label="Middlet Name"
                      value={customerData.middle_name}
                      onChange={(e) => onChangeCustomer(e)}
                      name="middle_name"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.name}
                      size="small"
                      variant="outlined"
                      label="Last Name"
                      name="last_name"
                      value={customerData.last_name}
                      onChange={(e) => onChangeCustomer(e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="date"
                      className={classes.date}
                      size="small"
                      variant="outlined"
                      label="Birthday"
                      name="dateofbirth"
                      value={customerData.dateofbirth}
                      onChange={(e) => onChangeCustomer(e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="filled-age-native-simple">
                        Sex
                      </InputLabel>
                      <Select
                        native
                        label="Sex"
                        name="sex"
                        value={sex}
                        margin="normal"
                        className={classes.sex}
                        onChange={(e) => setSex(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        <option value={"Female"}>Female</option>
                        <option value={"Male"}>Male</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <TextField
                      type="number"
                      className={classes.name}
                      size="small"
                      variant="outlined"
                      label="Age"
                      name="age"
                      value={customerData.age}
                      onChange={(e) => onChangeCustomer(e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.date}
                      size="small"
                      variant="outlined"
                      label="Address"
                      name="address"
                      value={customerData.address}
                      onChange={(e) => onChangeCustomer(e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.citizenshipmarital}
                      size="small"
                      variant="outlined"
                      label="Citizenship"
                      name="citizenship"
                      value={customerData.citizenship}
                      onChange={(e) => onChangeCustomer(e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="filled-age-native-simple">
                        Marital Status
                      </InputLabel>
                      <Select
                        native
                        label="Marital Status"
                        name="marital_status"
                        value={maritalStatus}
                        margin="normal"
                        className={classes.citizenshipmarital}
                        onChange={(e) => setmaritalStatus(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        <option value={"Married"}>Married</option>
                        <option value={"Single"}>Single</option>
                        <option value={"Windowed"}>Windowed</option>
                        <option value={"Separated"}>Separated</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="filled-age-native-simple">
                        Job Description
                      </InputLabel>
                      <Select
                        native
                        label="Job Description"
                        name="job_desc"
                        value={jobDesc}
                        margin="normal"
                        className={classes.sex}
                        onChange={(e) => setJobdesc(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        <option value={"OFW"}>OFW</option>
                        <option value={"Self Employed"}>Self Employed</option>
                        <option value={"Locally Employed"}>
                          Locally Employed
                        </option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.date}
                      size="small"
                      variant="outlined"
                      label="Years of Employment"
                      name="years_employment"
                      value={customerData.years_employment}
                      onChange={(e) => onChangeCustomer(e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.occupation}
                      size="small"
                      variant="outlined"
                      label="Contact Number (Country Code)"
                      name="contact_no"
                      value={customerData.contact_no}
                      onChange={(e) => onChangeCustomer(e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.occupation}
                      size="small"
                      variant="outlined"
                      label="Occupation"
                      name="occupation"
                      value={customerData.occupation}
                      onChange={(e) => onChangeCustomer(e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="filled-age-native-simple">
                        Customer Status
                      </InputLabel>
                      <Select
                        native
                        label="Customer Status"
                        name="status"
                        value={status}
                        margin="normal"
                        className={classes.citizenshipmarital}
                        onChange={(e) => setStatus(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        <option value={"Reserved"}>Reserved</option>
                        <option value={"Resident"}>Resident</option>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <FormControl variant="outlined" required>
                      <InputLabel
                        htmlFor="filled-age-native-simple"
                        shrink={true}
                      >
                        Property
                      </InputLabel>
                      <Select
                        native
                        label="Property"
                        name="customer_property"
                        value={property}
                        className={classes.citizenshipmarital}
                        onChange={(e) => setProperty(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        <option value={""}>Choose Property</option>
                        {properties &&
                          properties.map((prop) => (
                            <option
                              disabled={
                                prop.property_status === "Sold" ||
                                prop.property_status === "Reserved" ||
                                prop.property_status === "Archived"
                                  ? true
                                  : false
                              }
                              value={prop.id}
                            >
                              ({prop.property_status})-{prop.project_type}-
                              {prop.block}-{prop.lot}-{prop.phase}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Typography>

              <Typography align="right">
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  type="submit"
                >
                  Save Informations
                </Button>
              </Typography>
            </Paper>
          </form>
        </Grid>

        <Grid item spacing={3}>
          <form onSubmit={(e) => onSubmitId(e)}>
            <Paper className={classes.paper2}>
              <Typography className={classes.title}>
                Upload Valid ID (Image Only)
              </Typography>
              <Grid container>
                <div style={{ display: "flex", marginBottom: 5 }}>
                  <div>
                    <Typography variant="caption">Front ID</Typography>
                    <input
                      accept="image/*"
                      required
                      type="file"
                      name="customer_frontid"
                      onChange={(e) => setFrontId(e.target.files[0])}
                    />
                  </div>
                  <div>
                    <Typography variant="caption"> Back ID</Typography>
                    <input
                      accept="image/*"
                      required
                      type="file"
                      name="customer_backid"
                      onChange={(e) => setBackId(e.target.files[0])}
                    />
                  </div>
                </div>
              </Grid>
              <Typography align="right">
                <Button
                  variant="outlined"
                  type="submit"
                  color="primary"
                  size="small"
                >
                  Upload ID
                </Button>
              </Typography>
            </Paper>
          </form>
          <Paper className={classes.paper2}>
            <form onSubmit={(e) => onSubmitReq(e)}>
              <Typography className={classes.title}>Requirements</Typography>
              <Typography variant="body1">Upload Requirements</Typography>
              <div
                {...getRootProps()}
                style={{
                  border: "3px dashed #eeeeee",
                  padding: "10px",
                  cursor: "pointer",
                  color: "#bdbdbd",
                  margin: "10px 0px ",
                }}
              >
                <input required {...getInputProps()} />
                <Typography variant="subtitle1" align="center">
                  DRAG and DROP your requirement files here
                </Typography>
                <Typography variant="subtitle1" align="center">
                  {error
                    ? `You have (0) Files to be uploaded. Pdf and docx file only`
                    : `You have (${
                        files && files.length
                      }) Files to be uploaded. Pdf and docx file only`}
                </Typography>
              </div>

              <Grid container>
                <div style={{ flexGrow: 1 }}></div>
                {error && (
                  <Typography variant="subtitle1" align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      style={{
                        border: "1px solid rgba(235, 77, 75,0.9)",
                        color: "rgba(235, 77, 75,0.9)",
                        marginRight: 10,
                      }}
                    >
                      The Files must 10 MB
                    </Button>
                  </Typography>
                )}

                {!error && (
                  <Typography variant="subtitle1" align="right">
                    <Button
                      type="submit"
                      variant="outlined"
                      color="primary"
                      size="small"
                      style={{ marginRight: 10 }}
                    >
                      Upload Files
                    </Button>
                  </Typography>
                )}

                {!error && (
                  <Typography variant="subtitle1" align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={resetUpload}
                    >
                      Reset Files
                    </Button>
                  </Typography>
                )}
              </Grid>
            </form>
          </Paper>
          <Paper className={classes.paper2}>
            <Typography className={classes.title2}>
              Reservation Details
            </Typography>
            <form onSubmit={(e) => onSubmitReservationDetails(e)}>
              <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                style={{ marginTop: 3, marginBottom: 1 }}
              >
                <Grid item>
                  <TextField
                    required
                    className={classes.reservation}
                    size="small"
                    min="1"
                    max="5"
                    step="any"
                    type="number"
                    variant="outlined"
                    label="Reservation Fee"
                    name="reservation_fee"
                    value={customerData.reservation_fee}
                    onChange={(e) => onChangeCustomer(e)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₱</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {/* <Grid item>
                  <TextField
                    className={classes.reservation}
                    size="small"
                    type="number"
                    step="any"
                    variant="outlined"
                    label="Loanable Amount"
                    name="loanable_amount"
                    value={customerData.loanable_amount}
                    onChange={(e) => onChangeCustomer(e)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₱</InputAdornment>
                      ),
                    }}
                  />
                </Grid> */}
                <Grid item>
                  <TextField
                    required
                    className={classes.reservation}
                    size="small"
                    type="number"
                    min="1"
                    max="5"
                    step="any"
                    variant="outlined"
                    label="DownPayment Amount"
                    value={customerData.dp_amount}
                    onChange={(e) => onChangeCustomer(e)}
                    name="dp_amount"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₱</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <FormControl variant="outlined" required>
                    <InputLabel htmlFor="filled-age-native-simple">
                      Financing Scheme
                    </InputLabel>
                    <Select
                      native
                      label="Financing Scheme"
                      name="scheme"
                      value={scheme}
                      margin="normal"
                      className={classes.citizenshipmarital}
                      onChange={(e) => setScheme(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      <option value={""}></option>
                      <option value={"In-House Financing"}>
                        In-House Financing
                      </option>
                      <option value={"Bank Financing"}>Bank Financing</option>
                      <option value={"PAG-IBIG"}>PAG-IBIG</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl variant="outlined" required>
                    {scheme === null && (
                      <Select
                        native
                        margin="normal"
                        className={classes.citizenshipmarital}
                      >
                        <option value="">Choose Financing Scheme</option>
                      </Select>
                    )}
                    {scheme === "" && (
                      <Select
                        native
                        margin="normal"
                        className={classes.citizenshipmarital}
                      >
                        <option value="">Choose Financing Scheme</option>
                      </Select>
                    )}

                    {scheme === "In-House Financing" && (
                      <Select
                        native
                        label="Terms(Year)"
                        name="term"
                        value={term}
                        margin="normal"
                        className={classes.citizenshipmarital}
                        onChange={(e) => onChangeYear(e)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        <option value=""></option>
                        <option value={5}>5 Years</option>
                        <option value={10}>10 Years</option>
                      </Select>
                    )}

                    {scheme === "Bank Financing" && (
                      <Select
                        native
                        label="Terms(Year)"
                        name="term"
                        value={term}
                        margin="normal"
                        className={classes.citizenshipmarital}
                        onChange={(e) => onChangeYear(e)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        <option value=""></option>
                        <option value={5}>5 Years</option>
                        <option value={10}>10 Years</option>
                        <option value={15}>15 Years</option>
                        <option value={20}>20 Years</option>
                      </Select>
                    )}

                    {scheme === "PAG-IBIG" && (
                      <Select
                        native
                        label="Terms(Year)"
                        name="term"
                        value={term}
                        margin="normal"
                        className={classes.citizenshipmarital}
                        onChange={(e) => onChangeYear(e)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        <option value=""></option>
                        <option value={5}>5 Years</option>
                        <option value={10}>10 Years</option>
                        <option value={15}>15 Years</option>
                        <option value={20}>20 Years</option>
                      </Select>
                    )}
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    required
                    className={classes.reservation}
                    size="small"
                    type="number"
                    step="any"
                    name="term_dp"
                    variant="outlined"
                    label="# of Downpayment Terms"
                    value={customerData.term_dp}
                    onChange={(e) => onChangeCustomer(e)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    className={classes.reservation}
                    size="small"
                    type="number"
                    step="any"
                    variant="outlined"
                    label="# of MA Terms"
                    name="term_property"
                    value={ma}
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Typography align="right">
                {cust.customer_property !== null ? (
                  <Button
                    type="submit"
                    variant="outlined"
                    size="small"
                    color="primary"
                  >
                    Save Details
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ color: "#eb4d4b", border: "1px solid #eb4d4b" }}
                  >
                    Save chosen property first before saving details
                  </Button>
                )}
              </Typography>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Paper className={classes.paper3}>
            <Typography variant="h6">List of Requirements</Typography>
            <RequirementTable
              cust={cust}
              requirements={requirements}
              setRequirements={setRequirements}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewCustomerReservationForm;
