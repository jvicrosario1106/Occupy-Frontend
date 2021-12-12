import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import MaterialTable from "material-table";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import * as api from "../api";
import { FcSurvey } from "react-icons/fc";
import { FcExport, FcUp } from "react-icons/fc";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { FiTrash, FiChevronRight, FiUser } from "react-icons/fi";
import { deleteInquiry, assignInquiry } from "../actions/inquiry";
import { useDispatch, useSelector } from "react-redux";
import AssignAgent from "../components/AssignAgent";
import Title from "./Title";
import { useHistory } from "react-router-dom";

const InquiryTable = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inquiries, setInquiries] = useState([]);
  const [agents, setAgents] = useState([]);
  const [agent, setAgent] = useState("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const isStatus = useSelector((state) => state.inquiryReducer.status);
  const isMessage = useSelector((state) => state.inquiryReducer.message);
  const [loading, setLoading] = useState(false);
  const roleTypes = JSON.parse(localStorage.getItem("user"));
  const loadInquiries = async () => {
    const res = await api.baseUrl.get("get_all_inquiry/");
    setInquiries(res.data);
  };

  const loadAgents = async () => {
    const res = await api.baseUrl.get("get_all_agent/");
    setAgents(res.data);
  };

  useEffect(() => {
    loadInquiries();
    loadAgents();

    if (roleTypes.role === "Client" || roleTypes.role === "Agent") {
      history.push("/home");
    }
  }, []);

  const deleteInquiryItem = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (confirm) {
      const prompt = window.prompt("Type DELETE to remove ");
      if (prompt === "DELETE" || prompt === "delete") {
        const deleteItem = inquiries.filter((app) => app.id !== id);

        setInquiries(deleteItem);
        dispatch(deleteInquiry(id));
      }
    }
  };

  const assigneesAgent = (id) => {
    setOpen(true);
    setId(id);
  };

  const submitAssignAgent = (e) => {
    e.preventDefault();
    if (agent === "") {
      window.alert("Please Select Agent");
    } else {
      const confirm = window.confirm(
        "Please Check if this inquiry has already Assign Agent before you assign to another agent ⚠"
      );
      if (confirm) {
        dispatch(assignInquiry(JSON.stringify({ id: id, agent: agent })));
        setLoading(true);
      }
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const columns = [
    {
      title: "First Name",
      field: "first_name",
    },
    {
      title: "Middle Name",
      field: "middle_name",
    },
    {
      title: "Last Name",
      field: "last_name",
    },
    {
      title: "Inquiry Date",
      field: "date_added",
      type: "date",
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
    DetailPanel: FiChevronRight,
  };

  if (isStatus === "SuccessAssign") {
    window.location.reload();
  }
  return (
    <div>
      <Title title={"Inquiries"} />
      <Container>
        {isStatus === "SuccessAssign" && (
          <Snackbar open={true}>
            <Alert severity="success">{isMessage}</Alert>
          </Snackbar>
        )}

        <Grid container>
          <Grid>
            <Paper style={{ display: "flex", padding: 3, margin: "15px 0px" }}>
              <FcSurvey size={30} />
              <Typography variant="h6" color="primary">
                Inquiry Management ({inquiries.length})
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <AssignAgent
          open={open}
          setOpen={setOpen}
          id={id}
          agents={agents}
          setAgent={setAgent}
          agent={agent}
          submitAssignAgent={submitAssignAgent}
          loading={loading}
        />

        <MaterialTable
          icons={tableIcons}
          title="List of Inquiry"
          data={inquiries ? inquiries : inquiries.display}
          columns={columns}
          editable
          options={{
            headerStyle: {
              fontSize: 16,
              fontWeight: 100,
            },
            sorting: true,
            pageSize: 20,
            draggable: true,
            exportButton: true,
            searchAutoFocus: true,
            rowStyle: {
              fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif',
            },
            actionsColumnIndex: -1,
          }}
          detailPanel={(rowData) => {
            return (
              <Container>
                <Grid container>
                  <Grid item>
                    <Typography
                      variant="h6"
                      style={{ margin: "15px 0px 10px 0px" }}
                    >
                      Inquiry's Data
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      First Name
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.first_name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Middle Name
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.middle_name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Last Name
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.last_name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Age
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.age}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Sex
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.sex}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Profession
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.profession}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Company
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.company}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Designation
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.designation}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Address
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.address}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Phone Number
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.phone_no}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Mobile Number
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.mobile_no}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Email Address
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.email}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      About the Company
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.about}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Property Land Size
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.size}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Purpose of Investment
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.purpose}
                    </Typography>
                  </Grid>
                  {/* <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Salary Per Year
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.salary}
                    </Typography>
                  </Grid> */}
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Date Added
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {new Date(rowData.date_added).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Comment
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.comments}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Agent
                    </Typography>
                    <Typography style={{ opacity: 0.6, marginBottom: "10px" }}>
                      {rowData.agent_name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container style={{ marginTop: 10 }}>
                  <Grid item>
                    <Typography
                      color="primary"
                      style={{ marginBottom: "10px" }}
                    >
                      Assign Agent
                    </Typography>
                    <Typography
                      style={{
                        marginBottom: "10px",
                        background: "#8E30FF",
                        padding: 5,
                        color: "white",
                        borderRadius: 5,
                      }}
                    >
                      {rowData.assign_agent}
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
            );
          }}
          actions={[
            {
              icon: FiUser,
              iconProps: { opacity: 0.6 },
              tooltip: "Assign Agent",
              onClick: (event, rowData) => assigneesAgent(rowData.id),
            },
            {
              icon: FiTrash,
              iconProps: { opacity: 0.6 },
              tooltip: "Delete Inquiry",
              onClick: (event, rowData) => deleteInquiryItem(rowData.id),
            },
          ]}
        />
      </Container>
    </div>
  );
};

export default InquiryTable;
