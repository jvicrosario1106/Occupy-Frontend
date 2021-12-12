import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import {
  FiChevronRight,
  FiFileText,
  FiTrash,
  FiUpload,
  FiEdit,
  FiDownload,
} from "react-icons/fi";
import { FcExport, FcUp, FcDocument, FcDisapprove } from "react-icons/fc";
import {
  deleteReq,
  uploadReq,
  customerDocStatus,
} from "../../actions/customer";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { useDropzone } from "react-dropzone";
import Button from "@material-ui/core/Button";
import * as api from "../../api";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import Title from "../Title";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: 20,
    marginTop: 10,
    flexGrow: 1,
  },
  paper1: {
    padding: 3,

    display: "flex",
  },
  grid1: {
    flexGrow: 1,
  },
  reservation: {
    marginLeft: 10,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 4,
    color: "#fff",
  },
}));

const ViewDocuments = () => {
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [customerDocs, setCustomerDocs] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(true);
  const isMessage = useSelector((state) => state.customerReducer.message);
  const isStatus = useSelector((state) => state.customerReducer.status);

  const [opens, setOpens] = useState(false);
  const [error, setError] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 10000000,
    accept:
      "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    multiple: true,
    onDrop: (acceptedFiles, rejectedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      if (acceptedFiles.length > 0) {
        setError(false);
      }

      if (rejectedFiles.length > 0) {
        setError(true);
      }
    },
  });

  const loadcustomerDocs = async () => {
    const res = await api.baseUrl.get(`get_requirements/${id}/`);
    setCustomerDocs(res.data);
  };

  const loadCustomer = async () => {
    const res = await api.baseUrl.get(`get_one_customer_infomation/${id}/`);
    setCustomer(res.data[0]);
  };

  const deleteRequirements = (id) => {
    const newReq = customerDocs.filter((req) => req.id !== id);
    const confirm = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (confirm) {
      dispatch(deleteReq(id));
      setCustomerDocs(newReq);
    }
  };

  const onSubmitReq = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("id", customer.id);
    for (let i = 0; i < files.length; i++) {
      form_data.append(`files`, files[i], files[i].name);
    }

    if (files.length <= 0) {
      window.alert("No Files Uploaded");
    } else {
      const confirm = window.confirm(
        `Are you sure you want to ${files.length} Uploaded Files Requirement?`
      );
      if (confirm) {
        dispatch(uploadReq(form_data));
        setOpens(true);
      }
    }
  };

  const resetUpload = () => {
    const confirm = window.confirm(
      "Are you sure you want to Reset what you uploaded?"
    );
    if (confirm) {
      setFiles([]);
      setError(false);
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const changeDocStatus = (id, status) => {
    const newDocsStatus = customerDocs.map((docs) =>
      docs.id === id ? { ...docs, status: status } : docs
    );
    const confirm = window.confirm(
      "Are you sure you want to update document status?"
    );
    if (confirm) {
      dispatch(customerDocStatus(JSON.stringify({ id: id, status: status })));
      setCustomerDocs(newDocsStatus);
    }
  };

  useEffect(() => {
    loadcustomerDocs();
    loadCustomer();
  }, [dispatch]);

  if (isStatus === "Success" || isStatus === "SuccessID") {
    window.location.reload();
  }

  if (isStatus === "Failed" || isStatus === "FailedID") {
    window.location.reload();
  }

  const columns = [
    {
      title: "File Name",
      field: "files",
      render: (rowData) => {
        const files = `${rowData.files}`;
        const replaceFiles = files.replace(/\\|\//g, " ");
        const splitFiles = replaceFiles.split(" ");

        return (
          <Typography>
            <FiFileText /> {splitFiles[4]}{" "}
            <a href={`${api.BASE_URL}/download_files/${rowData.id}/`}>
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
      title: "Status",
      field: "status",
      render: (rowData) =>
        rowData.status === "In Progress" ? (
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
      <Title
        title={`View Documents of ${customer ? customer.customer.email : ""} `}
      />
      <Container>
        <Backdrop className={classes.backdrop} open={opens}>
          <CircularProgress color="inherit" />
        </Backdrop>

        {/* Snackbar and Alert */}
        {isStatus === "Success" && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {isMessage}😀
            </Alert>
          </Snackbar>
        )}

        {isStatus === "Failed" && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {isMessage}
            </Alert>
          </Snackbar>
        )}

        <Grid container>
          <Grid item>
            <Typography className={classes.title} variant="h6" color="primary">
              <Paper className={classes.paper1}>
                <FcDocument size={30} />
                <Typography
                  color="primary"
                  variant="h6"
                  className={classes.reservation}
                >
                  Documents of {customer && customer.customer.email}
                </Typography>
              </Paper>
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="center" className={classes.title}>
              {/* <AddReservation
              // setReservedCustomer={setReservedCustomer}
              // ReservedCustomer={ReservedCustomer}
              // isMessage={isMessage}
              /> */}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item style={{ width: "100%" }}>
            <form onSubmit={(e) => onSubmitReq(e)}>
              <Typography variant="body1">Upload Requirements</Typography>
              <div
                {...getRootProps()}
                style={{
                  border: "3px dashed rgba(108, 92, 231,0.3)",
                  padding: "50px",
                  cursor: "pointer",
                  color: "rgba(45, 52, 54,0.6)",
                  margin: "10px 0px ",
                  wWidth: "500px",
                  backgroundColor: "rgba(108, 92, 231,0.1)",
                }}
              >
                <input required {...getInputProps()} />

                <Typography variant="subtitle1" align="center">
                  DRAG and DROP your requirement files here
                </Typography>
                <Typography variant="subtitle1" align="center">
                  {error
                    ? `You have (0) Files to be uploaded. Pdf and docx file only`
                    : `You have (${
                        files && files.length
                      }) Files to be uploaded. Pdf and docx file only`}
                </Typography>
              </div>

              <Grid
                container
                style={{
                  marginBottom: 30,
                }}
              >
                <div style={{ flexGrow: 1 }}></div>

                {error && (
                  <Typography variant="subtitle1" align="right">
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        backgroundColor: "rgba(235, 77, 75,0.9)",
                        color: "white",
                        marginRight: 10,
                      }}
                    >
                      The Files must be 10MB
                    </Button>
                  </Typography>
                )}

                {!error && (
                  <Typography variant="subtitle1" align="right">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ marginRight: 10 }}
                    >
                      Upload Files
                    </Button>
                  </Typography>
                )}

                {!error && (
                  <Typography variant="subtitle1" align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={resetUpload}
                    >
                      Reset Files
                    </Button>
                  </Typography>
                )}

                {/* {error && (
                  <Typography variant="subtitle1" align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={resetUpload}
                    >
                      Reset Files
                    </Button>
                  </Typography>
                )} */}
              </Grid>
            </form>
          </Grid>
        </Grid>
        <MaterialTable
          icons={tableIcons}
          title="Documents"
          data={customerDocs ? customerDocs : customerDocs.display}
          columns={columns}
          options={{
            headerStyle: {
              fontSize: 16,
              fontWeight: 100,
            },
            sorting: true,
            pageSize: 5,
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
              tooltip: "Change Docs Status",
              onClick: (event, rowData) =>
                rowData.status === "In Progress"
                  ? changeDocStatus(rowData.id, "Completed")
                  : changeDocStatus(rowData.id, "In Progress"),
            },

            {
              icon: FiTrash,
              iconProps: { fontSize: "20px", opacity: 0.6 },
              tooltip: "Remove",
              onClick: (event, rowData) => deleteRequirements(rowData.id),
            },
          ]}
        />
      </Container>
    </div>
  );
  //   get_requirements
};

export default ViewDocuments;
