import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";
import AddReservation from "../components/staff/AddReservation";
import {
  FcFullTrash,
  FcBinoculars,
  FcExport,
  FcUp,
  FcPackage,
} from "react-icons/fc";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../actions/customer";
import * as api from "../api";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: 20,
    marginTop: 10,
    flexGrow: 1,
  },
  paper1: {
    padding: 3,
    width: "22vw",
    display: "flex",
  },
  grid1: {
    flexGrow: 1,
  },
  reservation: {
    marginLeft: 10,
  },
}));

const Reservation = () => {
  // Snackbar
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [ReservedCustomer, setReservedCustomer] = useState([]);
  const roleTypes = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(true);
  const isMessage = useSelector((state) => state.authReducer.message);
  const isStatus = useSelector((state) => state.authReducer.status);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const loadReservedUser = async () => {
    const res = await api.baseUrl.get("get_all_customer_reserved/");
    setReservedCustomer(res.data);
  };

  useEffect(() => {
    loadReservedUser();

    if (roleTypes.role === "Client" || roleTypes.role === "Agent") {
      history.push("/home");
    }
  }, []);

  const columns = [
    {
      title: "First Name",
      field: "first_name",
    },
    {
      title: "Last Name",
      field: "last_name",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Status",
      field: "status",
    },
    {
      title: "Account",
      field: "is_active",
      render: (rowData) =>
        rowData.is_active ? (
          <Button
            style={{ color: "white" }}
            size="small"
            color="secondary"
            variant="contained"
          >
            Active
          </Button>
        ) : (
          <Button
            size="small"
            style={{ backgroundColor: "rgba(235, 77, 75,0.9)", color: "white" }}
            variant="contained"
          >
            Not Active
          </Button>
        ),
    },
  ];

  const tableIcons = {
    Search: Search,
    Clear: Clear,
    FirstPage: FirstPage,
    LastPage: LastPage,
    PreviousPage: ChevronLeft,
    NextPage: ChevronRight,
    ResetSearch: Clear,
    SortArrow: FcUp,
    Export: FcExport,
  };

  const deleteReservation = (id, email) => {
    const con = window.confirm(`Do you want to Delete ${email}`);
    if (con) {
      const prompt = window.prompt("Type DELETE to delete this user");
      if (prompt === "DELETE" || prompt === "delete") {
        const data = ReservedCustomer.filter((i) => i.id !== id);
        setReservedCustomer(data);
        dispatch(deleteUser(id));
      }
    }
  };

  return (
    <div>
      <Title title={"Reservation"} />
      <Container style={{ minHeight: "90vh" }}>
        <Grid container>
          <Grid item className={classes.grid1}>
            <Typography className={classes.title} variant="h6" color="primary">
              <Paper className={classes.paper1}>
                <FcPackage size={30} />
                <Typography
                  color="primary"
                  variant="h6"
                  className={classes.reservation}
                >
                  Reservation Management ({ReservedCustomer.length})
                </Typography>
              </Paper>

              {isStatus === "Failed" && (
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="error">
                    {isMessage[0]}🙁
                  </Alert>
                </Snackbar>
              )}
              {isStatus === "Success" && (
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="success">
                    You successfully Added 1 New Reservation 😊
                  </Alert>
                </Snackbar>
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="center" className={classes.title}>
              <AddReservation
                setReservedCustomer={setReservedCustomer}
                ReservedCustomer={ReservedCustomer}
                isMessage={isMessage}
              />
            </Typography>
          </Grid>
        </Grid>
        <MaterialTable
          icons={tableIcons}
          title="Reserved Customer"
          data={ReservedCustomer ? ReservedCustomer : ReservedCustomer.display}
          columns={columns}
          options={{
            headerStyle: {
              fontSize: 16,
              fontWeight: 100,
            },
            sorting: true,
            pageSize: 10,
            draggable: true,
            exportButton: true,
            searchAutoFocus: true,
            rowStyle: {
              fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif',
            },
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: FcBinoculars,
              tooltip: "View User",
              onClick: (event, rowData) =>
                history.push(`view-customer-reservation/${rowData.id}`),
            },

            {
              icon: FcFullTrash,
              tooltip: "Delete User",
              onClick: (event, rowData) =>
                deleteReservation(rowData.id, rowData.email),
            },
          ]}
        />
      </Container>
    </div>
  );
};

export default Reservation;
