import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { FiPlus, FiArrowUp } from "react-icons/fi";
import { makeStyles } from "@material-ui/styles";
import { loadUser, verifyUser } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { NewTasks } from "../../actions/tasks";
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
const AddTask = ({ title, assign, load, setLoad }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [labelValue, setLabelValue] = useState([]);
  const [assignValue, setassignValue] = useState([]);
  const [priorityValue, setpriorityValue] = useState("");
  const [titles, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const userDepartment = JSON.parse(localStorage.getItem("user"));

  const labelList = useSelector((state) => state.labelReducer);
  const departmentList = labelList.filter(
    (dept) => dept.department_label === userDepartment.department
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const assignList =
    assign.length > 0 &&
    assign.filter(
      (dept) => dept.customer.department.id === userDepartment.department
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
  // console.log(assign.filter((ass) => console.log(ass.customer.first_name)));
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
    const prio = priorityValue.value;

    const data = JSON.stringify({
      title: titles,
      description: description,
      station: title,
      labels: getId,
      assigness: getIdAssign,
      priority: prio,
      created_by: userDepartment.id,
      department_task: userDepartment.department,
      position: 0,
    });
    const confirm = window.confirm("Are you sure you want to Add tasks?");
    if (confirm) {
      dispatch(NewTasks(data));
      setTitle("");
      setDescription("");
      setassignValue([]);
      setLabelValue([]);
      setLoad(true);
    }
  };

  return (
    <div>
      <IconButton
        disabled={
          userDepartment.role === "Manager" || userDepartment.role === "Admin"
            ? false
            : true
        }
        size="small"
        onClick={handleOpen}
      >
        <Tooltip title="Add Task to this column" interactive>
          <FiPlus size={19} opacity={0.9} cursor="pointer" />
        </Tooltip>
      </IconButton>
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
                Create New Task
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
                  value={description}
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
              description === "" ||
              priorityValue === "" ||
              labelValue.length <= 0 ||
              assignValue.length <= 0 ? (
                <Button disabled variant="contained" color="primary">
                  Create New Task
                </Button>
              ) : (
                <Button type="submit" variant="contained" color="primary">
                  Create New Task
                </Button>
              )}
            </Typography>
          </form>
        </Paper>
      </Modal>
    </div>
  );
};

export default AddTask;
