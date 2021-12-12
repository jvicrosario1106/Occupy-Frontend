import React, { useState, useEffect } from "react";
import Search from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import MaterialTable from "material-table";
import { FcExport, FcUp, FcBinoculars, FcFullTrash } from "react-icons/fc";
import * as api from "../api";
import { useHistory } from "react-router";
import { deleteUser } from "../actions/employee";
import { useDispatch } from "react-redux";

const AgentTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [agent, setagent] = useState([]);

  //Getting All of the Agents
  const loadAgentUser = async () => {
    const res = await api.baseUrl.get("get_all_agent/");

    setagent(res.data);
  };

  const deleteAgent = (id) => {
    const deletedAgent = agent.filter((emp) => emp.id !== id);
    const confirm = window.confirm("Are you sure you want to Delete Staff?");
    if (confirm) {
      const prompt = window.prompt(
        "Type PROCEED if you want to delete this user?"
      );
      if (prompt === "PROCEED" || prompt === "proceed") {
        dispatch(deleteUser(id));
        setagent(deletedAgent);
      }
    }
  };
  //Getting All of the Agents
  useEffect(() => {
    loadAgentUser();
  }, []);

  const columns = [
    {
      title: "First Name",
      field: "first_name",
    },
    {
      title: "Last Name",
      field: "last_name",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Date added",
      field: "date_added",
      type: "date",
    },
    {
      title: "Position",
      field: "role",
    },
    {
      title: "Department",
      field: "department.name",
    },
    {
      title: "Account",
      field: "is_active",
      render: (rowData) =>
        rowData.is_active ? (
          <Button
            style={{ color: "white" }}
            size="small"
            color="secondary"
            variant="contained"
          >
            Active
          </Button>
        ) : (
          <Button
            size="small"
            style={{ backgroundColor: "rgba(235, 77, 75,0.9)", color: "white" }}
            variant="contained"
          >
            Not Active
          </Button>
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
        title="Agents"
        data={agent ? agent : agent.display}
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
            icon: FcBinoculars,
            tooltip: "View Agent",
            onClick: (event, rowData) =>
              history.push(`/view-employee/${rowData.id}`),
          },
          {
            icon: FcFullTrash,
            tooltip: "Delete Agent",
            onClick: (event, rowData) => deleteAgent(rowData.id),
          },
        ]}
      />
    </div>
  );
};

export default AgentTable;
