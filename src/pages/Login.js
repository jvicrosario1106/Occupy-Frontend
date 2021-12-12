import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Background from "../img/login.jpg";
import LoginRight from "../img/img-6.svg";
import { jwtCreate, loadUser, verifyUser } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, withRouter, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FcLock, FcButtingIn } from "react-icons/fc";
import CssBaseline from "@material-ui/core/CssBaseline";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  paper1: {
    height: 500,
    padding: 20,
    backgroundColor: theme.palette.primary.main,
  },
  paper2: {
    height: 500,
    padding: 20,
  },
  button: {
    marginTop: 30,
  },
  terms: {
    marginTop: 30,
  },
  form: {
    marginTop: 40,
  },
  background: {
    background: ` linear-gradient( rgba(0, 0, 0,0.3) 100%, rgba(0, 0, 0,0.3)100%),url(${Background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 3,
    color: "#fff",
  },
}));

const Login = () => {
  const [loginCredentials, setloginCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(verifyUser());
    dispatch(loadUser());
  }, []);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(false);

  const [isLoading, setIsloading] = useState(false);

  const onChangeCredential = (e) => {
    setloginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
    if (loginCredentials.password.length >= 1) {
      if (loginCredentials.password.length < 7) {
        setErrorMessage(true);
      } else {
        setErrorMessage(false);
      }
    } else {
      setErrorMessage(false);
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const isMessage = useSelector((state) => state.authReducer.message);

  const onSubmitLoginCredentials = (e) => {
    e.preventDefault();
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
    dispatch(jwtCreate(loginCredentials));
  };

  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <Title title={"Welcome to Occupy"} />
      <CssBaseline />
      <div className={classes.background}>
        <Container>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item lg={6} md={10} sm={11}>
              <Paper className={classes.paper1}>
                <img
                  src="https://occupyrem-bucket.s3.ap-southeast-1.amazonaws.com/occupy.PNG"
                  width="20%"
                  alt=""
                />
                <Typography align="center">
                  <img src={LoginRight} width="80%" alt="" />
                </Typography>
              </Paper>
            </Grid>
            <Grid item lg={6} md={10} sm={12}>
              <Paper className={classes.paper2}>
                <Typography variant="h3" align="center" color="primary">
                  Welcome to Occupy
                </Typography>

                <form
                  onSubmit={onSubmitLoginCredentials}
                  method="post"
                  className={classes.form}
                >
                  {isMessage ? (
                    <Snackbar open={true} autoHideDuration={6000}>
                      <Alert severity="error">{isMessage} 🙁</Alert>
                    </Snackbar>
                  ) : null}

                  <Typography variant="subtitle1"> Username </Typography>
                  <TextField
                    name="email"
                    variant="outlined"
                    label="Email"
                    fullWidth
                    autoComplete
                    placeholder="Username e.g ( johndoe@gmail.com )"
                    type="email"
                    size="medium"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FcButtingIn size={30} />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => onChangeCredential(e)}
                  />
                  <Typography variant="subtitle1"> Password </Typography>
                  <TextField
                    name="password"
                    variant="outlined"
                    label="Password"
                    fullWidth
                    placeholder="Password must be 8 characters"
                    type="password"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FcLock size={30} />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => onChangeCredential(e)}
                  />
                  <Typography>
                    {errorMessage && (
                      <Typography style={{ color: "red" }}>
                        The Password must contains 8 characters 🤔
                      </Typography>
                    )}
                  </Typography>
                  <Typography align="right">
                    <Link
                      style={{ cursor: "pointer" }}
                      onClick={() => history.push("/forgot-password")}
                    >
                      Forgot Password?
                    </Link>
                  </Typography>
                  {isLoading ? (
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      disabled
                    >
                      Logging In...
                    </Button>
                  ) : (
                    <Button
                      className={classes.button}
                      variant="contained"
                      fullWidth
                      size="large"
                      type="submit"
                      color="primary"
                    >
                      Login
                    </Button>
                  )}

                  {/* <Typography
                    variant="overline"
                    align="center"
                    className={classes.terms}
                  >
                    <Link href="#">Terms and Conditions</Link>
                  </Typography> */}
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default withRouter(Login);
