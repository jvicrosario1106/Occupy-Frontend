import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchData } from "../actions/search";
import { useLocation, useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import { FcExport, FcUp, FcInfo } from "react-icons/fc";

import Title from "./Title";

const Results = () => {
  const history = useHistory();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const get_query = searchParams.get("search_query");
  const [loading, setLoading] = useState(false);

  if (get_query === "") {
    history.push("/home");
  }

  const dispatch = useDispatch();
  const results = useSelector((state) => state.SearchReducer);

  useEffect(() => {
    dispatch(searchData(get_query));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [get_query]);

  const columns = [
    {
      title: "Profile",
      field: "customer_profile",
      render: (rowData) => (
        <div>
          <img
            src={rowData.customer_profile}
            style={{ width: 60, height: 60, borderRadius: "50%" }}
          />
        </div>
      ),
    },
    {
      title: "First Name",
      field: "customer.first_name",
    },
    {
      title: "Last Name",
      field: "customer.last_name",
    },
    {
      title: "Email",
      field: "customer.email",
    },
    {
      title: "Role",
      field: "customer.role",
      render: (rowData) => (
        <Button variant="contained" color="primary">
          {rowData.customer.role}
        </Button>
      ),
    },
    {
      title: "Account",
      field: "customer.is_active",
      render: (rowData) =>
        rowData.customer.is_active ? (
          <Button color="secondary" variant="outlined">
            Active
          </Button>
        ) : (
          <Button
            style={{
              border: "1px solid rgba(235, 77, 75,0.9)",
              color: "rgba(235, 77, 75,0.9)",
              padding: 5,
            }}
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
      <Title title={"Search Results"} />
      <Container>
        <MaterialTable
          style={{ marginTop: 40 }}
          title={`Search Results (${results.length})`}
          icons={tableIcons}
          data={results.length > 0 ? results : results.display}
          columns={columns}
          isLoading={loading}
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
            (rowData) => ({
              icon: () => <FcInfo />,

              tooltip:
                rowData.customer.role === "Agent"
                  ? "Go to Agent"
                  : rowData.customer.role === "Admin"
                  ? "Go to Admin"
                  : rowData.customer.role === "Staff"
                  ? "Go to Staff"
                  : rowData.customer.role === "Manager"
                  ? "Go to Manager"
                  : "Customer",
              onClick: (event, rowData) =>
                rowData.customer.role === "Client"
                  ? history.push(`view-accounting/${rowData.customer.id}`)
                  : history.push(`view-employee/${rowData.customer.id}`),
            }),
          ]}
        />
      </Container>
    </div>
  );
};

export default Results;
