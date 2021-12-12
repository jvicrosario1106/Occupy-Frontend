import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Typography from "@material-ui/core/Typography";
import { createCustomer } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../pages/Form";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 700,
    height: 400,
    padding: 30,
  },
  form: {
    marginTop: 35,
  },
}));

const AddReservation = ({ setReservedCustomer, ReservedCustomer }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Opening the Model
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Closing the Modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="medium"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
      >
        New Employee
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Form
          //   isError={isError}
          //   onChangeInfo={onChangeInfo}
          //   isLoading={isLoading}
          handleClose={handleClose}
        />
      </Modal>
    </div>
  );
};

export default AddReservation;
