import React, { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { customerInHouse, UpdatecustomerInHouse } from "../actions/customer";
import moment from "moment";

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

const EditInHouse = ({
  generate,
  setGenerate,
  setOpen,
  open,
  ids,
  editInHouse,
  setupdateSuccess,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [code, setCode] = useState("RF");
  const [status, setStatus] = useState("Unpaid");
  const [remarks, setRemarks] = useState("In Progress");

  const [inHouse, setInHouse] = useState({
    id: "",
    due_date: "",
    amount: "",
    principal: "",
    interest: "",
    others: "",
    penalty: "",
    discount: "",
    running_balance: "",
  });

  const onChangeData = (e) => {
    setInHouse({ ...inHouse, [e.target.name]: e.target.value });
  };

  const SubmitInHousData = (e, id) => {
    e.preventDefault();
    const datas = {
      ...inHouse,
      code: code,
      paid_status: status,
      remarks: remarks,
    };

    const updatedAmount =
      parseFloat(inHouse.amount) + parseFloat(inHouse.penalty);

    const inHouseLedger = generate.map((ih) =>
      ih.id === id
        ? {
            ...ih,
            due_date: inHouse.due_date,
            amount: updatedAmount,
            principal: inHouse.principal,
            interest: inHouse.interest,
            others: inHouse.others,
            penalty: inHouse.penalty,
            discount: inHouse.discount,
            running_balance: inHouse.running_balance,
            code: code,
            paid_status: status,
            remarks: remarks,
          }
        : ih
    );
    const confirm = window.confirm("Are you sure you want to Edit this?");
    if (confirm) {
      dispatch(UpdatecustomerInHouse(datas));
      setGenerate(inHouseLedger);
      setOpen(false);
      setupdateSuccess(true);
      setTimeout(() => {
        setupdateSuccess(false);
      }, 4000);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setInHouse({
      ...inHouse,
      id: editInHouse[0].id,
      due_date: moment(editInHouse[0].due_date).format("YYYY-MM-DD"),
      amount: editInHouse[0].amount,
      principal: editInHouse[0].principal,
      interest: editInHouse[0].interest,
      others: editInHouse[0].others,
      penalty: editInHouse[0].penalty,
      discount: editInHouse[0].discount,
      running_balance: editInHouse[0].running_balance,
    });
    setCode(editInHouse[0].code);
    setStatus(editInHouse[0].paid_status);
    setRemarks(editInHouse[0].remarks);
  }, [ids]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Paper className={classes.paper}>
          <Typography variant="h5" color="primary" style={{ marginBottom: 15 }}>
            Edit In House Ledger
          </Typography>
          <form onSubmit={(e) => SubmitInHousData(e, inHouse.id)}>
            <TextField
              required
              variant="outlined"
              label="Due Date"
              size="small"
              name="due_date"
              value={inHouse.due_date}
              margin="normal"
              type="date"
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
                    value={code}
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
                  label="Amount Due"
                  name="amount"
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
                  value={inHouse.amount}
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
                  type="number"
                  min="1"
                  max="5"
                  step="any"
                  value={inHouse.principal}
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
                  type="number"
                  min="1"
                  max="5"
                  step="any"
                  value={inHouse.interest}
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
                  min="1"
                  max="5"
                  step="any"
                  value={inHouse.others}
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
                  name="penalty"
                  variant="outlined"
                  value={inHouse.penalty}
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
                  value={inHouse.discount}
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
                  name="running_balance"
                  variant="outlined"
                  value={inHouse.running_balance}
                  label="Balance"
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
                <FormControl variant="outlined" margin="normal">
                  <InputLabel htmlFor="filled-age-native-simple">
                    Payment Status
                  </InputLabel>
                  <Select
                    native
                    label="Payment Status"
                    onChange={(e) => setStatus(e.target.value)}
                    className={classes.code}
                    value={status}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <option value={"Unpaid"}>Unpaid</option>
                    <option value={"Paid"}>Paid</option>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <FormControl variant="outlined" margin="normal">
                  <InputLabel htmlFor="filled-age-native-simple">
                    Remarks
                  </InputLabel>
                  <Select
                    native
                    label="Remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className={classes.code}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <option value={"In Progress"}>In Progress</option>
                    <option value={"Late Payment"}>Late Payment</option>
                    <option value={"Paid"}>Paid</option>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Typography align="right">
              <Button variant="contained" color="primary" type="submit">
                Confirm
              </Button>
            </Typography>
          </form>
        </Paper>
      </Modal>
    </div>
  );
};

export default EditInHouse;
