import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { imageProperty } from "../../actions/employee";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: 20,
  },
  code: {
    height: 40,
    width: 240,
  },
}));

const EditImage = ({ imageOpen, setImageOpen, id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const isStatus = useSelector((state) => state.employeeReducer.status);

  const updateImage = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("id", id);
    form_data.append("image", image, image.name);
    const confirm = window.confirm(
      "Are you sure you want to update the image of the property?"
    );
    if (confirm) {
      setIsloading(true);
      dispatch(imageProperty(form_data));
    }
  };

  if (isStatus === "SuccessImageProp") {
    window.location.reload();
  }

  return (
    <div>
      <Modal
        open={imageOpen}
        onClose={() => setImageOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Paper className={classes.paper}>
          <Typography variant="h6" color="primary" style={{ marginBottom: 20 }}>
            Edit Property Image
          </Typography>
          <form onSubmit={(e) => updateImage(e)}>
            <input
              required
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <Typography align="right" style={{ marginTop: 10 }}>
              {isLoading ? (
                <Button variant="contained" disable>
                  Saving...
                </Button>
              ) : (
                <Button variant="contained" color="primary" type="submit">
                  Save Changes
                </Button>
              )}
            </Typography>
          </form>
        </Paper>
      </Modal>
    </div>
  );
};

export default EditImage;
