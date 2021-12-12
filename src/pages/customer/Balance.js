import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import { FcDebt } from "react-icons/fc";
import { FiChevronRight } from "react-icons/fi";
import { FcExport, FcUp } from "react-icons/fc";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import MaterialTable from "material-table";
import * as api from "../../api";
import Title from "../Title";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper1: {
    margin: "15px 0px",
    padding: 5,
    display: "flex",
  },
}));

const Balance = () => {
  const classes = useStyles();
  const history = useHistory();
  const [customer, setCustomer] = useState([]);
  const [ledger, setLedger] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
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

  const loadCustomer = async () => {
    const res = await api.baseUrl.get(`get_one_customer/${user.id}/`);
    setCustomer(res.data);
  };

  const loadLedger = async () => {
    const res = await api.baseUrl.get(`get_all_ma/${user.id}/`);
    setLedger(res.data);
  };

  const columns = [
    {
      title: "Due Date",
      field: "due_date",
      type: "date",
    },
    {
      title: "Code",
      field: "code",
    },
    {
      title: "Amount",
      field: "amount",
      render: (rowData) => (
        <Typography>
          ₱{new Intl.NumberFormat().format(rowData.amount)}
        </Typography>
      ),
    },
    {
      title: "Principal",
      field: "principal",
      render: (rowData) =>
        rowData.principal === 0 ? (
          <Typography>0</Typography>
        ) : (
          <Typography>
            ₱{new Intl.NumberFormat().format(rowData.principal)}
          </Typography>
        ),
    },
    {
      title: "Interest",
      field: "interest",
      render: (rowData) =>
        rowData.interest === 0 ? (
          <Typography>0</Typography>
        ) : (
          <Typography>
            ₱{new Intl.NumberFormat().format(rowData.interest)}
          </Typography>
        ),
    },
    {
      title: "Others",
      field: "others",
      render: (rowData) =>
        rowData.others === 0 ? (
          <Typography>0</Typography>
        ) : (
          <Typography>
            ₱{new Intl.NumberFormat().format(rowData.others)}
          </Typography>
        ),
    },
    {
      title: "Penalty",
      field: "penalty",
      render: (rowData) =>
        rowData.penalty === 0 ? (
          <Typography>0</Typography>
        ) : (
          <Typography>
            ₱{new Intl.NumberFormat().format(rowData.penalty)}
          </Typography>
        ),
    },
    {
      title: "Discount",
      field: "discount",
    },
    {
      title: "Balance",
      field: "running_balance",
      render: (rowData) => (
        <Typography>
          ₱{new Intl.NumberFormat().format(rowData.running_balance)}
        </Typography>
      ),
    },
    {
      title: "Paid Status",
      field: "paid_status",
    },
    {
      title: "Remarks",
      field: "remarks",
    },
  ];

  useEffect(() => {
    loadCustomer();
    loadLedger();

    if (
      user.role === "Admin" ||
      user.role === "Staff" ||
      user.role === "Agent" ||
      user.role === "Manager"
    ) {
      history.push("/home");
    }
  }, []);
  return (
    <div>
      <Title title={"Balance"} />
      <Container>
        <Grid container>
          <Grid item>
            <Paper className={classes.paper1}>
              <FcDebt size={30} />
              <Typography variant="h6" color="primary">
                Your Remaining Balance
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <MaterialTable
          icons={tableIcons}
          title="ICR In House Ledger"
          data={ledger ? ledger : ledger.display}
          columns={columns}
          options={{
            maxBodyHeight: 700,
            headerStyle: {
              fontSize: 16,
              fontWeight: "100",
              whiteSpace: "nowrap",
            },
            sorting: true,
            // pageSize: 10,
            draggable: true,
            paging: false,
            exportButton: true,
            searchAutoFocus: true,

            rowStyle: {
              fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif',
            },

            actionsColumnIndex: 0,
          }}
        />
      </Container>
    </div>
  );
};

export default Balance;
