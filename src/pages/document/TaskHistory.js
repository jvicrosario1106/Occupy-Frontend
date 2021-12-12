import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { FcDataSheet } from "react-icons/fc";
import * as api from "../../api";
import All from "./taskhistory/All";
import Todo from "./taskhistory/Todo";
import Progress from "./taskhistory/Progress";
import Review from "./taskhistory/Review";
import Done from "./taskhistory/Done";
import Saved from "./taskhistory/Saved";
import { deleteTask } from "../../actions/tasks";
import { useDispatch } from "react-redux";
import Title from "../Title";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: 20,
    marginTop: 10,
    flexGrow: 1,
  },
  paper1: {
    padding: 3,
    display: "flex",
  },
  grid1: {
    flexGrow: 1,
  },
  reservation: {
    marginLeft: 10,
  },
}));

const TaskHistory = () => {
  // Snackbar
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [deptTask, setdeptTask] = useState([]);
  const [value, setValue] = React.useState(0);
  const [tasks, setTasks] = useState([]);
  const userDepartment = JSON.parse(localStorage.getItem("user"));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loadTask = async () => {
    const res = await api.baseUrl.get("get_tasks/");
    setdeptTask(res.data);
    setTasks(res.data);
  };

  useEffect(() => {
    loadTask();

    if (userDepartment.role === "Client" || userDepartment.role === "Agent") {
      history.push("/home");
    }
  }, []);

  const idDeleteTask = (id) => {
    const newdeleteTask = tasks.filter((t) => t.id !== id);
    const confirm = window.confirm("Are you sure you want to delete task?");
    if (confirm) {
      dispatch(deleteTask(id));
      setTasks(newdeleteTask);
    }
  };

  const allDeptTask = tasks.filter(
    (t) => t.department_task.id === userDepartment.department
  );

  return (
    <div>
      <Title title={"Task History"} />
      <Container>
        <Grid container>
          <Grid item>
            <Typography className={classes.title} variant="h6" color="primary">
              <Paper className={classes.paper1}>
                <FcDataSheet size={30} />
                <Typography
                  color="primary"
                  variant="h6"
                  className={classes.reservation}
                >
                  Task History ({allDeptTask.length})
                </Typography>
              </Paper>
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="center" className={classes.title}></Typography>
          </Grid>
        </Grid>

        <Paper style={{ marginBottom: 10 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label={`All (${allDeptTask.length})`} />
            <Tab label="Todo" />
            <Tab label="Progress" />
            <Tab label="Review" />
            <Tab label="Done" />
            <Tab label="Saved" />
          </Tabs>
        </Paper>

        <TabPanel value={value} index={0}>
          <All tasks={tasks} idDeleteTask={idDeleteTask} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Todo tasks={tasks} idDeleteTask={idDeleteTask} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Progress tasks={tasks} idDeleteTask={idDeleteTask} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Review tasks={tasks} idDeleteTask={idDeleteTask} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Done tasks={tasks} idDeleteTask={idDeleteTask} setTasks={setTasks} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Saved
            tasks={tasks}
            idDeleteTask={idDeleteTask}
            setTasks={setTasks}
          />
        </TabPanel>
      </Container>
    </div>
  );
  function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <Typography>{children}</Typography>}</div>;
  }
};

export default TaskHistory;
