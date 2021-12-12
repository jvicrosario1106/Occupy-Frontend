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
import AddResidentForm from "./AddResidentForm";

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

const AddReservation = ({ setResidentCustomer, ResidentCustomer }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [residentCustomerInfo, setresidentCustomerInfo] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    dateofbirth: "",
    is_staff: "False",
    role: "Client",
    department: 1,
    password: "",
    re_password: "",
    status: "Resident",
    email: "",
  });
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const isMessage = useSelector((state) => state.authReducer.message);

  //Opening the Modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Closing the Modal
  const handleClose = () => {
    setOpen(false);
  };

  //OnChanging Resident Information
  const onChangeInfo = (e) => {
    setresidentCustomerInfo({
      ...residentCustomerInfo,
      [e.target.name]: e.target.value,
    });
  };

  //Submitting Resident Info to redux and api
  const onSubmitResident = (e) => {
    e.preventDefault();
    const confirm = window.confirm(
      "Are you sure you want to create account for resident?"
    );
    if (confirm) {
      const prompt = window.prompt("Type CONFIRM to proceed");
      if (prompt === "CONFIRM" || prompt === "confirm") {
        dispatch(createCustomer(residentCustomerInfo));

        setresidentCustomerInfo({
          first_name: "",
          middle_name: "",
          last_name: "",
          dateofbirth: "",
          is_staff: "False",
          role: "Client",
          department: 1,
          password: "",
          re_password: "",
          status: "Resident",
          email: "",
        });
        setisLoading(true);
        setTimeout(() => {
          window.location.reload();
        }, 5100);
      }
    }
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
        New Resident
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
        <Paper className={classes.paper}>
          <Typography variant="h4" color="primary">
            New Resident
          </Typography>

          <form
            onSubmit={onSubmitResident}
            method="post"
            className={classes.form}
          >
            <AddResidentForm
              onChangeInfo={onChangeInfo}
              isLoading={isLoading}
              handleClose={handleClose}
            />
          </form>
        </Paper>
      </Modal>
    </div>
  );
};

export default AddReservation;
