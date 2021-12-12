import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";
import AddResident from "../components/staff/AddResident";
import {
  FcFullTrash,
  FcBinoculars,
  FcExport,
  FcUp,
  FcConferenceCall,
} from "react-icons/fc";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Paper from "@material-ui/core/Paper";
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
  grid1: {
    flexGrow: 1,
  },
  paper1: {
    padding: 3,
    width: "20vw",
    display: "flex",
  },
  resident: {
    marginLeft: 10,
  },
}));

const Reservation = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [ResidentCustomer, setResidentCustomer] = useState([]);
  const [open, setOpen] = React.useState(true);
  const roleTypes = JSON.parse(localStorage.getItem("user"));
  const isMessage = useSelector((state) => state.authReducer.message);
  const isStatus = useSelector((state) => state.authReducer.status);
  // Snackbar
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const loadResidentUser = async () => {
    const res = await api.baseUrl.get("get_all_customer_resident/");
    setResidentCustomer(res.data);
  };

  useEffect(() => {
    loadResidentUser();

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

  const deleteResident = (id, email) => {
    const con = window.confirm(`Do you want to Delete ${email}?`);
    if (con) {
      const prompt = window.prompt("Type DELETE to delete this user");
      if (prompt === "DELETE" || prompt === "delete") {
        const data = ResidentCustomer.filter((i) => i.id !== id);
        setResidentCustomer(data);
        dispatch(deleteUser(id));
      }
    }
  };

  return (
    <div>
      <Title title={"Resident"} />
      <Container style={{ minHeight: "90vh" }}>
        <Grid container>
          <Grid item className={classes.grid1}>
            <Typography className={classes.title} variant="h6" color="primary">
              <Paper className={classes.paper1}>
                <FcConferenceCall size={30} />
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.resident}
                >
                  Resident Management ({ResidentCustomer.length})
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
                    You successfully Added 1 New Resident 😊
                  </Alert>
                </Snackbar>
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="center" className={classes.title}>
              <AddResident
                setResidentCustomer={setResidentCustomer}
                ResidentCustomer={ResidentCustomer}
              />
            </Typography>
          </Grid>
        </Grid>
        <MaterialTable
          icons={tableIcons}
          title="Resident Customer"
          data={ResidentCustomer ? ResidentCustomer : ResidentCustomer.display}
          columns={columns}
          editable
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
                history.push(`view-customer-resident/${rowData.id}`),
            },

            {
              icon: FcFullTrash,
              tooltip: "Delete User",
              onClick: (event, rowData) =>
                deleteResident(rowData.id, rowData.email),
            },
          ]}
        />
      </Container>
    </div>
  );
};

export default Reservation;
