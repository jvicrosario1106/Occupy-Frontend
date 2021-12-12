import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import ViewCustomerResidentForm from "../components/staff/ViewCustomerResidentForm";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { loadUser, verifyUser } from "../actions/auth";

import * as api from "../api";

const useStyles = makeStyles((theme) => ({
  paper1: {
    width: 530,
    // height: 640,
    padding: 10,
    marginTop: 3,
  },
  paper2: {
    width: 530,
    // height: 290,
    padding: 10,
    marginTop: 9,
  },
  paper3: {
    width: "76vw",
    padding: 10,
    margin: "20px 0px",
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    padding: 6,
    color: "white",
    marginBottom: 13,
  },
  title2: {
    backgroundColor: theme.palette.primary.main,
    padding: 6,
    color: "white",

    marginBottom: 6,
  },
  name: {
    width: 165,
  },
  date: {
    width: 345,
  },
  citizenshipmarital: {
    width: 253,
    height: 42,
  },
  sex: {
    height: 42,
    width: 165,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 4,
    color: "#fff",
  },
  occupation: {
    width: 525,
  },
  properties: {
    margin: "15px 0px",
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif',
  },
  status: {
    marginTop: 13,
  },
  reservation: {
    width: 250,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: "50%",
    marginBottom: 20,
  },
}));

const ViewCustomerReservation = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [customerData, setcustomerData] = useState(null);

  const loadCustomer = async () => {
    const { data } = await api.baseUrl.get(`get_one_customer/${id}/`);
    setcustomerData(data);
  };

  useEffect(() => {
    loadCustomer();
  }, []);

  return (
    <div>
      <Container>
        {customerData ? (
          customerData.map((cust) => (
            <ViewCustomerResidentForm cust={cust} classes={classes} />
          ))
        ) : (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Container>
    </div>
  );
};

export default ViewCustomerReservation;
