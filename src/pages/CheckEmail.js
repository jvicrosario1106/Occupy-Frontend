import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import RightImage from "../img/img-6.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  great: {
    marginTop: 30,
    fontWeight: "bold",
  },
  everything: {
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
const CheckEmail = () => {
  const classes = useStyles();
  return (
    <div>
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
          <Typography variant="h3" color="primary" className={classes.great}>
            GREAT!
          </Typography>
          <Typography
            variant="h3"
            color="primary"
            className={classes.everything}
          >
            EVERYTHING IS READY.
          </Typography>
          <Typography variant="body2" className={classes.notice}>
            You will receive a confirmation email on the given email address
            that you gave
          </Typography>

          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Check Your Email
          </Button>

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

export default CheckEmail;
