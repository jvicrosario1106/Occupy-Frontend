import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typograhy from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import {
  FcBarChart,
  FcConferenceCall,
  FcHome,
  FcBusinessman,
  FcPodiumWithAudience,
} from "react-icons/fc";
import { FiArrowRight, FiHome } from "react-icons/fi";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DepartmentSummary from "../components/admin/dashboard/DepartmentSummary";
import * as api from "../api";
import { Divider, IconButton } from "@material-ui/core";
import Title from "./Title";
import { loadUser, verifyUser } from "../actions/auth";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  grid1: {
    marginTop: 5,
    marginBottom: 6,
  },
  paper1: {
    flexGrow: 1,
    width: "20vw",
    padding: 5,
  },
  paper2: {
    padding: 5,
    width: "9vw",
    borderTop: "3px solid #8E30FF",
  },
  paper3: {
    padding: 8,
    width: "9.5vw",
    marginBottom: 16,
    borderLeft: "3px solid #8E30FF",
    display: "flex",
  },
  paper4: {
    padding: 13,
    marginBottom: 15,
    flexGrow: 1,
    width: "90%",
  },
  paper5: {
    padding: 15,
    // width: "23vw",

    marginBottom: 17,
  },
  paper6: {
    padding: 20,
    width: "43vw",
    height: "26vh",
    marginBottom: 17,
  },
  div1: {
    display: "flex",
  },

  dashboard: {
    marginLeft: 5,
  },
  summary1: {
    marginLeft: 35,
    opacity: 0.6,
  },
  div4: {
    display: "flex",
    marginBottom: 6,
  },
  department: {
    flexGrow: 1,
    marginLeft: 10,
    fontWeight: 500,
    opacity: 0.7,
  },
  opacity: {
    opacity: 0.6,
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);
  const [dashboard, setDashboard] = useState([]);
  const [count, setCount] = useState(null);
  const DateYear = new Date();
  const currentYear = DateYear.getFullYear();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user && user.id;
  const dispatch = useDispatch();
  const [years, setYear] = useState(currentYear);

  const loadEmployees = async () => {
    const res = await api.baseUrl.get("get_all_employee/");
    setEmployees(res.data);
  };
  const loadDashboard = async () => {
    const res = await api.baseUrl.get("admin_dashboard/");
    setDashboard(res.data);
  };
  const loadCount = async () => {
    const res = await api.baseUrl.get("admin_count/");
    setCount(res.data);
  };

  useEffect(() => {
    dispatch(verifyUser());
    dispatch(loadUser());
    loadEmployees();
    loadDashboard();
    loadCount();
  }, [userId]);

  const year = count
    ? count.applicants_monthly.filter(
        (y) => new Date(y.month).getFullYear() === parseInt(years)
      )
    : null;

  const getCount = count
    ? year.map((c) => {
        return c.count;
      })
    : null;

  const month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "Aug";
  month[8] = "Sept";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";

  const getMonth = count
    ? year.map((m) => {
        return month[new Date(m.month).getMonth()];
      })
    : null;

  var generateYear = 2021;
  var arrayYear = new Array();

  for (var i = generateYear; i <= 2050; i++) {
    arrayYear.push(generateYear);
    generateYear++;
  }

  return (
    <div>
      <Title title={"Home"} />
      <Container>
        {/* First Grid Container */}
        <Grid container spacing={2} className={classes.grid1}>
          <Grid item className={classes.paper1}>
            <Paper className={classes.paper1}>
              <div className={classes.div1}>
                <FcBarChart size={30} />
                <Typograhy variant="h6" className={classes.dashboard}>
                  Dashboard
                </Typograhy>
              </div>
              <Typograhy variant="body1" className={classes.summary1}>
                Dashboard Summary
              </Typograhy>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper2}>
              <Typograhy align="center" variant="h6" color="primary">
                {count && count.available_prop}
              </Typograhy>

              <Typograhy
                align="center"
                variant="body1"
                className={classes.opacity}
              >
                Available <FiHome />
              </Typograhy>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper2}>
              <Typograhy align="center" variant="h6" color="primary">
                {count && count.reserved_prop}
              </Typograhy>
              <Typograhy
                align="center"
                variant="body1"
                className={classes.opacity}
              >
                Reserved <FiHome />
              </Typograhy>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper2}>
              <Typograhy align="center" variant="h6" color="primary">
                {count && count.sold_prop}
              </Typograhy>
              <Typograhy
                align="center"
                variant="body1"
                className={classes.opacity}
              >
                Sold <FiHome />
              </Typograhy>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper2}>
              <Typograhy align="center" variant="h6" color="primary">
                {count && count.total_prop}
              </Typograhy>
              <Typograhy
                align="center"
                variant="body1"
                className={classes.opacity}
              >
                Total <FiHome />
              </Typograhy>
            </Paper>
          </Grid>
        </Grid>

        {/* Second Grid Container */}
        <Grid container spacing={2} lg={20} md={12} sm={6}>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item>
                <Paper className={classes.paper3}>
                  <Typograhy variant="h4">
                    <FcConferenceCall size={40} />
                  </Typograhy>
                  <div style={{ marginLeft: 10 }}>
                    <Typograhy variant="h4" align="center">
                      {count && count.user}
                    </Typograhy>
                    <Typograhy variant="body1" className={classes.opacity}>
                      {" "}
                      Users
                    </Typograhy>
                  </div>
                </Paper>
                <Paper className={classes.paper3}>
                  <Typograhy variant="h4">
                    <FcHome size={40} />
                  </Typograhy>
                  <div style={{ marginLeft: 10 }}>
                    <Typograhy variant="h4" align="center">
                      {count && count.resident}
                    </Typograhy>
                    <Typograhy variant="body1" className={classes.opacity}>
                      Resident
                    </Typograhy>
                  </div>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper3}>
                  <Typograhy variant="h4">
                    <FcPodiumWithAudience size={40} />
                  </Typograhy>
                  <div style={{ marginLeft: 10 }}>
                    <Typograhy variant="h4" align="center">
                      {count && count.reserved}
                    </Typograhy>
                    <Typograhy variant="body1" className={classes.opacity}>
                      Reserved
                    </Typograhy>
                  </div>
                </Paper>
                <Paper className={classes.paper3}>
                  <Typograhy variant="h4">
                    <FcBusinessman size={40} />
                  </Typograhy>
                  <div style={{ marginLeft: 10 }}>
                    <Typograhy variant="h4" align="center">
                      {count && count.employee}
                    </Typograhy>
                    <Typograhy variant="body1" className={classes.opacity}>
                      Employee
                    </Typograhy>
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <Paper className={classes.paper5}>
              <Typograhy className={classes.opacity}>
                Latest Customer Account (5)
              </Typograhy>

              {dashboard.length > 0 &&
                dashboard.map((latest) => (
                  <Grid container spacing={1} style={{ marginTop: 10 }}>
                    <Grid item>
                      <img
                        src={latest.customer_profile}
                        alt=""
                        style={{ width: 50, height: 50, borderRadius: "50%" }}
                      />
                    </Grid>

                    <Grid item>
                      <Typograhy variant="caption" color="primary">
                        {latest.customer.first_name}{" "}
                        {latest.customer.middle_name}{" "}
                        {latest.customer.last_name}
                      </Typograhy>
                      <Grid item>
                        <Typograhy variant="caption">
                          {latest.customer.email}
                        </Typograhy>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typograhy
                        variant="caption"
                        style={{
                          background: "#8E30FF",
                          color: "white",
                          padding: 3,
                          borderRadius: 3,
                        }}
                      >
                        {latest.customer.status}
                      </Typograhy>
                      <Grid item>
                        <Typograhy variant="caption">
                          {latest.customer.is_active ? "Active" : "Not Active"}
                        </Typograhy>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              <Divider />
            </Paper>
          </Grid>

          <Grid item>
            <Paper className={classes.paper4}>
              <div className={classes.div4}>
                <Typograhy variant="body1" className={classes.department}>
                  Applicants Summary
                </Typograhy>
              </div>
              <Typograhy variant="body1" align="right">
                <select
                  name=""
                  id=""
                  value={years}
                  onChange={(e) => setYear(e.target.value)}
                  style={{ opacity: 0.6 }}
                >
                  {arrayYear.length > 0 &&
                    arrayYear.map((year) => (
                      <option value={year}> {`Applicants of ${year}`} </option>
                    ))}
                </select>
              </Typograhy>

              {count && (
                <DepartmentSummary getCount={getCount} getMonth={getMonth} />
              )}
            </Paper>

            <TableContainer component={Paper} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex" }}>
                <Typograhy
                  className={classes.opacity}
                  style={{ padding: 10, flexGrow: 1 }}
                >
                  Newly Hired Employees (5)
                </Typograhy>
              </div>
              <Table aria-label="simple table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Profile</TableCell>
                    <TableCell align="left">First name</TableCell>
                    <TableCell align="left">Middle</TableCell>
                    <TableCell align="left">Last</TableCell>

                    <TableCell align="left">Position</TableCell>
                    <TableCell align="left">Department</TableCell>
                    <TableCell align="left">Account</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.length > 0 &&
                    employees.map((emp) => (
                      <TableRow key={emp.id} hover={true}>
                        <TableCell padding="normal">
                          <img
                            src={emp.customer_profile}
                            alt=""
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: "50%",
                            }}
                          />
                        </TableCell>
                        <TableCell>{emp.customer.first_name}</TableCell>
                        <TableCell>{emp.customer.middle_name}</TableCell>
                        <TableCell>{emp.customer.last_name}</TableCell>

                        <TableCell>{emp.customer.role}</TableCell>
                        <TableCell>
                          {emp.customer.department === null
                            ? "N/A"
                            : emp.customer.department.name}
                        </TableCell>
                        <TableCell>
                          {emp.customer.is_active === true ? (
                            <Typograhy
                              align="center"
                              style={{
                                backgroundColor: "rgba(46, 204, 113,1.0)",
                                color: "white",
                              }}
                            >
                              Active
                            </Typograhy>
                          ) : (
                            <Typograhy
                              align="center"
                              variant="outlined"
                              style={{
                                backgroundColor: "rgba(235, 77, 75,0.9)",
                                color: "white",
                                padding: 5,
                              }}
                            >
                              Not Active
                            </Typograhy>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* </Paper> */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminDashboard;
