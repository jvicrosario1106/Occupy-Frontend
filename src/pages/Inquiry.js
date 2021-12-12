import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import Background from "../img/login.jpg";
import { useDispatch, useSelector } from "react-redux";
import { createInquiry } from "../actions/inquiry";
import { makeStyles } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { FiEdit2 } from "react-icons/fi";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  radio: {
    "&$checked": {
      color: "#7440FF",
    },
  },
  checked: {},
  tellus: {
    margin: "20px 0px 10px 0px",
  },
  comment: {
    width: "100%",
  },
  background: {
    background: ` linear-gradient( rgba(0, 0, 0,0.4) 100%, rgba(0, 0, 0,0.4)100%),url(${Background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "30px 0px",
  },
  paper1: {
    padding: 20,
    borderTop: "3px solid #7440FF",
    margin: "0px 0px 30px 0px",
  },
}));

const Inquiry = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const isMessage = useSelector((state) => state.inquiryReducer.message);
  const isStatus = useSelector((state) => state.inquiryReducer.status);

  //Personal Information State
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [inquiryInput, setinquiryInput] = useState([
    {
      label: "First Name",
      type: "text",
      name: "first_name",
    },
    {
      label: "Middle Name",
      type: "text",
      name: "middle_name",
    },
    {
      label: "Last Name",
      type: "text",
      name: "last_name",
    },
    {
      label: "Age",
      type: "text",
      name: "age",
    },
    {
      label: "Profession",
      type: "text",
      name: "profession",
    },
    {
      label: "Company",
      type: "text",
      name: "company",
    },
    {
      label: "Designation",
      type: "text",
      name: "designation",
    },
    {
      label: "Address",
      type: "text",
      name: "address",
    },
    {
      label: "Phone",
      type: "text",
      name: "phone_no",
    },
    {
      label: "Mobile",
      type: "text",
      name: "mobile_no",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
    },
  ]);

  // How did your hear about the company
  const [aboutCompany, setAboutCompany] = useState("Friends");

  const handleChange = (event) => {
    setAboutCompany(event.target.value);
  };

  const [aboutSize, setAboutsize] = useState("50sqm");

  const handleSizeChange = (event) => {
    setAboutsize(event.target.value);
  };

  const [purpose, setPurpose] = useState("Own use");

  const handlePurposeChange = (event) => {
    setPurpose(event.target.value);
  };

  const [aboutSalary, setaboutSalary] = useState("Below 250,000");

  const handleSalaryChange = (event) => {
    setaboutSalary(event.target.value);
  };

  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const [sex, setSex] = useState("Female");

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const [inquiryData, setinquiryData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    age: "",
    profession: "",
    company: "",
    designation: "",
    address: "",
    phone_no: "",
    mobile_no: "",
    email: "",
    agent_name: "",
  });
  const dispatch = useDispatch();

  const inquiryOnChange = (e) => {
    setinquiryData({ ...inquiryData, [e.target.name]: e.target.value });
  };

  const submitInquiry = (e) => {
    e.preventDefault();
    const data = {
      ...inquiryData,
      about: aboutCompany,
      size: aboutSize,
      purpose: purpose,
      // salary: aboutSalary,
      comments: comment,
      sex: sex,
    };

    const confirm = window.confirm(
      "Are you sure you want to Submit this inquiry?"
    );
    if (confirm) {
      setLoading(true);
      dispatch(createInquiry(data));
    }
  };

  useEffect(() => {
    if (isStatus === "Success") {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      setLoading(false);
    }
  }, [isStatus]);

  return (
    <div>
      <Title title={"Inquiry Form"} />
      <CssBaseline />
      <div className={classes.background}>
        <Container>
          {/* Snackbar */}
          {isStatus === "Success" && (
            <Snackbar open={true}>
              <Alert severity="success">{isMessage}</Alert>
            </Snackbar>
          )}

          {isStatus === "Failed" && (
            <Snackbar open={true}>
              <Alert severity="error">{isMessage}</Alert>
            </Snackbar>
          )}

          <Paper className={classes.paper1}>
            <Typography variant="h3" align="center">
              Inquiry Form
            </Typography>
            <Typography variant="h6" align="center" style={{ opacity: 0.6 }}>
              Welcome to Occupy! Your information here is confidential
            </Typography>
          </Paper>
          <Paper elevation={3}>
            <form onSubmit={(e) => submitInquiry(e)} style={{ padding: 50 }}>
              <Typography variant="h6" color="primary">
                Personal Information
              </Typography>
              {inquiryInput.map((labels) => (
                <TextField
                  required={labels.name === "phone_no" ? false : true}
                  id="outlined-basic"
                  label={labels.label}
                  type={labels.type}
                  name={labels.name}
                  variant="outlined"
                  className={classes.inputs}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => inquiryOnChange(e)}
                />
              ))}
              <Typography variant="h6">Sex</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  name="sex"
                  value={sex}
                  onChange={(e) => handleSexChange(e)}
                >
                  <Grid container>
                    <FormControlLabel
                      value="Female"
                      control={
                        <Radio
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="Female"
                    />
                    <FormControlLabel
                      value="Male"
                      control={
                        <Radio
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="Male"
                    />
                  </Grid>
                </RadioGroup>
              </FormControl>
              <Typography variant="h6">
                How did you hear about the Company?
              </Typography>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  name="about"
                  value={aboutCompany}
                  onChange={(e) => handleChange(e)}
                >
                  <Grid container>
                    <FormControlLabel
                      value="Friends"
                      control={
                        <Radio
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="Friends"
                    />
                    <FormControlLabel
                      value="Broker"
                      control={
                        <Radio
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="Broker"
                    />
                    <FormControlLabel
                      value="Employee"
                      control={
                        <Radio
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="Employee"
                    />
                    <FormControlLabel
                      value="Social Media"
                      control={
                        <Radio
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="Social Media"
                    />
                  </Grid>
                </RadioGroup>
              </FormControl>
              <Typography
                variant="h5"
                color="primary"
                className={classes.tellus}
              >
                Please tell use about the property that you want for your
                Invesment
              </Typography>
              <Typography variant="h6">
                Property Lot Size that you looking for? (Sqm)
              </Typography>
              <FormControl component="fieldset">
                <FormLabel component="legend">Square Meter </FormLabel>
                <RadioGroup
                  name="size"
                  value={aboutSize}
                  onChange={(e) => handleSizeChange(e)}
                >
                  <Grid container>
                    <FormControlLabel
                      value="50sqm"
                      control={
                        <Radio
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="50sqm"
                    />
                    <FormControlLabel
                      value="75sqm"
                      control={
                        <Radio
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="75sqm"
                    />
                  </Grid>
                </RadioGroup>
              </FormControl>
              <Typography variant="h6">
                What is the purpose of the investment?
              </Typography>
              <FormControl component="fieldset">
                <FormLabel component="legend">Purpose</FormLabel>
                <RadioGroup
                  name="purpose"
                  value={purpose}
                  onChange={(e) => handlePurposeChange(e)}
                >
                  <Grid container>
                    <FormControlLabel
                      value="Own use"
                      control={
                        <Radio
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="For my Own use"
                    />
                    <FormControlLabel
                      value="First Investment"
                      control={
                        <Radio
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="My First Investment"
                    />
                    <FormControlLabel
                      value="Additional"
                      control={
                        <Radio
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="Additional Investment"
                    />
                  </Grid>
                </RadioGroup>
              </FormControl>
              {/* <Typography variant="h6">
                Total Salary Per year? ( Philippine Peso )
              </Typography> */}
              {/* <FormControl component="fieldset">
                <FormLabel component="legend">Salary</FormLabel>
                <RadioGroup
                  name="salary"
                  value={aboutSalary}
                  onChange={(e) => handleSalaryChange(e)}
                >
                  <Grid container>
                    <FormControlLabel
                      value="Below 250,000"
                      control={
                        <Radio
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="Below 250,000"
                    />
                    <FormControlLabel
                      value="250,000-500,000"
                      control={
                        <Radio
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="250,000-500,000"
                    />
                    <FormControlLabel
                      value="500,000-1M"
                      control={
                        <Radio
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="500,000-1M"
                    />
                    <FormControlLabel
                      value="1M Above"
                      control={
                        <Radio
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="1M Above"
                    />
                  </Grid>
                </RadioGroup>
              </FormControl> */}
              <Typography variant="h6" color="primary">
                Enter the name of the agent that assist you. Thank you
              </Typography>

              <TextField
                id="outlined-basic"
                label="Agent Name"
                type="text"
                name="agent_name"
                variant="outlined"
                className={classes.inputs}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => inquiryOnChange(e)}
              />
              <Typography variant="h6" color="primary">
                Please, We would like to hear your comments and suggestions.
                Thank you and Stay Safe
              </Typography>
              <TextField
                className={classes.comment}
                onChange={(e) => handleCommentChange(e)}
                value={comment}
                variant="outlined"
                name="comments"
                margin="normal"
                label="Comments"
                placeholder="Comments or Suggestions"
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
                rows={6}
              />
              <Typography align="right">
                {loading ? (
                  <Button
                    disabled
                    color="primary"
                    size="large"
                    variant="contained"
                    startIcon={<FiEdit2 />}
                  >
                    Submitting...Please Wait
                  </Button>
                ) : inquiryData.first_name === "" ||
                  inquiryData.middle_name === "" ||
                  inquiryData.last_name === "" ||
                  inquiryData.age === "" ||
                  inquiryData.profession === "" ||
                  inquiryData.company === "" ||
                  inquiryData.designation === "" ||
                  inquiryData.address === "" ||
                  inquiryData.mobile_no === "" ||
                  inquiryData.email === "" ? (
                  <Button
                    disabled
                    color="primary"
                    size="large"
                    variant="contained"
                    startIcon={<FiEdit2 />}
                  >
                    Submit Inquiry
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    color="primary"
                    size="large"
                    variant="contained"
                    startIcon={<FiEdit2 />}
                  >
                    Submit Inquiry
                  </Button>
                )}
              </Typography>
            </form>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default Inquiry;
