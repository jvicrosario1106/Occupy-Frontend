import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { loadUser, verifyUser } from "../../actions/auth";

const AddReservationForm = ({
  onChangeInfo,
  isLoading,
  handleClose,
  isError,
}) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <TextField
            required
            label="First Name"
            variant="outlined"
            name="first_name"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => onChangeInfo(e)}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            label="Middle Name"
            variant="outlined"
            name="middle_name"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => onChangeInfo(e)}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            label="Last Name"
            variant="outlined"
            name="last_name"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => onChangeInfo(e)}
          />
        </Grid>
      </Grid>
      <TextField
        required
        type="date"
        fullWidth
        label="Birthday"
        variant="outlined"
        name="dateofbirth"
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => onChangeInfo(e)}
      />
      <TextField
        required
        type="email"
        fullWidth
        label="Email Address"
        variant="outlined"
        margin="normal"
        name="email"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => onChangeInfo(e)}
      />

      <Grid container spacing={4}>
        <Grid item>
          <TextField
            required
            type="password"
            fullWidth
            name="password"
            label="Password"
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => onChangeInfo(e)}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            type="password"
            fullWidth
            label="Re-enter Password"
            name="re_password"
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => onChangeInfo(e)}
          />
        </Grid>
      </Grid>

      <Typography align="right">
        {isLoading && (
          <Button type="submit" variant="contained" disabled color="primary">
            Creating Account...
          </Button>
        )}

        {!isLoading && (
          <Button type="submit" variant="contained" color="primary">
            Confirm
          </Button>
        )}

        {!isLoading && (
          <Button variant="text" color="error" onClick={handleClose}>
            Cancel
          </Button>
        )}
      </Typography>
    </div>
  );
};

export default AddReservationForm;
