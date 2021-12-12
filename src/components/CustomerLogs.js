import React from "react";
import MaterialTable from "material-table";
import { FiChevronRight } from "react-icons/fi";
import { FcExport, FcUp, FcFullTrash, FcEmptyFilter } from "react-icons/fc";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { useDispatch } from "react-redux";
import { FiPlusCircle, FiCheck } from "react-icons/fi";
import { addCustomerLogs, deleteLogs } from "../actions/employee";
const CustomerLogs = ({ logs, setLogs, id }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const columns = [
    {
      title: "Date",
      field: "transanction_date_log",
      type: "date",
    },
    {
      title: "Notes",
      field: "notes_log",
    },
    {
      title: "Added by",
      field: "added_by_log.email",
      initialEditValue: user.email,
      editable: "never",
    },
  ];
  const tableIcons = {
    Check: FiCheck,
    Add: FiPlusCircle,
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
    Delete: FcFullTrash,
  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Customer Logs"
        data={logs ? logs : logs.display}
        columns={columns}
        options={{
          headerStyle: {
            fontSize: 16,
            fontWeight: "100",
            whiteSpace: "nowrap",
          },
          sorting: true,
          pageSize: 10,
          draggable: true,
          exportButton: true,
          searchAutoFocus: true,

          rowStyle: {
            fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif',
          },
          paging: false,
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowAdd: (newData, rowData) =>
            new Promise((resolve, reject) => {
              const data = {
                ...newData,
              };

              const finalData = {
                ...data,
                customer_transaction_log: id,
                added_by_log: user.id,
              };

              setTimeout(() => {
                setLogs([data, ...logs]);
                dispatch(addCustomerLogs(JSON.stringify(finalData)));
                resolve();
              }, 1000);
            }),

          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...logs];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setLogs([...dataDelete]);
                dispatch(deleteLogs(oldData.id));
                resolve();
              }, 1000);
            }),
        }}
      />
    </div>
  );
};

export default CustomerLogs;
