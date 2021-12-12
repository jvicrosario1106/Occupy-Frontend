import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployeeInfo } from "../../actions/employee";
import * as api from "../../api";

const ViewEmployeeForm = ({ employee, classes, departments }) => {
  const [employeeData, setEmployeeData] = useState({
    id: employee.customer.id,
    ids: employee.id,
    first_name: employee.customer.first_name,
    middle_name: employee.customer.middle_name,
    last_name: employee.customer.last_name,
    dateofbirth: employee.customer.dateofbirth,
    age: employee.age,
    address: employee.address,
    citizenship: employee.citizenship,
    years_employment: employee.years_employment,
    date_added: employee.customer.date_added,
  });

  const [sex, setSex] = useState(employee.sex);
  const [marital, setMarital] = useState(employee.marital_status);
  const [role, setRole] = useState(employee.customer.role);
  const [chooseDept, setChooseDept] = useState(employee.customer.department.id);
  const userDepartment = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  //Next Time
  const isMessage = useSelector((state) => state.employeeReducer.message);
  const isStatus = useSelector((state) => state.employeeReducer.status);

  const onChangeInput = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const onSubmitData = (e) => {
    e.preventDefault();
    const data = {
      ...employeeData,
      sex: sex,
      marital_status: marital,
      role: role,
      department: chooseDept,
    };
    const confirm = window.confirm(
      "Are you sure you want to update employee's info?"
    );
    if (confirm) {
      dispatch(updateEmployeeInfo(JSON.stringify(data)));
      window.location.reload();
    }
  };

  return (
    <div>
      <Paper className={classes.paper2}>
        <form onSubmit={(e) => onSubmitData(e)}>
          <Grid container className={classes.container2}>
            <Grid item style={{ flexGrow: 1 }}>
              <img
                src={employee.customer_profile}
                width="20%"
                alt="Profile"
                style={{ width: 130, height: 130, borderRadius: "50%" }}
              />
            </Grid>
            <Grid item style={{ marginRight: 5 }}>
              <Button color="secondary" variant="outlined">
                {employee.customer.role}
              </Button>
            </Grid>
            <Grid item>
              <Button color="secondary" variant="outlined">
                {employee.customer.department.name}
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item>
              <TextField
                required
                variant="outlined"
                size="small"
                value={employeeData.first_name}
                name="first_name"
                label="First Name"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => onChangeInput(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                variant="outlined"
                size="small"
                value={employeeData.middle_name}
                name="middle_name"
                label="Middle Name"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => onChangeInput(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                variant="outlined"
                size="small"
                value={employeeData.last_name}
                name="last_name"
                label="Last Name"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => onChangeInput(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                type="date"
                variant="outlined"
                value={employeeData.dateofbirth}
                size="small"
                name="dateofbirth"
                label="Birthday"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.birthday}
                onChange={(e) => onChangeInput(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                variant="outlined"
                size="small"
                type="number"
                value={employeeData.age}
                label="Age"
                name="age"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => onChangeInput(e)}
              />
            </Grid>
            <Grid item>
              <FormControl variant="outlined" size="small" required>
                <InputLabel htmlFor="filled-age-native-simple">Sex</InputLabel>
                <Select
                  required
                  aria-setsize="small"
                  native
                  label="Sex"
                  name="sex"
                  value={sex}
                  margin="normal"
                  className={classes.sex}
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value={""}></option>
                  <option value={"Female"}>Female</option>
                  <option value={"Male"}>Male</option>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <TextField
                required
                variant="outlined"
                size="small"
                label="Address"
                value={employeeData.address}
                name="address"
                className={classes.address}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => onChangeInput(e)}
              />
            </Grid>

            <Grid item>
              <FormControl variant="outlined" size="small" required>
                <InputLabel htmlFor="filled-age-native-simple">
                  Marital Status
                </InputLabel>
                <Select
                  required
                  native
                  label="Marital"
                  name="marital_status"
                  value={marital}
                  margin="normal"
                  className={classes.marital}
                  onChange={(e) => setMarital(e.target.value)}
                >
                  <option value={""}></option>
                  <option value={"Married"}>Married</option>
                  <option value={"Single"}>Single</option>
                  <option value={"Widowed"}>Widowed</option>
                  <option value={"Divorced"}>Divorced</option>
                  <option value={"Separated"}>Separated</option>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <TextField
                required
                variant="outlined"
                size="small"
                name="citizenship"
                value={employeeData.citizenship}
                label="Citizenship"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => onChangeInput(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                variant="outlined"
                size="small"
                type="number"
                value={employeeData.years_employment}
                name="years_employment"
                label="Years Employement"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => onChangeInput(e)}
              />
            </Grid>
            <Grid item>
              <FormControl variant="outlined" size="small" required>
                <InputLabel htmlFor="filled-age-native-simple">Role</InputLabel>
                <Select
                  required
                  native
                  name="role"
                  label="Role"
                  value={role}
                  margin="normal"
                  className={classes.role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value={""}></option>
                  <option value={"Staff"}>Staff</option>
                  <option value={"Manager"}>Manager</option>
                  <option value={"Client"}>Client</option>
                  <option value={"Agent"}>Agent</option>
                  <option value={"Admin"}>Admin</option>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl variant="outlined" size="small" required>
                <InputLabel htmlFor="filled-age-native-simple">
                  Deparment
                </InputLabel>
                <Select
                  required
                  native
                  label="Department"
                  name="department"
                  value={chooseDept}
                  margin="normal"
                  className={classes.department}
                  onChange={(e) => setChooseDept(e.target.value)}
                >
                  {departments.length > 0 &&
                    departments.map((dept) => (
                      <option value={dept.id}>{dept.name}</option>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                required
                variant="outlined"
                size="small"
                disabled
                value={employeeData.date_added}
                name="date_added"
                label="Date Employed"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => onChangeInput(e)}
              />
            </Grid>
          </Grid>
          <Typography align="right">
            <Button
              disabled={
                userDepartment.role === "Manager" ||
                userDepartment.role === "Admin"
                  ? false
                  : true
              }
              variant="contained"
              color="primary"
              type="submit"
            >
              Save Changes
            </Button>
          </Typography>
        </form>
      </Paper>
    </div>
  );
};

export default ViewEmployeeForm;
