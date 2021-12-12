import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Divider, makeStyles } from "@material-ui/core";
import {
  FcSalesPerformance,
  FcInspection,
  FcProcess,
  FcTodoList,
  FcOk,
} from "react-icons/fc";
import { FiTrello, FiBookmark } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as api from "../api";
import TaskSummary from "../components/staff/TaskSummary";
import Title from "./Title";
import { loadUser, verifyUser } from "../actions/auth";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  dashboard: {
    flexGrow: 1,
  },
  dashboardflex: {
    display: "flex",
  },
  titledashboard: {
    marginLeft: 10,
  },
  dashboarddepartment: {
    marginLeft: 35,
    opacity: 0.6,
  },
  paper1: {
    width: "20vw",
    padding: 7,
    marginTop: 6,
  },
  paper2: {
    width: "50vw",
    padding: 7,
  },
  paper3: {
    width: "9.15vw",
    padding: 7,
  },
  paper4: {
    width: "27.5vw",
    padding: 10,
    marginBottom: 20,
  },
  paper5: {
    width: "47.5vw",
    padding: 7,
    marginTop: 13,
  },

  container1: {
    marginTop: 30,
  },
  button: {
    marginTop: 6,
  },
  item1: {
    marginRight: 25,
  },
  item2: {
    marginRight: 25,
    width: "50vw",
  },
  opacity: {
    opacity: 0.6,
  },
}));

const StaffDashboard = () => {
  const classes = useStyles();
  const history = useHistory();
  const [dashboard, setDashboard] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [task, setTask] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [proof, setProof] = useState([]);
  const [inquiry, setInquiry] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user && user.id;
  const dispatch = useDispatch();

  const loadDashboard = async () => {
    const res = await api.baseUrl.get("staff_dashboard/");
    setDashboard(res.data);
    setEmployees(res.data.employees);
    setTask(res.data.tasks);
    setApplicants(res.data.applicants);
    setProof(res.data.proof);
    setInquiry(res.data.inquiry);
  };

  useEffect(() => {
    dispatch(verifyUser());
    dispatch(loadUser());
    loadDashboard();
  }, [userId]);

  const EmployeeDepartment =
    employees.length > 0 &&
    employees.filter((t) => t.customer.department.id === user.department);

  const getTask =
    task.length > 0 &&
    task.filter((t) => t.department_task.id === user.department);

  const countTodo = getTask && getTask.filter((t) => t.station === "TODO");
  const countProgress =
    getTask && getTask.filter((t) => t.station === "PROGRESS");
  const countReview = getTask && getTask.filter((t) => t.station === "REVIEW");
  const countDone = getTask && getTask.filter((t) => t.station === "DONE");

  return (
    <div>
      <Title title={"Home"} />
      <Container>
        <Grid container>
          <Grid item className={classes.dashboard}>
            <Paper className={classes.paper1}>
              <Typography className={classes.dashboardflex}>
                <Typography>
                  <FcSalesPerformance size={25} />
                </Typography>
                <Typography variant="h6" className={classes.titledashboard}>
                  Dashboard
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                className={classes.dashboarddepartment}
              >
                Staff Dashboard Summary
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Button
              size="medium"
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={() => history.push("/tasks")}
              endIcon={<FiTrello />}
            >
              Go to Tasks
            </Button>
          </Grid>
        </Grid>

        <Grid container className={classes.container1}>
          <Grid item className={classes.item1}>
            <Grid container spacing={1}>
              <Grid item>
                <Paper className={classes.paper3}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 5,
                    }}
                  >
                    <FcTodoList size={25} style={{ marginRight: 5 }} />
                    <Typography>Todo</Typography>
                  </div>

                  <Typography align="center" className={classes.opacity}>
                    {countTodo && countTodo.length} Task
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper3}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 5,
                    }}
                  >
                    <FcProcess size={25} style={{ marginRight: 5 }} />
                    <Typography>In Progress</Typography>
                  </div>

                  <Typography align="center" className={classes.opacity}>
                    {countProgress && countProgress.length} Task
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper3}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 5,
                    }}
                  >
                    <FcInspection size={25} style={{ marginRight: 5 }} />
                    <Typography>In Review</Typography>
                  </div>

                  <Typography align="center" className={classes.opacity}>
                    {countReview && countReview.length} Task
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper3}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 5,
                    }}
                  >
                    <FcOk size={25} style={{ marginRight: 5 }} />
                    <Typography>Done</Typography>
                  </div>

                  <Typography align="center" className={classes.opacity}>
                    {countDone && countDone.length} Task
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item>
                <TableContainer
                  component={Paper}
                  style={{ margin: "10px 0px" }}
                >
                  <div style={{ display: "flex" }}>
                    <Typography
                      className={classes.opacity}
                      style={{ padding: 10, flexGrow: 1 }}
                    >
                      Latest Applicants(5)
                    </Typography>
                  </div>
                  <Table aria-label="simple table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">First name</TableCell>
                        {/* <TableCell align="left">Middle</TableCell> */}
                        <TableCell align="left">Last name</TableCell>

                        <TableCell align="left">Application Date</TableCell>
                        <TableCell align="left">Application Status</TableCell>
                        <TableCell align="left">Project Type</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {applicants &&
                        applicants.map((app) => (
                          <TableRow hover={true}>
                            <TableCell>
                              {app.borrower_firstname === null
                                ? "N/A"
                                : app.borrower_firstname}
                            </TableCell>
                            {/* <TableCell>
                              {app.borrower_middlename === null
                                ? "N/A"
                                : app.borrower_middlename}
                            </TableCell> */}
                            <TableCell>
                              {app.borrower_lastname === null
                                ? "N/A"
                                : app.borrower_lastname}
                            </TableCell>
                            <TableCell>
                              {app.date_added === null
                                ? "N/A"
                                : new Date(app.date_added).toDateString()}
                            </TableCell>
                            <TableCell>
                              {app.applicants_status === null ? (
                                "N/A"
                              ) : app.applicants_status === "Progress" ? (
                                <Typography
                                  variant="caption2"
                                  align="center"
                                  style={{
                                    backgroundColor: "#8E30FF",
                                    color: "white",
                                    borderRadius: 5,
                                    padding: 3,
                                  }}
                                >
                                  In Progress
                                </Typography>
                              ) : app.applicants_status === "Approved" ? (
                                <Typography
                                  variant="caption2"
                                  align="center"
                                  style={{
                                    backgroundColor: "rgba(46, 204, 113,1.0)",
                                    color: "white",
                                    borderRadius: 5,
                                    padding: 3,
                                  }}
                                >
                                  Approved
                                </Typography>
                              ) : (
                                <Typography
                                  variant="caption2"
                                  align="center"
                                  style={{
                                    backgroundColor: "rgba(235, 77, 75,0.9)",
                                    color: "white",
                                    borderRadius: 5,
                                    padding: 3,
                                  }}
                                >
                                  Rejected
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              {app.project_type === null
                                ? "N/A"
                                : app.project_type}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item>
                <Paper style={{ padding: 10 }}>
                  <Typography className={classes.opacity}>
                    Latest Proof of Payments (5)
                  </Typography>
                  {proof &&
                    proof.map((p) => (
                      <Grid container style={{ marginTop: 5 }} spacing={1}>
                        <Grid item>
                          <img
                            src={p.image_receipt}
                            style={{ width: 50, height: 50 }}
                            alt=""
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant="caption" color="primary">
                            Paid By: {p.customer_payment.email}
                          </Typography>
                          <Grid item>
                            <Typography variant="caption">
                              Payment Date:{" "}
                              {new Date(p.date_added).toDateString()}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="caption"
                              style={{ fontWeight: "bold" }}
                            >
                              Amount Paid: ₱{p.amount}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid item>
                          {p.status === "Read" ? (
                            <Typography
                              variant="caption"
                              style={{
                                backgroundColor: "rgba(46, 204, 113,1.0)",
                                color: "white",
                                padding: 5,
                              }}
                            >
                              Verified
                            </Typography>
                          ) : (
                            <Typography
                              variant="caption"
                              style={{
                                backgroundColor: "rgba(235, 77, 75,0.9)",
                                color: "white",
                                padding: 5,
                              }}
                            >
                              Unverified
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    ))}
                </Paper>
              </Grid>
              <Grid item>
                <Paper style={{ padding: 10 }}>
                  <Typography className={classes.opacity}>
                    Latest Inquries (5)
                  </Typography>
                  {inquiry &&
                    inquiry.map((inq) => (
                      <Grid container spacing={1} style={{ marginTop: 10 }}>
                        <Grid item>
                          <Typography variant="caption" color="primary">
                            <FiBookmark />
                            {inq.first_name} {inq.middle_name} {inq.last_name}
                          </Typography>
                          <Grid item>
                            <Typography
                              variant="caption"
                              style={{ fontWeight: "bold" }}
                            >
                              Email: {inq.email}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="caption">
                            {new Date(inq.date_added).toDateString()}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Paper className={classes.paper4}>
              <Typography className={classes.opacity}>Tasks Summary</Typography>
              {dashboard && <TaskSummary dashboard={dashboard} />}
            </Paper>
            <Paper className={classes.paper4}>
              <Typography className={classes.opacity}>
                New Employees in your Department (5)
              </Typography>
              <Divider style={{ marginTop: 10 }} />
              {employees.length > 0 &&
                EmployeeDepartment.map((emp) => (
                  <div>
                    <Grid container style={{ marginTop: 5 }} spacing={1}>
                      <Grid item>
                        <img
                          src={emp.customer_profile}
                          style={{ width: 50, height: 50 }}
                          alt=""
                        />
                      </Grid>
                      <Grid item style={{ flexGrow: 1 }}>
                        <Typography
                          variant="caption"
                          color="primary"
                          style={{ fontWeight: "bold" }}
                        >
                          {emp.customer.first_name} {emp.customer.middle_name}{" "}
                          {emp.customer.last_name}
                        </Typography>
                        <Grid item>
                          <Typography
                            variant="caption"
                            style={{ fontWeight: "bold" }}
                          >
                            Role: {emp.customer.role}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="caption">
                            {emp.customer.department.name}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid item>
                        {emp.customer.is_active ? (
                          <Typography
                            variant="caption"
                            style={{
                              backgroundColor: "rgba(46, 204, 113,1.0)",
                              color: "white",
                              padding: 5,
                            }}
                          >
                            Account: Active
                          </Typography>
                        ) : (
                          <Typography
                            variant="caption"
                            style={{
                              backgroundColor: "rgba(235, 77, 75,0.9)",
                              color: "white",
                              padding: 5,
                            }}
                          >
                            Account: Not Active
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Divider />
                  </div>
                ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default StaffDashboard;
