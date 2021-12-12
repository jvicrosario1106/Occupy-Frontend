import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 500,

    padding: 30,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const AssignAgent = ({
  open,
  setOpen,
  id,
  agents,
  setAgent,
  agent,
  submitAssignAgent,
  loading,
}) => {
  const classes = useStyles();
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Paper className={classes.paper}>
          <form onSubmit={(e) => submitAssignAgent(e)}>
            <Typography variant="h6" color="primary">
              Assign Agent
            </Typography>
            <FormControl
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Agents
              </InputLabel>
              <Select
                native
                label="Project Type"
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
                inputProps={{
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {agents &&
                  agents.map((agent) => (
                    <option value={agent.id}>
                      {agent.first_name} {agent.last_name} / {agent.email}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }}></div>
              {loading ? (
                <Button variant="contained" disabled>
                  Assigning...
                </Button>
              ) : (
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              )}

              <Button onClick={() => closeModal()} color="primary">
                Cancel
              </Button>
            </div>
          </form>
        </Paper>
      </Modal>
    </div>
  );
};

export default AssignAgent;
