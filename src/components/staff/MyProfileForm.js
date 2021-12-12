import React, { useEffect, useState } from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from "react-redux";
import { updateProfileEmployee, updateProfile } from "../../actions/employee";
import ProfileImage from "./ProfileImage";
import * as api from "../../api";

const MyProfileForm = ({
  classes,
  emp,
  image,
  onSubmitImage,
  setImage,
  opens,
  setOpens,
}) => {
  const dispatch = useDispatch();
  const [employeeInfoUpdate, setEmployeeInfoUpdate] = useState({
    id: emp.customer.id,
    ids: emp.id,
    first_name: emp.customer.first_name,
    middle_name: emp.customer.middle_name,
    last_name: emp.customer.last_name,
    dateofbirth: emp.customer.dateofbirth,
    age: emp.age,
    citizenship: emp.citizenship,
    address: emp.address,
  });

  const [sex, setSex] = useState(emp.sex);
  const [marital, setMarital] = useState(emp.marital_status);

  const onChangeInfo = (e) => {
    setEmployeeInfoUpdate({
      ...employeeInfoUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitUpdate = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("id", employeeInfoUpdate.id);
    form_data.append("ids", employeeInfoUpdate.ids);
    form_data.append("first_name", employeeInfoUpdate.first_name);
    form_data.append("middle_name", employeeInfoUpdate.middle_name);
    form_data.append("last_name", employeeInfoUpdate.last_name);
    form_data.append("dateofbirth", employeeInfoUpdate.dateofbirth);
    form_data.append("age", employeeInfoUpdate.age);
    form_data.append("citizenship", employeeInfoUpdate.citizenship);
    form_data.append("address", employeeInfoUpdate.address);
    form_data.append("sex", sex);
    form_data.append("marital_status", marital);
    // form_data.append("customer_profile", image, image.name);

    const confirms = window.confirm(
      "Are you sure you want to update your profile?"
    );
    if (confirms) {
      dispatch(updateProfileEmployee(form_data));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    // dispatch(updateProfileEmployee(form_data));
    // window.location.reload();
  };

  return (
    <div>
      <Paper className={classes.paper1} elevation={2}>
        <form onSubmit={(e) => onSubmitUpdate(e)} method="post">
          {/* <Paper className={classes.paper2}> */}
          <Grid container>
            <Grid item className={classes.fullname}>
              <Typography color="primary">
                <Button variant="contained" size="small" color="primary">
                  {emp.customer.first_name} {emp.customer.middle_name}{" "}
                  {emp.customer.last_name}
                </Button>
              </Typography>
            </Grid>
            {emp.customer.role === "Client" ? (
              <Grid item>
                <Typography color="primary">
                  <Button variant="outlined" size="large" color="secondary">
                    {emp.customer.status}
                  </Button>
                </Typography>
              </Grid>
            ) : (
              <Grid item>
                <Typography color="primary">
                  <Button variant="outlined" size="large" color="secondary">
                    Employee
                  </Button>
                </Typography>
              </Grid>
            )}
          </Grid>

          <Grid container className={classes.grid1}>
            <Grid item>
              <img className={classes.img} src={emp.customer_profile} alt="" />
            </Grid>
            <Grid item>
              <Button
                className={classes.role}
                variant="outlined"
                color="secondary"
                size="small"
              >
                {emp.customer.role}
              </Button>
              <ProfileImage
                image={image}
                onSubmitImage={onSubmitImage}
                classes={classes}
                emp={emp}
                setImage={setImage}
                employeeInfoUpdate={employeeInfoUpdate}
                opens={opens}
                setOpens={setOpens}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.grid2}>
            {/* First Middle and Last Name */}
            <Grid item>
              <TextField
                required
                variant="outlined"
                label="First Name"
                InputLabelProps={{
                  shrink: true,
                }}
                value={employeeInfoUpdate.first_name}
                margin="normal"
                name="first_name"
                className={classes.names}
                onChange={(e) => onChangeInfo(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                variant="outlined"
                label="Middle Name"
                InputLabelProps={{
                  shrink: true,
                }}
                value={employeeInfoUpdate.middle_name}
                margin="normal"
                name="middle_name"
                className={classes.names}
                onChange={(e) => onChangeInfo(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                variant="outlined"
                label="Last Name"
                InputLabelProps={{
                  shrink: true,
                }}
                value={employeeInfoUpdate.last_name}
                margin="normal"
                name="last_name"
                className={classes.names}
                onChange={(e) => onChangeInfo(e)}
              />
            </Grid>
          </Grid>

          {/* Birthday and Age */}

          <Grid container spacing={3}>
            <Grid item>
              <TextField
                required
                fullWidth
                type="date"
                variant="outlined"
                label="Birthday"
                InputLabelProps={{
                  shrink: true,
                }}
                value={employeeInfoUpdate.dateofbirth}
                margin="normal"
                name="dateofbirth"
                className={classes.date}
                onChange={(e) => onChangeInfo(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                variant="outlined"
                label="Age"
                InputLabelProps={{
                  shrink: true,
                }}
                value={employeeInfoUpdate.age}
                margin="normal"
                name="age"
                className={classes.age}
                onChange={(e) => onChangeInfo(e)}
              />
            </Grid>
          </Grid>

          {/* Sex and CitizenShip */}

          <Grid container spacing={3}>
            <Grid item>
              <TextField
                variant="outlined"
                label="Citizenship"
                InputLabelProps={{
                  shrink: true,
                }}
                value={employeeInfoUpdate.citizenship}
                margin="normal"
                name="citizenship"
                className={classes.citizenship}
                onChange={(e) => onChangeInfo(e)}
              />
            </Grid>
            <Grid item>
              <FormControl variant="outlined" margin="normal">
                <InputLabel htmlFor="filled-age-native-simple">Sex</InputLabel>
                <Select
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
          </Grid>

          {/* Address and Marital Status */}
          <Grid container spacing={3}>
            <Grid item>
              <TextField
                variant="outlined"
                label="Address"
                InputLabelProps={{
                  shrink: true,
                }}
                value={employeeInfoUpdate.address}
                employeeInfoUpdate
                margin="normal"
                name="address"
                className={classes.address}
                onChange={(e) => onChangeInfo(e)}
              />
            </Grid>
            <Grid item>
              <FormControl variant="outlined" margin="normal">
                <InputLabel htmlFor="filled-age-native-simple">
                  Marital Status
                </InputLabel>
                <Select
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
          </Grid>

          {/* Button */}
          <Grid container>
            <Typography align="right">
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.submit}
              >
                Save Changes
              </Button>
            </Typography>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default MyProfileForm;
