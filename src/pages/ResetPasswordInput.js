import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Background from "../img/login.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";
import Zoom from "@material-ui/core/Zoom";
import { passwordResetURL } from "../actions/auth";
import Title from "./Title";
const ResetPasswordInput = () => {
  const dispatch = useDispatch();
  const isStatus = useSelector((state) => state.authReducer.status);
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const onSubmitPassword = (e) => {
    e.preventDefault();

    const confirm = window.confirm(
      "Are you sure you want to reset your password?"
    );
    if (confirm) {
      dispatch(passwordResetURL(uid, token, newPassword, rePassword));
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (isStatus === "sendurlsuccess") {
      setIsLoading(false);
    }
  }, [isStatus]);

  return (
    <div
      style={{
        background: ` linear-gradient( rgba(0, 0, 0,0.3) 100%, rgba(0, 0, 0,0.3)100%),url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Title title={"Reset Password"} />
      <CssBaseline />
      <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          {" "}
          <Paper
            elevation={3}
            style={{
              padding: 40,
            }}
          >
            <Typography align="center">
              <img
                src="https://occupyrem-bucket.s3.ap-southeast-1.amazonaws.com/occupy.PNG"
                width="20%"
                alt="logo"
              />
            </Typography>
            {isStatus === "sendurlsuccess" ? (
              <Zoom in={true}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    align: "center",
                  }}
                >
                  <Typography align="center" style={{ fontWeight: "bold" }}>
                    Successfully password reset! ✅
                  </Typography>
                  <Typography align="center" style={{ margin: "15px 0px" }}>
                    You can now use your new password to login in to your
                    account 💥
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => history.push("/")}
                  >
                    Back to login
                  </Button>
                </div>
              </Zoom>
            ) : isStatus === "sendurlfailed" ? (
              <Zoom in={true}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    align: "center",
                  }}
                >
                  <Typography align="center" style={{ fontWeight: "bold" }}>
                    Failed password reset ❌
                  </Typography>
                  <Typography align="center" style={{ margin: "15px 0px" }}>
                    Please input your email again to forgot password page. Thank
                    you 💥
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => history.push("/forgot-password")}
                  >
                    Back to Forgot Password
                  </Button>
                </div>
              </Zoom>
            ) : (
              <Zoom in={true}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    align: "center",
                  }}
                >
                  <Typography align="center" style={{ fontWeight: "bold" }}>
                    Reset Your Password 🔑
                  </Typography>
                  <form onSubmit={(e) => onSubmitPassword(e)}>
                    <Typography>New Password</Typography>
                    <TextField
                      placeholder="Enter a new password"
                      variant="outlined"
                      fullWidth
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      margin="normal"
                      type="password"
                      size="small"
                    />
                    <Typography>Confirm New Password</Typography>
                    <TextField
                      placeholder="Confirm your new password"
                      variant="outlined"
                      fullWidth
                      required
                      value={rePassword}
                      onChange={(e) => setRepassword(e.target.value)}
                      margin="normal"
                      type="password"
                      size="small"
                    />
                    {isLoading ? (
                      <Button
                        fullWidth
                        variant="contained"
                        disabled
                        style={{ marginTop: 10 }}
                      >
                        Resetting your password...
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 10 }}
                      >
                        Reset my password
                      </Button>
                    )}
                  </form>
                </div>
              </Zoom>
            )}
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default ResetPasswordInput;
