import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ResidentTable from "../components/ResidentTable";
import ReserveTable from "../components/ReserveTable";
import StaffTable from "../components/StaffTable";
import AgentTable from "../components/AgentTable";
import ManagerTable from "../components/ManagerTable";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import HomeIcon from "@material-ui/icons/Home";
import AddEmployee from "../components/staff/AddEmployee";
import Snackbar from "@material-ui/core/Snackbar";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import MuiAlert from "@material-ui/lab/Alert";
import { FcCollaboration } from "react-icons/fc";
import { useSelector } from "react-redux";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    marginBottom: 40,
  },
  title: {
    flexGrow: 1,
  },
  grid1: {
    marginTop: 15,
  },
  paper1: {
    padding: 3,
    width: "17vw",
    display: "flex",
  },
  user: {
    marginLeft: 10,
  },
}));
const Users = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const isMessage = useSelector((state) => state.authReducer.message);
  const isStatus = useSelector((state) => state.authReducer.status);
  const roleTypes = JSON.parse(localStorage.getItem("user"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (roleTypes.role === "Agent" || roleTypes.role === "Client") {
      history.push("/home");
    }
  }, []);

  return (
    <div>
      <Title title={"Users"} />
      <Container>
        <Grid container className={classes.grid1}>
          <Grid item className={classes.title}>
            <Paper className={classes.paper1}>
              <FcCollaboration size={30} />
              <Typography variant="h6" color="primary" className={classes.user}>
                Users Management
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Typography color="primary">
              <AddEmployee />
            </Typography>
          </Grid>
        </Grid>

        {/* Snackbar And Alert */}
        {isStatus === "Failed" && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {isMessage[0]}🙁
            </Alert>
          </Snackbar>
        )}
        {isStatus === "Success" && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              You successfully Added New Employee 😊
            </Alert>
          </Snackbar>
        )}

        <Paper>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            className={classes.root}
            centered
          >
            <Tab icon={<SupervisorAccountIcon />} label="Staff" />
            <Tab icon={<SupervisedUserCircleIcon />} label="Manager" />
            <Tab icon={<AssignmentIndIcon />} label="Agent" />
            <Tab icon={<HomeIcon />} label="Resident" />
            <Tab icon={<EventSeatIcon />} label="Reserved" />
          </Tabs>
        </Paper>
        <Paper>
          <TabPanel value={value} index={0}>
            <StaffTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ManagerTable />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AgentTable />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ResidentTable />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ReserveTable />
          </TabPanel>
        </Paper>
      </Container>
    </div>
  );

  function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <Typography>{children}</Typography>}</div>;
  }
};

export default Users;
