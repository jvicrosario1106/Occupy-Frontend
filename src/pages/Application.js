import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import Background from "../img/login.jpg";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import PropertyApplication from "./application/PropertyApplication";
import BorrowersDataApplication from "./application/BorrowersDataApplication";
import SpouseApplication from "./application/SpouseApplication";
import SourceIncomeApplication from "./application/SourceIncomeApplication";
import MonthlyIncome from "./application/MonthlyIncome";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { addApplication } from "../actions/customer";
import { useDispatch, useSelector } from "react-redux";
import BankStatement from "./application/BankStatement";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  background: {
    background: ` linear-gradient( rgba(0, 0, 0,0.4) 100%, rgba(0, 0, 0,0.4)100%),url(${Background}) no-repeat center center fixed `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "30px 0px",
  },
  paper1: {
    padding: 20,
    borderTop: "3px solid #7440FF",
    margin: "45px 0px 30px 0px",
  },
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
    marginBottom: 100,
  },
}));

function getSteps() {
  return [
    "Property Application Data",
    "Borrowers Data",
    "Spouse personal data",
    "Source of Income",
    "Monthly Income Details",
    "Upload Bank Statement",
  ];
}

const Application = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  // Image
  const [images, setImage] = useState([]);
  const [error, setError] = useState(false);

  const [applicationData, setApplicationData] = useState({
    project_type: "",
    desired_loan_term: "",
    unit: "",
    borrower_age: "",
    borrower_lastname: "",
    borrower_firstname: "",
    borrower_nameextension: "",
    borrower_middlename: "",
    borrower_citizenship: "",
    borrower_dateofbirth: "",
    borrower_sex: "",
    borrower_marital: "",
    borrower_street: "",
    borrower_subdivision: "",
    borrower_barangay: "",
    borrower_municipality: "",
    borrower_province: "",
    borrower_country: "",
    borrower_zipcode: "",
    borrower_homeownership: "",
    borrower_yrshome: "",
    borrower_gsis: "",
    borrower_tin: "",
    borrower_industry: "",

    contact_home: "",
    contact_cellphone: "",
    contact_email: "",
    business_direct_line: "",
    business_trunt_line: "",
    business_email: "",

    spouse_lastname: "",
    spouse_firstname: "",
    spouse_nameextension: "",
    spouse_middlename: "",
    spouse_citizenship: "",
    spouse_dateofbirth: "",
    spouse_tin: "",
    spouse_industry: "",

    borrower_employment_type: "",
    borrower_employer: "",
    borrower_address: "",
    borrower_position: "",
    borrower_yrsemployement: "",
    borrower_prevemployer: "",
    borrower_prevposition: "",
    borrower_yrsprevemployement: "",
    borrower_businessname: "",
    borrower_businessaddress: "",
    borrower_yrsoperation: "",
    borrower_typebusiness: "",
    borrower_nature: "",

    co_borrower_employment_type: "",
    co_borrower_employer: "",
    co_borrower_address: "",
    co_borrower_position: "",
    co_borrower_yrsemployement: "",
    co_borrower_prevemployer: "",
    co_borrower_prevposition: "",
    co_borrower_yrsprevemployement: "",
    co_borrower_businessname: "",
    co_borrower_businessaddress: "",
    co_borrower_yrsoperation: "",
    co_borrower_typebusiness: "",
    co_borrower_nature: "",

    borrower_salary: "",
    borrower_businessincome: "",
    borrower_commissions: "",
    borrower_rentalincome: "",
    borrower_others: "",

    co_borrower_salary: "",
    co_borrower_businessincome: "",
    co_borrower_commissions: "",
    co_borrower_rentalincome: "",
    co_borrower_others: "",
  });
  const steps = getSteps();

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleChange = (e) => {
    setApplicationData({ ...applicationData, [e.target.name]: e.target.value });
  };

  const isMessage = useSelector((state) => state.customerReducer.message);
  const isStatus = useSelector((state) => state.customerReducer.status);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleNextSubmit = (e) => {
    e.preventDefault();

    if (
      images.length <= 0 ||
      applicationData.borrower_age === "" ||
      applicationData.borrower_lastname === "" ||
      applicationData.borrower_firstname === "" ||
      applicationData.borrower_middlename === "" ||
      applicationData.borrower_citizenship === "" ||
      applicationData.borrower_dateofbirth === "" ||
      applicationData.borrower_sex === "" ||
      applicationData.borrower_marital === "" ||
      applicationData.borrower_street === "" ||
      applicationData.borrower_barangay === "" ||
      applicationData.borrower_municipality === "" ||
      applicationData.borrower_province === "" ||
      applicationData.borrower_country === "" ||
      applicationData.borrower_zipcode === "" ||
      applicationData.borrower_homeownership === "" ||
      applicationData.borrower_industry === "" ||
      applicationData.contact_cellphone === "" ||
      applicationData.contact_email === "" ||
      applicationData.borrower_employment_type === "" ||
      applicationData.borrower_salary === ""
    ) {
      window.alert(
        "Please Upload your Bank Statement ( Bank Passbook ) or Check all of the required fields 😀. Thank you"
      );
    } else {
      const confirm = window.confirm(
        "Are you sure you want to Submit this application?"
      );
      if (confirm) {
        const form_data = new FormData();
        form_data.append("data", JSON.stringify({ applicationData }));
        for (let i = 0; i < images.length; i++) {
          form_data.append(`images`, images[i], images[i].name);
        }

        dispatch(addApplication(form_data));

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    const confirm = window.confirm(
      "Are you sure you want to review your application that you send?"
    );
    if (confirm) {
      setActiveStep(0);
    }
  };

  const handleLoadPage = () => {
    window.location.reload();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <PropertyApplication
            applicationData={applicationData}
            handleChange={handleChange}
          />
        );
      case 1:
        return (
          <BorrowersDataApplication
            applicationData={applicationData}
            handleChange={handleChange}
          />
        );
      case 2:
        return (
          <SpouseApplication
            applicationData={applicationData}
            handleChange={handleChange}
          />
        );
      case 3:
        return (
          <SourceIncomeApplication
            applicationData={applicationData}
            handleChange={handleChange}
          />
        );
      case 4:
        return (
          <MonthlyIncome
            applicationData={applicationData}
            handleChange={handleChange}
          />
        );
      case 5:
        return (
          <BankStatement
            setImage={setImage}
            images={images}
            error={error}
            setError={setError}
          />
        );

      default:
        return "Unknown step";
    }
  }

  return (
    <div>
      <Title title={"Application Form"} />
      <CssBaseline />
      <div className={classes.background}>
        {isStatus === "SuccessApplication" && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {isMessage}😀
            </Alert>
          </Snackbar>
        )}

        {isStatus === "FailedApplication" && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {isMessage}
            </Alert>
          </Snackbar>
        )}
        <Container>
          <Paper className={classes.paper1}>
            <Typography variant="h3" align="center">
              Application Form
            </Typography>
            <Typography variant="h6" align="center" style={{ opacity: 0.6 }}>
              Welcome to Occupy! Your information here is confidential
            </Typography>
          </Paper>

          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            style={{ marginBottom: 31 }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>

                      {activeStep === steps.length - 1 &&
                      isStatus !== "SuccessApplication" ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNextSubmit}
                          className={classes.button}
                        >
                          Submit
                        </Button>
                      ) : applicationData.unit === "" ? (
                        <Button
                          disabled
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                        >
                          Next
                        </Button>
                      )}
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>
                {isStatus === "SuccessApplication"
                  ? " All steps completed - you're finished ✅"
                  : isStatus === "FailedApplication"
                  ? "Submitting Application Failed. Review your application ❌"
                  : "Please Wait to Submit"}
              </Typography>
              {isStatus !== null ? (
                <Button
                  onClick={handleReset}
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Review Your Application
                </Button>
              ) : (
                <Button
                  disabled
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Submitting your Application. Please Wait...
                </Button>
              )}

              <Button onClick={handleLoadPage} className={classes.button}>
                Fill Out Again
              </Button>
            </Paper>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Application;
