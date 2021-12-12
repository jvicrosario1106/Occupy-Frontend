import React, { Fragment, useState } from "react";
import "../css/form.css";
import Signup from "./Signup";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import RegisterRight from "../img/img-5.svg";

const useStyles = makeStyles((theme) => ({
  paper1: {
    backgroundColor: theme.palette.primary.main,
    height: 570,
    width: 590,
    padding: 10,
  },
  paper2: {
    height: 570,
    width: 624,
    padding: 10,
  },
}));

const Form = ({ handleClose }) => {
  const classes = useStyles();
  return (
    <Fragment>
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
              alt=""
            />
            <Typography align="center">
              <img src={RegisterRight} width="80%" alt="" />
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper2} elevation={3}>
            <Signup handleClose={handleClose} />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Form;
