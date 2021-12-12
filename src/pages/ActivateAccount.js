import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activateUser } from "../actions/auth";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import RightImage from "../img/img-6.svg";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { FcApproval } from "react-icons/fc";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Zoom from "@material-ui/core/Zoom";
import { useHistory, withRouter } from "react-router-dom";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  vefication: {
    marginTop: 60,
    marginBottom: 20,
    fontWeight: "bold",
  },
  notice: {
    marginBottom: 30,
  },
  button: {
    marginBottom: 30,
    borderRadius: 10,
  },
  image: {
    width: "90vh",
  },
}));

const ActivateAccount = () => {
  const { uid, token } = useParams();
  const [open, setOpen] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  //Activating the Account by Clicking it using Redux Dispatch
  const onClickActivate = () => {
    setIsloading(true);
    dispatch(activateUser(uid, token));
  };

  //Redirecting to Login
  const backToLogin = () => {
    history.push("/");
  };

  //Alert Features
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  //Alert Features
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const classes = useStyles();
  const isMessage = useSelector((state) => state.authReducer.message);

  return (
    <div>
      <Title title={"Activate Account"} />

      {isMessage === "ActivationSuccess" && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Congratulations, You Successfully Activate your Account
          </Alert>
        </Snackbar>
      )}

      {isMessage === "ActivationFailed" && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Invalid user id or user doesn't exist.
          </Alert>
        </Snackbar>
      )}

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <img
            src="https://occupyrem-bucket.s3.ap-southeast-1.amazonaws.com/occupy.PNG"
            width="20%"
            alt=""
          />

          {isMessage === "ActivationSuccess" ? (
            <Zoom in={true}>
              <Typography
                variant="h3"
                color="primary"
                className={classes.vefication}
                align="center"
              >
                EMAIL VERIFIED <FcApproval size={40} />
              </Typography>
            </Zoom>
          ) : (
            <Typography
              variant="h3"
              color="primary"
              className={classes.vefication}
              align="center"
            >
              EMAIL VERIFICATION
            </Typography>
          )}

          <Typography variant="body2" className={classes.notice}>
            You will receive a confirmation email on the given email address
            that you gave
          </Typography>

          {isMessage === "ActivationSuccess" ? (
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              fullWidth
              onClick={backToLogin}
              endIcon={<ChevronRightIcon />}
            >
              Go back to Login Page
            </Button>
          ) : isLoading ? (
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              fullWidth
              onClick={onClickActivate}
              disabled
            >
              Activating your account. Please Wait
            </Button>
          ) : (
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              fullWidth
              onClick={onClickActivate}
            >
              Activate your Account
            </Button>
          )}

          <Divider />
          <Typography variant="caption">
            Need Help? Email worldwide5@gmail.com or visit our Help Center.
          </Typography>
        </Grid>
        <Grid item>
          <img src={RightImage} className={classes.image} alt="" />
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(ActivateAccount);
