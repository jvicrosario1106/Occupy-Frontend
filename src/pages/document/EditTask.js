import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { updateTasks } from "../../actions/tasks";
import {
  priorityOption,
  colourStylesLabel,
  colourStylesPriority,
  colourStylesAssignees,
} from "./Utils";
import Select from "react-select";
import "draft-js/dist/Draft.css";
import { Button } from "@material-ui/core";
import * as api from "../../api";
import { FiTrash } from "react-icons/fi";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper1: {
    width: 600,
    padding: 20,
  },
  typo1: {
    flexGrow: 1,
  },

  description: {
    width: 600,
    marginTop: 20,
  },
  typo2: {
    marginTop: 10,
  },
}));
const EditTask = ({
  assign,
  open,
  setOpen,
  id,
  title,
  description,
  label,
  prio,
  assignees,
  deleteTaskId,
  load,
  setLoad,
  setupdateLoad,
  updateLoad,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [labelValue, setLabelValue] = useState([]);
  const [assignValue, setassignValue] = useState([]);
  const [priorityValue, setpriorityValue] = useState("");
  const [titles, setTitle] = useState("");
  const [descriptions, setDescription] = useState("");
  const userDepartment = JSON.parse(localStorage.getItem("user"));
  const labelList = useSelector((state) => state.labelReducer);
  const task = useSelector((state) => state.taskReducer);

  const departmentList = labelList.filter(
    (dept) => dept.department_label === userDepartment.department
  );

  const handleClose = () => {
    setOpen(false);
  };

  const getLabel =
    label &&
    label.map((l) => {
      return {
        value: l.id,
        label: (
          <Typography
            variant="caption"
            style={{
              backgroundColor: `${l.color}`,
              padding: 5,
              color: "white",
              borderRadius: 5,
            }}
          >
            {l.label_name}
          </Typography>
        ),
        color: l.color,
      };
    });

  const getAssign =
    assignees &&
    assignees.map((assigns) => {
      return {
        value: assigns.customer.id,
        label: (
          <Chip
            size="small"
            avatar={<Avatar src={assigns.customer_profile} />}
            label={` ${assigns.customer.first_name} ${assigns.customer.last_name}`}
            variant="outlined"
          />
        ),
      };
    });

  const getPrio = priorityOption.filter(
    (priorities) => priorities.value === prio
  );

  const labelOption =
    departmentList.length > 0 &&
    departmentList.map((label) => {
      return {
        value: label.id,
        label: (
          <Typography
            variant="caption"
            style={{
              backgroundColor: `${label.color}`,
              padding: 5,
              color: "white",
              borderRadius: 5,
            }}
          >
            {label.label_name}
          </Typography>
        ),
        color: label.color,
      };
    });

  const assignList =
    assign.length > 0 &&
    assign.filter(
      (dept) => dept.customer.department.id === userDepartment.department
    );

  const assignOption =
    assignList.length > 0 &&
    assignList.map((assigns) => {
      return {
        value: assigns.customer.id,
        label: (
          <Chip
            size="small"
            avatar={<Avatar src={assigns.customer_profile} />}
            label={` ${assigns.customer.first_name} ${assigns.customer.last_name}`}
            variant="outlined"
          />
        ),
      };
    });

  const OnSubmitTask = (e, labelValue) => {
    e.preventDefault();

    const getId = labelValue.map((label) => {
      return label.value;
    });

    const getIdAssign = assignValue.map((assign) => {
      return assign.value;
    });

    const data = JSON.stringify({
      id: id,
      title: titles,
      description: descriptions,
      labels: getId,
      assigness: getIdAssign,
      priority: priorityValue.value,
    });
    const confirm = window.confirm(
      "Are you sure you want to Update this task?"
    );
    if (confirm) {
      dispatch(updateTasks(data));
      setupdateLoad(true);
    }
  };

  useEffect(() => {
    setTitle(title);
    setDescription(description);
    setLabelValue(getLabel);
    setpriorityValue(getPrio[0]);
    setassignValue(getAssign);
  }, [id]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Paper className={classes.paper1}>
          {/* First Container */}
          <Grid container>
            <Grid item className={classes.typo1}>
              <Typography variant="h6" color="primary">
                Edit Task
              </Typography>
            </Grid>
            <Grid item>
              <IconButton size="small" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>

          {/* Second Container */}
          <form onSubmit={(e) => OnSubmitTask(e, labelValue)}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              className={classes.container2}
            >
              <Grid item>
                <TextField
                  className={classes.description}
                  multiline
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Title"
                  label="Title"
                  value={titles}
                  onChange={(e) => setTitle(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.description}
                  multiline
                  variant="outlined"
                  rows={7}
                  fullWidth
                  value={descriptions}
                  onChange={(e) => setDescription(e.target.value)}
                  margin="normal"
                  placeholder="Enter Description"
                  label="Description"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            {/* Third Grid Container */}

            <Grid container>
              <Grid item>
                <Select
                  options={labelOption}
                  isMulti
                  value={labelValue}
                  onChange={setLabelValue}
                  styles={colourStylesLabel}
                  placeholder="Select Labels..."
                />
              </Grid>
              <Grid item>
                <Select
                  options={priorityOption}
                  value={priorityValue}
                  onChange={setpriorityValue}
                  placeholder="Select Priority..."
                  styles={colourStylesPriority}
                />
              </Grid>
              <Grid item>
                <Select
                  isDisabled={
                    userDepartment.role === "Manager" ||
                    userDepartment.role === "Admin"
                      ? false
                      : true
                  }
                  isMulti
                  options={assignOption}
                  value={assignValue}
                  onChange={setassignValue}
                  placeholder="Select Assignees..."
                  styles={colourStylesAssignees}
                />
              </Grid>
            </Grid>
            <Typography align="right" className={classes.typo2}>
              {titles === "" ||
              descriptions === "" ||
              priorityValue == "" ||
              assignValue == null ||
              assignValue.length <= 0 ||
              labelValue == null ||
              labelValue.length <= 0 ||
              priorityValue === "" ? (
                <Button disabled variant="contained" color="primary">
                  Save Changes
                </Button>
              ) : updateLoad ? (
                <Button disabled variant="contained" color="primary">
                  Saving Changes...
                </Button>
              ) : (
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
              )}
            </Typography>
          </form>
          <Button
            disabled={
              userDepartment.role === "Manager" ||
              userDepartment.role === "Admin"
                ? false
                : true
            }
            type="submit"
            size="small"
            style={{
              marginRight: 10,
              border: "1px solid rgba(235, 77, 75,0.9)",
              color: "rgba(235, 77, 75,0.9)",
            }}
            startIcon={<FiTrash />}
            onClick={(e) => deleteTaskId(e, id)}
          >
            {load ? "Deleting Task..." : "Delete Task"}
          </Button>
        </Paper>
      </Modal>
    </div>
  );
};

export default EditTask;
