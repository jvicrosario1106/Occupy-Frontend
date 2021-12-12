import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { FiChevronRight, FiTrash, FiUpload } from "react-icons/fi";
import { FcExport, FcUp } from "react-icons/fc";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as api from "../api";
import AddCompanyDoc from "./AddCompanyDoc";
import { FiFileText, FiEdit, FiDownload } from "react-icons/fi";
import Typography from "@material-ui/core/Typography";
import { updateCompanyFile, deleteCompanyFile } from "../actions/employee";
import Title from "../pages/Title";

const CompanyDoc = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [docs, setDocs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadDocs = async () => {
    const res = await api.baseUrl.get("get_company_docs/");
    setDocs(res.data);
  };

  const changeDocStatus = (id, status) => {
    const newDocsStatus = docs.map((companydocs) =>
      companydocs.id === id
        ? { ...companydocs, doc_company_status: status }
        : companydocs
    );
    const confirm = window.confirm(
      "Are you sure you want to update document status?"
    );
    if (confirm) {
      dispatch(
        updateCompanyFile(
          JSON.stringify({ id: id, doc_company_status: status })
        )
      );
      setDocs(newDocsStatus);
    }
  };

  const deleteCompanyDocs = (id) => {
    const newCompanyDocs = docs.filter((companydocs) => companydocs.id !== id);
    const confirm = window.confirm(
      "Are you sure you want to delete this document?"
    );
    if (confirm) {
      dispatch(deleteCompanyFile(id));
      setDocs(newCompanyDocs);
    }
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const columns = [
    {
      title: "File Name",
      field: "document_files",
      render: (rowData) => {
        const files = `${rowData.document_files}`;
        const replaceFiles = files.replace(/\\|\//g, " ");
        const splitFiles = replaceFiles.split(" ");
        return (
          <Typography>
            <FiFileText /> {splitFiles[4]}{" "}
            <a href={`${api.BASE_URL}/download_company_files/${rowData.id}/`}>
              <FiDownload cursor="pointer" />
            </a>
          </Typography>
        );
      },
    },
    {
      title: "Date Created",
      field: "date_created",
      type: "date",
    },
    {
      title: "Added By",
      field: "added_by.email",
    },
    {
      title: "Status",
      field: "doc_company_status",
      render: (rowData) =>
        rowData.doc_company_status === "In Progress" ? (
          <Button
            style={{
              border: "1px solid rgba(251, 197, 49,1.0)",
              color: "rgba(251, 197, 49,1.0)",
            }}
          >
            In Progress
          </Button>
        ) : (
          <Button variant="outlined" color="secondary">
            Completed
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
    DetailPanel: FiChevronRight,
  };

  return (
    <div>
      <Title title={"Company Documents"} />
      <Grid container style={{ marginBottom: 10 }}>
        <div style={{ flexGrow: 1 }}></div>
        <AddCompanyDoc />
      </Grid>

      <MaterialTable
        icons={tableIcons}
        title="Reservation Documents"
        data={docs ? docs : docs.display}
        columns={columns}
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
        actions={[
          {
            icon: FiEdit,
            iconProps: { fontSize: "20px", opacity: 0.6 },
            tooltip: "Edit Document Status",
            onClick: (event, rowData) =>
              rowData.doc_company_status === "In Progress"
                ? changeDocStatus(rowData.id, "Completed")
                : changeDocStatus(rowData.id, "In Progress"),
          },

          {
            icon: FiTrash,
            iconProps: { fontSize: "20px", opacity: 0.6 },
            tooltip: "Delete Document",
            onClick: (event, rowData) => deleteCompanyDocs(rowData.id),
          },
        ]}
        detailPanel={(rowData) => {
          return (
            <div>
              <Typography align="center">{rowData.document_title}</Typography>
              <Typography align="center">
                {rowData.document_description}
              </Typography>
            </div>
          );
        }}
      />
    </div>
  );
};

export default CompanyDoc;
