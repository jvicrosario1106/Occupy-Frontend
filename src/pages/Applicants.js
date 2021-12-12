import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { FcKindle } from "react-icons/fc";
import * as api from "../api";
import {
  deleteApplication,
  updateApplicationStatus,
} from "../actions/employee";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useDispatch } from "react-redux";
import All from "./application/All";
import Approved from "./application/Approved";
import Rejected from "./application/Rejected";
import Progress from "./application/Progress";
import Title from "./Title";
import { useHistory } from "react-router-dom";

const Applicants = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const roleTypes = JSON.parse(localStorage.getItem("user"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <Typography>{children}</Typography>}</div>;
  }
  const [applicants, setApplicants] = useState([]);

  const approved = applicants.filter(
    (app) => app.applicants_status === "Approved"
  );
  const rejected = applicants.filter(
    (app) => app.applicants_status === "Rejected"
  );
  const progress = applicants.filter(
    (app) => app.applicants_status === "Pending"
  );

  const loadApplicants = async () => {
    const res = await api.baseUrl.get("get_all_application/");
    setApplicants(res.data);
  };

  useEffect(() => {
    loadApplicants();

    if (roleTypes.role === "Client") {
      history.push("/home");
    }
  }, []);

  const approvedApplication = (id, status) => {
    const approvedStatus = applicants.map((app) =>
      app.id === id ? { ...app, applicants_status: status } : app
    );
    const confirm = window.confirm(
      "Are you sure you want to approved this application? This will send an email message to customer"
    );
    if (confirm) {
      dispatch(
        updateApplicationStatus(JSON.stringify({ id: id, status: status }))
      );
      setApplicants(approvedStatus);
    }
  };

  const rejectApplication = (id, status) => {
    const rejectStatus = applicants.map((app) =>
      app.id === id ? { ...app, applicants_status: status } : app
    );
    const confirm = window.confirm(
      "Are you sure you want to reject this application? This will send an email message to customer"
    );
    if (confirm) {
      dispatch(
        updateApplicationStatus(JSON.stringify({ id: id, status: status }))
      );
      setApplicants(rejectStatus);
    }
  };

  const progressApplication = (id, status) => {
    const progressStatus = applicants.map((app) =>
      app.id === id ? { ...app, applicants_status: status } : app
    );
    const confirm = window.confirm(
      "Are you sure you want to change the status of application to Progress? This will send an email message to customer"
    );
    if (confirm) {
      dispatch(
        updateApplicationStatus(JSON.stringify({ id: id, status: status }))
      );
      setApplicants(progressStatus);
    }
  };

  const deleteItemApplication = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (confirm) {
      const deleteItem = applicants.filter((app) => app.id !== id);
      dispatch(deleteApplication(id));
      setApplicants(deleteItem);
    }
  };

  return (
    <div>
      <Title title={"Applicants"} />
      <Container>
        <Grid container style={{ margin: "10px 0px" }}>
          <Grid item>
            <Paper style={{ display: "flex", padding: 5 }}>
              <FcKindle size={30} />
              <Typography variant="h6" color="primary">
                Application Management
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper style={{ marginBottom: 15 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label={`All Applicants (${applicants.length})`} />
            <Tab label={`Approved Applicants (${approved.length})`} />

            <Tab label={`Pending Applicants (${progress.length})`} />
            <Tab label={`Rejected Applicants (${rejected.length})`} />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <All
            applicants={applicants}
            approvedApplication={approvedApplication}
            rejectApplication={rejectApplication}
            progressApplication={progressApplication}
            deleteItemApplication={deleteItemApplication}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Approved
            applicants={applicants}
            approvedApplication={approvedApplication}
            rejectApplication={rejectApplication}
            progressApplication={progressApplication}
            deleteItemApplication={deleteItemApplication}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Progress
            applicants={applicants}
            approvedApplication={approvedApplication}
            rejectApplication={rejectApplication}
            progressApplication={progressApplication}
            deleteItemApplication={deleteItemApplication}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Rejected
            applicants={applicants}
            approvedApplication={approvedApplication}
            rejectApplication={rejectApplication}
            progressApplication={progressApplication}
            deleteItemApplication={deleteItemApplication}
          />
        </TabPanel>
      </Container>
    </div>
  );
};

export default Applicants;
