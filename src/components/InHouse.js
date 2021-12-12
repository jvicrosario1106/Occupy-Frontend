import React from "react";
import MaterialTable from "material-table";
import { FiChevronRight } from "react-icons/fi";
import {
  FcExport,
  FcUp,
  FcFullTrash,
  FcEmptyFilter,
  FcAdvertising,
} from "react-icons/fc";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { DeletecustomerInHouse } from "../actions/customer";
import { useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";

const InHouse = ({
  generate,
  setGenerate,
  clickEditModal,
  setdeleteSuccess,
  emailInvoice,
}) => {
  const dispatch = useDispatch();
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
      title: "Status",
      field: "paid_status",
    },
    {
      title: "Remark",
      field: "remarks",
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

  const deleteItemInHouse = (id) => {
    const deleteItem = generate.filter((ih) => ih.id !== id);
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (confirm) {
      setGenerate(deleteItem);
      dispatch(DeletecustomerInHouse(id));
      setdeleteSuccess(true);

      setTimeout(() => {
        setdeleteSuccess(false);
      }, 4000);
    }
  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="ICR In House Ledger"
        data={generate ? generate : generate.display}
        columns={columns}
        options={{
          headerStyle: {
            fontSize: 16,
            fontWeight: "100",
            whiteSpace: "nowrap",
          },
          sorting: true,
          pageSize: 20,
          draggable: true,
          exportButton: true,
          searchAutoFocus: true,

          rowStyle: {
            fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif',
          },
          // paging: false,
          actionsColumnIndex: 0,
        }}
        actions={[
          {
            icon: FcAdvertising,
            tooltip: "Send Email Reminder",
            onClick: (event, rowData) =>
              emailInvoice(
                rowData.id,
                rowData.due_date,
                rowData.amount,
                rowData.code,
                rowData.paid_status
              ),
          },
          {
            icon: FcEmptyFilter,
            tooltip: "Update ICR In House",
            onClick: (event, rowData) => clickEditModal(rowData.id),
          },
          {
            icon: FcFullTrash,
            tooltip: "Delete ICR In House",
            onClick: (event, rowData) => deleteItemInHouse(rowData.id),
          },
        ]}
      />
    </div>
  );
};

export default InHouse;
