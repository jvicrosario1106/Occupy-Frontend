import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FcParallelTasks } from "react-icons/fc";
import TaskList from "./TaskList";
import AddLabels from "./AddLabels";
import { allLabels } from "../../actions/labels";
import { allTasks } from "../../actions/tasks";
import { useDispatch, useSelector } from "react-redux";
import { reOrderedTasks, reOrderedTasksbyColumn } from "../../actions/tasks";
import { deleteTask } from "../../actions/tasks";
import * as api from "../../api";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import Title from "../Title";
import { useHistory } from "react-router-dom";
import moment from "moment";

const Task = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [assign, setAssign] = useState([]);
  const [deptTask, setdeptTask] = useState([]);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [label, setLabel] = useState(null);
  const [prio, setPrio] = useState(null);
  const [assignees, setAssignees] = useState(null);

  const [load, setLoad] = useState(false);
  const [updateLoad, setupdateLoad] = useState(false);

  const userDepartment = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState({
    TODO: {
      title: "Todo 🧧",
      datas: null,
    },

    PROGRESS: {
      title: "Progress 🚀",
      datas: null,
    },

    REVIEW: {
      title: "Review 📃",
      datas: null,
    },

    DONE: {
      title: "Done 🏆",
      datas: null,
    },
  });

  const loadAssign = async () => {
    const res = await api.baseUrl.get("get_assign/");
    setAssign(res.data);
  };

  const deleteTaskId = (e, id) => {
    e.preventDefault();
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirm) {
      dispatch(deleteTask(id));
      setLoad(true);
    }
  };

  const taskList = (tasks) => {
    const date = new Date();
    const Todos = data["TODO"];
    const Progress = data["PROGRESS"];
    const Reviews = data["REVIEW"];
    const Dones = data["DONE"];
    const getTaskDepartment = tasks.filter(
      (dept) => dept.department_task.id === userDepartment.department
    );

    const todoTask =
      getTaskDepartment.length > 0
        ? getTaskDepartment.filter((stations) => stations.station === "TODO")
        : null;
    const progressTask =
      getTaskDepartment.length > 0
        ? getTaskDepartment.filter(
            (stations) => stations.station === "PROGRESS"
          )
        : null;
    const reviewTask =
      getTaskDepartment.length > 0
        ? getTaskDepartment.filter((stations) => stations.station === "REVIEW")
        : null;
    const doneTask =
      getTaskDepartment.length > 0
        ? getTaskDepartment.filter((stations) => stations.station === "DONE")
        : null;

    setData({
      ...data,
      TODO: {
        ...Todos,
        datas: todoTask,
      },
      PROGRESS: {
        ...Progress,
        datas: progressTask,
      },
      REVIEW: {
        ...Reviews,
        datas: reviewTask,
      },
      DONE: {
        ...Dones,
        datas: doneTask,
      },
    });
  };

  const loadTask = async () => {
    const res = await api.baseUrl.get("get_tasks/");
    setdeptTask(res.data);
    taskList(res.data);
  };

  const labelList = useSelector((state) => state.labelReducer);
  const taskSelector = useSelector((state) => state.taskReducer.status);

  const departmentList = labelList.filter(
    (dept) => dept.department_label === userDepartment.department
  );

  const OnDragEnd = (result, data, setData) => {
    //Destructuring Results
    const { destination, source, draggableId } = result;

    //Kung wala destination
    if (!destination) {
      return;
    }
    // Check kung mag kaparehas sila ng index at dropabbleId
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceColumns = data[source.droppableId];
      const destinationColumn = data[destination.droppableId];
      const copyItemSource = [...sourceColumns.datas];
      const copyItemDestination = [...destinationColumn.datas];

      const [removed] = copyItemSource.splice(source.index, 1);
      copyItemDestination.splice(destination.index, 0, removed);
      setData({
        ...data,
        [source.droppableId]: {
          ...sourceColumns,
          datas: copyItemSource,
        },
        [destination.droppableId]: {
          ...destinationColumn,
          datas: copyItemDestination,
        },
      });

      const copySourcce = copyItemSource.map((copy) => {
        return copy.id;
      });

      const copyDestination = copyItemDestination.map((copy) => {
        return copy.id;
      });

      dispatch(
        reOrderedTasksbyColumn(
          JSON.stringify({
            source: source.droppableId,
            sourceitem: copySourcce,
            destination: destination.droppableId,
            destinationitem: copyDestination,
            id: draggableId,
          })
        )
      );
    } else {
      const sourceColumn = data[source.droppableId];
      const copyItem = [...sourceColumn.datas];
      const [removed] = copyItem.splice(source.index, 1);
      copyItem.splice(destination.index, 0, removed);

      setData({
        ...data,
        [source.droppableId]: {
          ...sourceColumn,
          datas: copyItem,
        },
      });
      const copyReorderItem = copyItem.map((copy) => {
        return copy.id;
      });

      dispatch(reOrderedTasks(copyReorderItem));
    }
  };

  useEffect(() => {
    dispatch(allTasks());
    dispatch(allLabels());
    loadAssign();
    loadTask();

    if (userDepartment.role === "Client" || userDepartment.role === "Agent") {
      history.push("/home");
    }
  }, []);

  if (
    taskSelector === "taskdeleted" ||
    taskSelector === "taskcreated" ||
    taskSelector === "taskupdated"
  ) {
    window.location.reload();
  }

  return (
    <div>
      <Title title={"Tasks"} />
      <Container>
        <Grid container style={{ margin: "20px 0px" }}>
          <Grid item style={{ flexGrow: 1 }}>
            <Paper style={{ width: "230px", display: "flex", padding: 2 }}>
              <FcParallelTasks size={30} />
              <Typography
                color="primary"
                variant="h6"
                style={{ marginLeft: 6 }}
              >
                Task Management
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <AddLabels label={departmentList} />
          </Grid>
        </Grid>
        {/* Edit Task Modal */}

        <EditTask
          open={open}
          setOpen={setOpen}
          assign={assign}
          id={id}
          title={title}
          description={description}
          label={label}
          prio={prio}
          assignees={assignees}
          deleteTaskId={deleteTaskId}
          load={load}
          setLoad={setLoad}
          setupdateLoad={setupdateLoad}
          updateLoad={updateLoad}
        />

        <DragDropContext
          onDragEnd={(result) => OnDragEnd(result, data, setData)}
        >
          <div style={{ display: "flex", marginLeft: 13, marginBottom: 30 }}>
            {Object.entries(data).map(([key, value]) => (
              <Grid container>
                <Typography
                  style={{
                    backgroundColor: "rgba(37, 204, 247,0.06)",
                    width: "260px",
                    margin: "5px 0px 0px 0px",
                    padding: "10px",
                    borderTop: "1px solid rgba(178, 190, 195,0.3)",
                    borderLeft: "1px solid rgba(178, 190, 195,0.3)",
                    borderRight: "1px solid rgba(178, 190, 195,0.3)",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <Typography style={{ flexGrow: 1 }}>
                      {value.title}
                    </Typography>
                    <Typography
                      style={{
                        opacity: 0.6,
                        marginRight: 10,
                      }}
                    >
                      {value.datas && value.datas.length}
                    </Typography>

                    <AddTask
                      title={key}
                      assign={assign}
                      load={load}
                      setLoad={setLoad}
                    />
                  </div>
                </Typography>

                <Droppable droppableId={key} key={key}>
                  {(provided, snapshot) => (
                    <div
                      style={{
                        backgroundColor: snapshot.isDraggingOver
                          ? "rgba(37, 204, 247,0.1)"
                          : "rgba(37, 204, 247,0.06)",
                        width: "260px",
                        height: "500px",
                        margin: "0px",
                        padding: "10px",
                        overflow: "scroll",
                        borderLeft: "1px solid rgba(178, 190, 195,0.3)",
                        borderRight: "1px solid rgba(178, 190, 195,0.3)",
                      }}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {value.datas ? (
                        value.datas.map((dat, index) => (
                          <TaskList
                            dat={dat}
                            index={index}
                            setOpen={setOpen}
                            open={open}
                            setId={setId}
                            setTitle={setTitle}
                            setDescription={setDescription}
                            setLabel={setLabel}
                            setPrio={setPrio}
                            setAssignees={setAssignees}
                          />
                        ))
                      ) : (
                        <Grid container justifyContent="center">
                          <Grid item>
                            <Typography
                              variant="caption"
                              style={{ opacity: 0.6 }}
                            >
                              No Tasks in this Column{" "}
                              <CircularProgress color="inherit" />
                            </Typography>
                          </Grid>
                        </Grid>
                      )}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Grid>
            ))}
          </div>
        </DragDropContext>
      </Container>
    </div>
  );
};

export default Task;
