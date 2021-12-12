import React from "react";
import MaterialTable from "material-table";
import { FcExport, FcUp, FcFullTrash } from "react-icons/fc";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Button from "@material-ui/core/Button";
import * as api from "../../../api";
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));
const Todo = ({ tasks, idDeleteTask }) => {
  const classes = useStyles();
  const userDepartment = JSON.parse(localStorage.getItem("user"));
  const deptAll =
    tasks.length > 0 &&
    tasks.filter(
      (dept) =>
        dept.department_task.id === userDepartment.department &&
        dept.station === "TODO"
    );

  const columns = [
    {
      title: "Title",
      field: "title",
    },
    {
      title: "Date Created",
      field: "date_created",
      type: "date",
    },
    {
      title: "Priority Level",
      field: "priority",
      render: (rowData) =>
        rowData.priority === "High" ? (
          <Button color="secondary" variant="outlined" size="small">
            {rowData.priority}
          </Button>
        ) : rowData.priority === "Medium" ? (
          <Button color="primary" variant="outlined" size="small">
            {rowData.priority}
          </Button>
        ) : (
          <Button
            style={{
              border: "1px solid rgba(235, 77, 75,0.9)",
              color: "rgba(235, 77, 75,0.9)",
            }}
            size="small"
          >
            {rowData.priority}
          </Button>
        ),
    },
    {
      title: "Created By",
      field: "created_by.customer.email",
    },
    {
      title: "Assignees",
      render: (rowData) => (
        <AvatarGroup max={10}>
          {rowData.assigness &&
            rowData.assigness.map((assign) => (
              <Avatar
                className={classes.small}
                alt="Unknown"
                src={assign.customer_profile}
              />
            ))}
        </AvatarGroup>
      ),
    },
  ];
  const tableIcons = {
    Search: Search,
    Clear: Clear,
    FirstPage: FirstPage,
    LastPage: LastPage,
    PreviousPage: ChevronLeft,
    NextPage: ChevronRight,
    ResetSearch: Clear,
    SortArrow: FcUp,
    Export: FcExport,
  };
  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Todo Task"
        data={deptAll ? deptAll : deptAll.display}
        columns={columns}
        options={{
          headerStyle: {
            fontSize: 16,
            fontWeight: 100,
          },
          sorting: true,
          pageSize: 10,
          draggable: true,
          exportButton: true,
          searchAutoFocus: true,
          rowStyle: {
            fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif',
          },
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: FcFullTrash,
            tooltip: "Delete Task",
            onClick: (event, rowData) => idDeleteTask(rowData.id),
          },
        ]}
      />
    </div>
  );
};

export default Todo;
