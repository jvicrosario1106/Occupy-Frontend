import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { FcDocument } from "react-icons/fc";
import ReservationDoc from "../../components/ReservationDoc";
import ResidentDoc from "../../components/ResidentDoc";
import CompanyDoc from "../../components/CompanyDoc";
import Title from "../Title";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: 20,
    marginTop: 10,
    flexGrow: 1,
  },
  paper1: {
    padding: 3,
    width: "21vw",
    display: "flex",
  },
  grid1: {
    flexGrow: 1,
  },
  reservation: {
    marginLeft: 10,
  },
}));

const Accounting = () => {
  // Snackbar

  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const roleTypes = JSON.parse(localStorage.getItem("user"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (roleTypes.role === "Client") {
      history.push("/home");
    }
  }, []);

  return (
    <div>
      <Title title={"Documents"} />
      <Container>
        <Grid container>
          <Grid item className={classes.grid1}>
            <Typography className={classes.title} variant="h6" color="primary">
              <Paper className={classes.paper1}>
                <FcDocument size={30} />
                <Typography
                  color="primary"
                  variant="h6"
                  className={classes.reservation}
                >
                  Document Management
                </Typography>
              </Paper>
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="center" className={classes.title}></Typography>
          </Grid>
        </Grid>

        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Resident Documents" />
          <Tab label="Reserved Documents" />
          {roleTypes && roleTypes.role !== "Agent" && (
            <Tab label="Company Documents" />
          )}
        </Tabs>

        <TabPanel value={value} index={0}>
          <ResidentDoc />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ReservationDoc />
        </TabPanel>
        {roleTypes && roleTypes.role !== "Agent" && (
          <TabPanel value={value} index={2}>
            <CompanyDoc />
          </TabPanel>
        )}
      </Container>
    </div>
  );
  function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <Typography>{children}</Typography>}</div>;
  }
};

export default Accounting;
