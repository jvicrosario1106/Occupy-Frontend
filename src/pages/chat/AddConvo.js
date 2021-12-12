import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import { FiEdit } from "react-icons/fi";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper1: {
    width: 580,
    padding: 10,
  },
}));

const AddConvo = ({ allUser, receiver, setReceiver, startConvo }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton size="small" onClick={handleOpen}>
        <FiEdit size={20} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Paper className={classes.paper1}>
          <form onSubmit={(e) => startConvo(e)}>
            <Typography variant="h6" color="primary">
              Create new conversation
            </Typography>
            <FormControl
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Start your conversation with 📢
              </InputLabel>
              <Select
                native
                label="Start your conversation with 📢"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                inputProps={{
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {allUser.length > 0 &&
                  allUser.map((user) => (
                    <option value={user.customer.id}>
                      Role: {user.customer.role} ✅ {user.customer.first_name}{" "}
                      {user.customer.last_name} ({user.customer.email} ✉)
                    </option>
                  ))}
              </Select>
            </FormControl>
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }}></div>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </div>
          </form>
        </Paper>
      </Modal>
    </div>
  );
};

export default AddConvo;
