import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { updateProfile } from "../../actions/employee";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router";
import * as api from "../../api";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: 30,
  },
  form: {
    marginTop: 35,
  },
  img: {
    borderRadius: "50%",
    height: "200px",
    width: "200px",
    margin: "10px",
  },
  buttons: {
    marginTop: "50px",
  },
}));

const ProfileImage = ({
  image,
  emp,
  setImage,
  onSubmitImage,
  employeeInfoUpdate,
  opens,
  setOpens,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [image, setImage] = useState();

  // Opening the Model
  const handleClickOpen = () => {
    setOpens(true);
  };

  //Closing the Modal
  const handleClose = () => {
    setOpens(false);
  };

  // Onchanging the Picture of Employee
  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
  console.log(emp);

  return (
    <div>
      <Button
        size="small"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        endIcon={<ImageIcon />}
      >
        Change your Profile
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={opens}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Paper className={classes.paper}>
          <Typography variant="h5" color="primary" align="center">
            Change your Profile Image
          </Typography>

          <form onSubmit={(e) => onSubmitImage(e)} method="POST">
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              direction="column"
              spacing={1}
            >
              <Grid item>
                <img
                  className={classes.img}
                  src={emp.customer_profile}
                  alt="sss"
                />
              </Grid>
              <Grid item>
                <Typography variant="body1">{image && image.name}</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  component="label"
                >
                  Upload File
                  <input
                    type="file"
                    hidden
                    name="profile"
                    onChange={(e) => onChangeImage(e)}
                  />
                </Button>
              </Grid>{" "}
            </Grid>
            <Typography align="right" className={classes.buttons}>
              <Button
                onClick={(e) => onSubmitImage(e)}
                color="primary"
                size="small"
                variant="contained"
              >
                Confirm
              </Button>
              <Button size="small" onClick={handleClose}>
                Cancel
              </Button>
            </Typography>
          </form>
        </Paper>
      </Modal>
    </div>
  );
};

export default ProfileImage;
