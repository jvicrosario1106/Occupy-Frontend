import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import * as api from "../api";
import ViewEmployeeForm from "../components/staff/ViewEmployeeForm";
import { FcCollaboration } from "react-icons/fc";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  paper1: {
    padding: 3,
    display: "flex",
  },
  paper2: {
    padding: 15,
    marginTop: 20,
  },
  container1: {
    marginTop: 10,
  },
  container2: {
    margin: "20px 0px",
  },
  birthday: {
    width: 400,
  },
  sex: {
    height: 40,
    width: 220,
  },
  marital: {
    height: 40,
    width: 220,
  },
  department: {
    height: 40,
    width: 400,
  },
  address: {
    width: 648,
  },
  role: {
    width: 400,
    height: 40,
  },
}));
const ViewEmployee = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [employee, Setemployee] = useState(null);
  const [departments, setDepartment] = useState([]);

  const loadEmployee = async () => {
    const { data } = await api.baseUrl.get(`get_one_employee/${id}/`);
    Setemployee(data[0]);
  };
  const loadDepartments = async () => {
    const { data } = await api.baseUrl.get(`get_all_department/`);
    setDepartment(data);
  };

  useEffect(() => {
    loadEmployee();
    loadDepartments();
  }, []);

  return (
    <div>
      <Title title={`Employee  ${employee ? employee.customer.email : ""} `} />
      <Container>
        <Grid container className={classes.container1}>
          <Paper className={classes.paper1}>
            <FcCollaboration size={30} />
            <Typography variant="h6" color="primary" style={{ marginLeft: 15 }}>
              Information of {employee && employee.customer.email}
            </Typography>
          </Paper>
        </Grid>

        {employee && (
          <ViewEmployeeForm
            employee={employee}
            classes={classes}
            departments={departments}
          />
        )}
      </Container>
    </div>
  );
};

export default ViewEmployee;
