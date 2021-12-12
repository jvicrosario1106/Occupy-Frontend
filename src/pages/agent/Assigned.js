import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import { FcDebt } from "react-icons/fc";
import { FiChevronRight } from "react-icons/fi";
import { FcExport, FcUp } from "react-icons/fc";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import MaterialTable from "material-table";
import * as api from "../../api";
import { useSelector } from "react-redux";
import Title from "../Title";
import { useHistory } from "react-router-dom";
import { loadUser, verifyUser } from "../../actions/auth";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper1: {
    margin: "15px 0px",
    padding: 5,
    display: "flex",
  },
}));

const Balance = () => {
  const classes = useStyles();
  const history = useHistory();
  const [agent, setAgent] = useState(null);
  const [assign, setAssign] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user && user.id;
  const dispatch = useDispatch();

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
    DetailPanel: FiChevronRight,
  };

  const loadAgent = async () => {
    if (user) {
      const res = await api.baseUrl.get(`get_one_employee/${userId}/`);
      setAgent(res.data);
    }
  };

  const loadAssign = async () => {
    if (user) {
      const res = await api.baseUrl.get(`get_all_assigned_inquiry/${userId}/`);
      setAssign(res.data);
    }
  };

  useEffect(() => {
    dispatch(verifyUser());
    dispatch(loadUser());
    loadAgent();
    loadAssign();
  }, [userId]);

  const columns = [
    {
      title: "First Name",
      field: "first_name",
    },
    {
      title: "Middle Name",
      field: "middle_name",
    },
    {
      title: "Last Name",
      field: "last_name",
    },
    {
      title: "Inquiry Date",
      field: "date_added",
      type: "date",
    },
  ];

  return (
    <div>
      <Title title={"Assigned Inquiries"} />
      <Container>
        <Grid container>
          <Grid item>
            <Paper className={classes.paper1}>
              <FcDebt size={30} />
              <Typography variant="h6" color="primary">
                Your Assign Inquries
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {agent && (
          <MaterialTable
            icons={tableIcons}
            title="List of Inquiry"
            data={assign ? assign : assign.display}
            columns={columns}
            editable
            options={{
              headerStyle: {
                fontSize: 16,
                fontWeight: 100,
              },
              sorting: true,
              pageSize: 20,
              draggable: true,
              exportButton: true,
              searchAutoFocus: true,
              rowStyle: {
                fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif',
              },
              actionsColumnIndex: -1,
            }}
            detailPanel={(rowData) => {
              return (
                <Container>
                  <Grid container>
                    <Grid item>
                      <Typography
                        variant="h6"
                        style={{ margin: "15px 0px 10px 0px" }}
                      >
                        Inquiry's Data
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        First Name
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.first_name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Middle Name
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.middle_name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Last Name
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.last_name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Age
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.age}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Sex
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.sex}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Profession
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.profession}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Company
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.company}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Designation
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.designation}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Address
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.address}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Phone Number
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.phone_no}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Mobile Number
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.mobile_no}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Email Address
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.email}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        About the Company
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.about}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Property Land Size
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.size}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Purpose of Investment
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.purpose}
                      </Typography>
                    </Grid>
                    {/* <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Salary Per Year
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.salary}
                    </Typography>
                  </Grid> */}
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Date Added
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.date_added}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Comment
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.comments}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Agent
                      </Typography>
                      <Typography
                        style={{ opacity: 0.6, marginBottom: "10px" }}
                      >
                        {rowData.agent_name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container style={{ marginTop: 10 }}>
                    <Grid item>
                      <Typography
                        color="primary"
                        style={{ marginBottom: "10px" }}
                      >
                        Assign Agent
                      </Typography>
                      <Typography
                        style={{
                          marginBottom: "10px",
                          background: "#8E30FF",
                          padding: 5,
                          color: "white",
                          borderRadius: 5,
                        }}
                      >
                        {rowData.assign_agent}
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              );
            }}
          />
        )}
      </Container>
    </div>
  );
};

export default Balance;
