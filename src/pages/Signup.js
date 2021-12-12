import React, { useState, useEffect } from "react";
import "../css/form.css";
import * as api from "../api";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import { createStaff } from "../actions/auth";

const FormSignup = ({ handleClose }) => {
  //loading the available department

  const [allDepartment, setallDepartment] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadDepartment = async () => {
    const { data } = await api.baseUrl.get("get_all_department/");
    setallDepartment(data);
  };

  useEffect(() => {
    loadDepartment();
  }, []);

  const [staffData, setstaffData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    dateofbirth: "",
    is_staff: "True",
    password: "",
    re_password: "",
    email: "",
    status: "None",
  });

  // For Role
  const [roleData, setroleData] = useState("");

  const onChangeroleData = (e) => {
    setroleData(e.target.value);
  };

  //For Department
  const [departmentData, setdepartmentData] = useState("");

  const onChangedeparmentData = (e) => {
    setdepartmentData(e.target.value);
  };

  // For Staff
  const onChangeStaffData = (e) => {
    setstaffData({ ...staffData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  //Submitting the form
  const onsubmitstaffData = (e) => {
    e.preventDefault();
    const data = {
      ...staffData,
      role: roleData,
      department: departmentData,
    };
    const confirm = window.confirm(
      "Are you sure you want to create new employee?"
    );
    if (confirm) {
      const prompt = window.prompt("Type CONFIRM to proceed");
      if (prompt === "CONFIRM" || prompt === "confirm") {
        setLoading(true);
        dispatch(createStaff(data));
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    }
  };

  // Style Classes for the interface
  const useStyles = makeStyles((theme) => ({
    grid1: {
      marginTop: 13,
    },

    title: {
      flexGrow: 1,
    },
    button: {
      marginTop: "13px",
    },
    role: {
      width: "600px",
      margin: "9px 0px",
    },
    department: {
      width: "600px",
      margin: "9px 0px",
    },
    name: {
      width: "193px",
    },
    password: {
      width: "286px",
    },
    form: {
      marginTop: "13px",
      padding: 13,
    },
  }));

  //Configuration of Styles Classes
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.grid1}>
        <Grid item className={classes.title}>
          <Typography variant="h5" color="primary" align="center">
            Register New Employee Account
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" color="primary" align="center">
            <IconButton size="small" onClick={(e) => handleClose()}>
              <CloseIcon />
            </IconButton>
          </Typography>
        </Grid>
      </Grid>

      <form onSubmit={(e) => onsubmitstaffData(e)} className={classes.form}>
        <Grid container spacing={1}>
          <Grid item>
            <TextField
              size="small"
              required
              fullWidth
              variant="outlined"
              label="First Name"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              name="first_name"
              onChange={(e) => onChangeStaffData(e)}
              className={classes.name}
            />
          </Grid>

          <Grid item>
            <TextField
              size="small"
              required
              variant="outlined"
              label="Middle"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              name="middle_name"
              onChange={(e) => onChangeStaffData(e)}
              className={classes.name}
            />
          </Grid>

          <Grid item>
            <TextField
              size="small"
              required
              variant="outlined"
              label="Surname"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              name="last_name"
              onChange={(e) => onChangeStaffData(e)}
              className={classes.name}
            />
          </Grid>
        </Grid>

        <TextField
          size="small"
          type="date"
          required
          fullWidth
          variant="outlined"
          label="DateofBirth"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          name="dateofbirth"
          onChange={(e) => onChangeStaffData(e)}
        />

        <TextField
          size="small"
          required
          fullWidth
          variant="outlined"
          label="Email"
          type="email"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          name="email"
          onChange={(e) => onChangeStaffData(e)}
        />
        <Grid container spacing={3}>
          <Grid item>
            <TextField
              size="small"
              required
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              name="password"
              onChange={(e) => onChangeStaffData(e)}
              className={classes.password}
            />
          </Grid>
          <Grid item>
            <TextField
              size="small"
              required
              fullWidth
              variant="outlined"
              label="Re-enter Password"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              name="re_password"
              onChange={(e) => onChangeStaffData(e)}
              className={classes.password}
            />
          </Grid>
        </Grid>

        <FormControl variant="outlined" size="small">
          <InputLabel htmlFor="filled-age-native-simple">Role</InputLabel>
          <Select
            native
            label="Role"
            name="role"
            onChange={onChangeroleData}
            value={roleData}
            margin="normal"
            className={classes.role}
          >
            <option>Choose Role</option>
            <option value={"Staff"}>Staff</option>
            <option value={"Manager"}>Manager</option>
            <option value={"Agent"}>Agent</option>
          </Select>
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel htmlFor="filled-age-native-simple">Department</InputLabel>
          <Select
            native
            label="Department"
            name="department"
            value={departmentData}
            onChange={onChangedeparmentData}
            margin="normal"
            className={classes.department}
          >
            <option>Choose Department</option>
            {allDepartment &&
              allDepartment.map((depart) => (
                <option key={depart.id} value={depart.id}>
                  {depart.name}
                </option>
              ))}
          </Select>
        </FormControl>

        <Grid container>
          <Grid item>
            {loading ? (
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                disabled
              >
                Creating account...
              </Button>
            ) : (
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
              >
                Register
              </Button>
            )}
          </Grid>

          <Grid item>
            <Button className={classes.button} onClick={(e) => handleClose()}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FormSignup;
