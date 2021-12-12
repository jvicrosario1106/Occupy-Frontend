import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Paper from "@material-ui/core/Paper";
import { FiTrash2, FiPlus, FiArrowUp } from "react-icons/fi";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import * as api from "../../api";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },

  typo1: {
    fontWeight: "bold",
    color: "#5E3FBE",
  },
  grid1: {
    margin: "5px 0px",
  },
  creadtedby: {
    opacity: 0.6,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },

  priority: {
    flexGrow: 1,
  },
}));
const TaskList = ({
  dat,
  index,
  setOpen,
  setId,
  setTitle,
  setDescription,
  setLabel,
  setPrio,
  setAssignees,
}) => {
  const classes = useStyles();
  const idString = "" + dat.id;

  const applyData = (id) => {
    setOpen(true);
    setId(id);
    setTitle(dat.title);
    setDescription(dat.description);
    setLabel(dat.labels);
    setPrio(dat.priority);
    setAssignees(dat.assigness);
  };

  return (
    <div>
      <Draggable key={dat.id} draggableId={idString.toString()} index={index}>
        {(provided, snapshot) => (
          <Paper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => applyData(dat.id)}
          >
            <div
              style={{
                padding: "10px",
                margin: "10px 0px",
              }}
            >
              {/* First Container */}
              <Grid container>
                <Grid item className={classes.title}>
                  <Typography variant="caption" className={classes.typo1}>
                    {dat.title}
                  </Typography>
                </Grid>
              </Grid>
              {/* Belongs to First Grid Container */}
              <Grid container>
                <Grid item>
                  <Typography variant="caption" className={classes.creadtedby}>
                    Created By: {dat.created_by.customer.last_name}
                  </Typography>
                </Grid>
              </Grid>
              {/* Second Container */}
              <Grid container className={classes.grid1} spacing={1}>
                {dat.labels &&
                  dat.labels.map((label) => (
                    <Grid item>
                      <Typography
                        variant="caption"
                        style={{
                          backgroundColor: label.color,
                          color: "white",
                          padding: 3.5,
                        }}
                      >
                        {label.label_name}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
              <Grid container className={classes.grid1}>
                <Grid item className={classes.priority}>
                  {dat.priority === "High" && (
                    <FiArrowUp opacity={0.6} color="green" />
                  )}
                  {dat.priority === "Medium" && (
                    <FiArrowUp opacity={0.6} color="gray" />
                  )}
                  {dat.priority === "Low" && (
                    <FiArrowUp opacity={0.6} color="red" />
                  )}
                </Grid>
                <Grid item>
                  <Typography variant="caption" className={classes.creadtedby}>
                    Assignees:
                  </Typography>
                </Grid>
                <Grid item>
                  <AvatarGroup max={10}>
                    {dat.assigness &&
                      dat.assigness.map((assign) => (
                        <Avatar
                          className={classes.small}
                          alt="Unknown"
                          src={assign.customer_profile}
                        />
                      ))}
                  </AvatarGroup>
                </Grid>
              </Grid>
            </div>
          </Paper>
        )}
      </Draggable>
    </div>
  );
};

export default TaskList;
