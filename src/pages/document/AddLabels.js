import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { FiPenTool } from "react-icons/fi";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { HuePicker } from "react-color";
import { useDispatch } from "react-redux";
import { NewLabels, deleteLabels } from "../../actions/labels";
import { FiTrash2 } from "react-icons/fi";
import { loadUser, verifyUser } from "../../actions/auth";

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
  grid1: {
    flexGrow: 1,
  },
  container2: {
    marginTop: 20,
  },
  container3: {
    marginTop: 15,
  },
  container4: {
    margin: "30px 0px",
    height: 230,
    overflow: "scroll",
  },
  grid2: {
    border: "1px solid rgba(223, 230, 233,1.0)",
    display: "flex",
    width: "100%",
    padding: 5,
    justifyContent: "space-between",
  },
}));

const AddLabels = ({ label, setLabel }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [color, setColor] = useState("#000");
  const localStorages = JSON.parse(localStorage.getItem("user"));
  const userDepartment = localStorages.department;
  const [labelName, setlabelName] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const OpenAddLabel = () => {
    setOpenAdd(!openAdd);
  };

  const deleteLabel = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to Delete this label?"
    );
    if (confirm) {
      dispatch(deleteLabels(id));
    }
  };

  const onSubmitLabel = (e) => {
    e.preventDefault();
    const toStringColor = color.toString();
    dispatch(
      NewLabels(
        JSON.stringify({
          label_name: labelName,
          color: toStringColor,
          department_label: userDepartment,
        })
      )
    );
    setlabelName("");
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        startIcon={<FiPenTool />}
      >
        Create Labels
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Paper className={classes.paper1}>
          {/* First Grid Container */}
          <Grid container>
            <Grid item className={classes.grid1}>
              <Typography variant="h6" color="primary">
                Create Labels
              </Typography>
            </Grid>
            <Grid item>
              <IconButton size="small" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          {/* Second Grid Container */}
          <Grid container className={classes.container2}>
            <Grid item className={classes.grid1}>
              <Typography variant="body1">{label.length} Labels</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={OpenAddLabel}
              >
                New label
              </Button>
            </Grid>
          </Grid>
          {/* Third Grid Container */}
          {openAdd && (
            <form onSubmit={(e) => onSubmitLabel(e)}>
              <Grid container className={classes.container3} spacing={1}>
                <Grid item>
                  <TextField
                    required
                    variant="outlined"
                    size="small"
                    placeholder="Enter new label"
                    label="Label"
                    value={labelName}
                    onChange={(e) => setlabelName(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item>
                  <HuePicker
                    width={200}
                    color={color}
                    onChange={(e) => setColor(e.hex)}
                  />
                  <Typography variant="body2" style={{ color: color }}>
                    Color: {color}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button size="small" onClick={OpenAddLabel}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
          {/* Fourth Grid Container */}
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className={classes.container4}
          >
            {label.length > 0 &&
              label.map((label) => (
                <Grid item className={classes.grid2} key={label.id}>
                  <Typography
                    variant="caption"
                    style={{
                      backgroundColor: label.color,
                      color: "white",
                      padding: 5,
                      borderRadius: 6,
                    }}
                  >
                    {label.label_name}
                  </Typography>
                  <Button
                    startIcon={<FiTrash2 />}
                    size="small"
                    color="primary"
                    onClick={() => deleteLabel(label.id)}
                  >
                    Delete
                  </Button>
                </Grid>
              ))}
          </Grid>
        </Paper>
      </Modal>
    </div>
  );
};

export default AddLabels;
