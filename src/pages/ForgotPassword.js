import React, { useState, useEffect } from "react";
import ForgotImage from "../img/forgot.svg";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { passwordResetEmailSend } from "../actions/auth";
import Title from "./Title";
const useStyles = makeStyles((theme) => ({
  paper2: {
    width: 400,
    padding: 20,
  },
}));

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isStatus = useSelector((state) => state.authReducer.status);

  const sendEmail = (e) => {
    e.preventDefault();
    dispatch(passwordResetEmailSend(email));
    setEmail("");
    setIsLoading(true);
  };

  useEffect(() => {
    if (isStatus === "sendemailsuccess") {
      setIsLoading(false);
    }
  }, [isStatus]);

  return (
    <div>
      <Title title={"Forgot Password"} />
      <Container>
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "95vh",
          }}
        >
          <img src={ForgotImage} alt="" width="46%" />

          <Grid item>
            <form onSubmit={(e) => sendEmail(e)}>
              <Paper className={classes.paper2}>
                <Typography
                  variant="h4"
                  style={{ fontWeight: "bold", margin: "16px 0px" }}
                >
                  FORGOT YOUR PASSWORD?
                </Typography>
                <TextField
                  type="email"
                  required
                  variant="outlined"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  style={{ margin: "16px 0px 4px 0px" }}
                />

                <Typography
                  variant="body2"
                  style={{
                    fontWeight: "bold",
                    margin: "16px 0px",
                    opacity: 0.6,
                  }}
                >
                  Don't Worry we will reset your password and send a link to
                  your email. Enter your Email
                </Typography>
                <Typography align="right">
                  {" "}
                  <Button color="primary" onClick={() => history.push("/")}>
                    Back to login
                  </Button>
                  {isLoading ? (
                    <Button disable variant="contained">
                      Sending Link to Email...
                    </Button>
                  ) : isStatus === "sendemailsuccess" ? (
                    <Button
                      color="secondary"
                      style={{ color: "white" }}
                      variant="contained"
                    >
                      Sent Email Message
                    </Button>
                  ) : (
                    <Button color="primary" variant="contained" type="submit">
                      Forgot Password
                    </Button>
                  )}
                </Typography>
              </Paper>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ForgotPassword;
