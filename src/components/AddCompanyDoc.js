import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { FiEdit2, FiX, FiPlus } from "react-icons/fi";
import TextField from "@material-ui/core/TextField";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { uploadCompanyFile } from "../actions/employee";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 500,

    padding: 30,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const AddCompanyDoc = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const [opens, setOpens] = useState(false);
  const [error, setError] = useState(false);
  const [submit, setSubmit] = useState();

  const isStatus = useSelector((state) => state.employeeReducer.status);

  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 10000000,
    accept:
      "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    multiple: false,
    onDrop: (acceptedFiles, rejectedFiles) => {
      setFiles(acceptedFiles[0]);

      if (acceptedFiles.length > 0) {
        setError(false);
      }

      if (rejectedFiles.length > 0) {
        setError(true);
      }
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addCompanyDoc = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("document_title", title);
    form_data.append("document_description", description);
    form_data.append("added_by", user.id);
    form_data.append("document_file", files, files.name);

    if (files) {
      const confirm = window.confirm(
        "Are you sure you want to upload file for the company?"
      );
      if (confirm) {
        dispatch(uploadCompanyFile(form_data));
        setOpens(true);
        setSubmit(true);
      }
    } else {
      window.alert("No files uploaded");
    }
  };

  if (isStatus == "Success") {
    window.location.reload();
  }

  if (isStatus === "Failed") {
    window.location.reload();
  }

  return (
    <div>
      <Backdrop className={classes.backdrop} open={opens}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Button
        variant="contained"
        color="primary"
        startIcon={<FiEdit2 />}
        onClick={handleOpen}
      >
        Add Company Documents
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Paper className={classes.paper}>
          <div style={{ display: "flex" }}>
            <Typography color="primary" variant="h6" style={{ flexGrow: 1 }}>
              Create New Company Document
            </Typography>
            <IconButton size="small" onClick={() => handleClose()}>
              <FiX />
            </IconButton>
          </div>

          <form onSubmit={(e) => addCompanyDoc(e)}>
            <TextField
              required
              variant="outlined"
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              multiline
              rows={3}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              variant="outlined"
              label="Description"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Typography variant="body1">Upload Document</Typography>
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
                You have ({files && files.name}) File to be uploaded.
              </Typography>
            </div>
            <Typography align="right">
              {error && (
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "rgba(235, 77, 75,0.9)",
                    color: "white",
                  }}
                >
                  The File must be 10MB
                </Button>
              )}

              {!error && (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={<FiPlus />}
                >
                  {submit ? "Submitting Document... " : "Add Document"}
                </Button>
              )}
            </Typography>
          </form>
        </Paper>
      </Modal>
    </div>
  );
};

export default AddCompanyDoc;
