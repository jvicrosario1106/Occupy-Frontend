import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FiX, FiEdit2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { customerInHouse } from "../actions/customer";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 770,
    padding: 30,
  },
  code: {
    height: 40,
    width: 240,
  },
}));

const AddInHouse = ({ customer, generate, setGenerate }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("RF");
  const [loading, setLoading] = useState(false);
  const [inHouse, setInHouse] = useState({
    inhouse_customer: `${customer.id}`,
    due_date: "",
    amount: "",
    principal: "",
    interest: "",
    others: "",
    penalty: "",
    discount: "",
    running_balance: "",
    paid_status: "Unpaid",
    remarks: "In Progress",
  });

  const onChangeData = (e) => {
    setInHouse({ ...inHouse, [e.target.name]: e.target.value });
  };

  const SubmitInHousData = (e) => {
    e.preventDefault();
    const datas = {
      ...inHouse,
      code: code,
    };
    const confirm = window.confirm("Are you sure you want to submit?");
    if (confirm) {
      dispatch(customerInHouse(datas));
      // setLoading(true);
      setGenerate([...generate, datas]);
      // // window.location.reload();
      setOpen(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<FiEdit2 />}
        onClick={handleOpen}
      >
        Add In-House Ledger
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Paper className={classes.paper}>
          <Typography variant="h5" color="primary" style={{ marginBottom: 15 }}>
            Add In House Ledger
          </Typography>
          <form onSubmit={(e) => SubmitInHousData(e)}>
            <TextField
              required
              variant="outlined"
              label="Due Date"
              size="small"
              name="due_date"
              type="date"
              margin="normal"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => onChangeData(e)}
            />
            <Grid container spacing={2}>
              <Grid item>
                <FormControl variant="outlined" margin="normal">
                  <InputLabel htmlFor="filled-age-native-simple">
                    Code
                  </InputLabel>
                  <Select
                    native
                    label="Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={classes.code}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <option value={"RF"}>RF</option>
                    <option value={"DP"}>DP</option>
                    <option value={"MA"}>MA</option>
                    <option value={"FC"}>FC</option>
                    <option value={"CB"}>CB</option>
                    <option value={"MIF"}>MIF</option>
                    <option value={"ATF"}>ATF</option>
                    <option value={"LTO"}>LTO</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  required
                  variant="outlined"
                  label="Due Amount"
                  name="amount"
                  size="small"
                  min="1"
                  max="5"
                  step="any"
                  type="number"
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => onChangeData(e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₱</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  name="principal"
                  variant="outlined"
                  label="Principal"
                  size="small"
                  step="any"
                  min="1"
                  max="5"
                  type="number"
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => onChangeData(e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₱</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  name="interest"
                  variant="outlined"
                  label="Interest"
                  size="small"
                  step="any"
                  min="1"
                  max="5"
                  type="number"
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => onChangeData(e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₱</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  name="others"
                  variant="outlined"
                  label="Others"
                  size="small"
                  type="number"
                  min="1"
                  max="5"
                  step="any"
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => onChangeData(e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₱</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  name="penalty"
                  variant="outlined"
                  label="Penalty"
                  size="small"
                  min="1"
                  max="5"
                  step="any"
                  type="number"
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => onChangeData(e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₱</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  name="discount"
                  variant="outlined"
                  label="Discount"
                  size="small"
                  step="any"
                  min="1"
                  max="5"
                  type="number"
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => onChangeData(e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₱</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  name="running_balance"
                  variant="outlined"
                  label="Balance"
                  size="small"
                  type="number"
                  min="1"
                  max="5"
                  step="any"
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => onChangeData(e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₱</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Typography align="right">
              {loading ? (
                <Button variant="contained" disable>
                  Inserting...
                </Button>
              ) : (
                <Button variant="contained" color="primary" type="submit">
                  Confirm
                </Button>
              )}
            </Typography>
          </form>
        </Paper>
      </Modal>
    </div>
  );
};

export default AddInHouse;
