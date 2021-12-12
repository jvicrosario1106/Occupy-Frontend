import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { FiChevronRight } from "react-icons/fi";
import { FcExport, FcUp } from "react-icons/fc";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import * as api from "../../../api";

const Tabular = () => {
  const [paid, setPaid] = useState([]);

  const loadPaid = async () => {
    const res = await api.baseUrl.get("all_paid_ma/");

    setPaid(res.data);
  };
  useEffect(() => {
    loadPaid();
  }, []);

  const columns = [
    {
      title: "Paid By",
      field: "customer_ma.customer.email",
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
      title: "Status",
      field: "paid_status",
    },
    {
      title: "Due Date",
      field: "due_date",
      type: "date",
    },
    {
      title: "Customer Status",
      field: "customer_ma.customer.status",
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
  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Paid Monthly Amortization"
        data={paid}
        columns={columns}
        isLoading={paid.length > 0 ? false : true}
        options={{
          sorting: true,
          pageSize: 10,
          draggable: true,
          exportButton: true,
          searchAutoFocus: true,
          rowStyle: {
            fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif',
          },
        }}
      />
    </div>
  );
};

export default Tabular;
