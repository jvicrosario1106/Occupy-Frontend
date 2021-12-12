import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { updateProperty } from "../../actions/employee";

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

const EditProperty = ({
  editOpens,
  id,
  setEditOpens,
  properties,
  setProperties,
  isLoading,

  setEditStatus,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isStatus = useSelector((state) => state.employeeReducer.status);
  const roleTypes = JSON.parse(localStorage.getItem("user"));
  const [edits, setEdits] = useState({
    id: "",
    project_type: "",
    block: "",
    lot: "",
    phase: "",
    property_status: "",
    property_price: "",
    property_description: "",
    property_progress: "",
  });

  const onChangeData = (e) => {
    setEdits({ ...edits, [e.target.name]: e.target.value });
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const editProperty = (e) => {
    e.preventDefault();

    if (
      Number(edits.property_progress) < 0 ||
      Number(edits.property_progress) > 100
    ) {
      window.alert("0% Progress to 100% Progress Only");
    } else {
      const confirm = window.confirm(
        "⚠ WARNING: Are you sure you want to update this property? This can affect customer assigned property"
      );
      if (confirm) {
        const updateItem =
          properties.length > 0 &&
          properties.map((property) =>
            property.id === id
              ? {
                  ...property,
                  project_type: edits.project_type,
                  block: edits.block,
                  lot: edits.lot,
                  phase: edits.phase,
                  property_status: edits.property_status,
                  property_price: edits.property_price,
                  property_description: edits.property_description,
                  property_progress: edits.property_progress,
                }
              : property
          );
        dispatch(updateProperty(JSON.stringify(edits)));
        setProperties(updateItem);
        setEditOpens(false);
        setEditStatus(true);
        setTimeout(() => {
          setEditStatus(false);
        }, 3000);
      }
    }
  };

  useEffect(() => {
    const findItem =
      properties.length > 0 &&
      properties.find((property) => property.id === id);

    setEdits({
      ...edits,
      id: id,
      project_type: findItem && findItem.project_type,
      block: findItem && findItem.block,
      lot: findItem && findItem.lot,
      phase: findItem && findItem.phase,
      property_status: findItem && findItem.property_status,
      property_price: findItem && findItem.property_price,
      property_description: findItem && findItem.property_description,
      property_progress: findItem && findItem.property_progress,
    });
  }, [id]);

  return (
    <div>
      <Modal
        open={editOpens}
        onClose={() => setEditOpens(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <form onSubmit={(e) => editProperty(e)}>
          <Paper className={classes.paper}>
            <Typography variant="h6" color="primary">
              New Property
            </Typography>
            <Grid container spacing={3} style={{ marginTop: 10 }}>
              <Grid item>
                <FormControl
                  variant="outlined"
                  size="small"
                  style={{ width: "14.5vw" }}
                  required
                >
                  <InputLabel
                    htmlFor="outlined-age-native-simple"
                    shrink={true}
                    variant="outlined"
                  >
                    Project Type
                  </InputLabel>
                  <Select
                    native
                    name="project_type"
                    label="Project Type"
                    value={edits.project_type}
                    onChange={(e) => onChangeData(e)}
                    inputProps={{
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"Elyana"}>Elyana</option>
                    <option value={"Natania"}>Natania</option>
                    <option value={"Aliyah"}>Aliyah</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  required
                  variant="outlined"
                  name="block"
                  size="small"
                  label="Block"
                  value={edits.block}
                  onChange={(e) => onChangeData(e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  variant="outlined"
                  size="small"
                  name="lot"
                  label="Lot"
                  value={edits.lot}
                  onChange={(e) => onChangeData(e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item>
                <TextField
                  required
                  variant="outlined"
                  size="small"
                  name="phase"
                  label="Phase"
                  value={edits.phase}
                  onChange={(e) => onChangeData(e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item>
                <FormControl
                  required
                  variant="outlined"
                  size="small"
                  style={{ width: "14.5vw" }}
                >
                  <InputLabel
                    htmlFor="outlined-age-native-simple"
                    shrink={true}
                    variant="outlined"
                  >
                    Property Status
                  </InputLabel>
                  <Select
                    native
                    name="property_status"
                    label="Property Status"
                    value={edits.property_status}
                    onChange={(e) => onChangeData(e)}
                    inputProps={{
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"Available"}>Available</option>
                    <option value={"Reserved"}>Reserved</option>
                    <option value={"Sold"}>Sold</option>
                    <option value={"Archived"}>Archived</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  required
                  variant="outlined"
                  size="small"
                  name="property_price"
                  type="number"
                  min="1"
                  max="5"
                  step="any"
                  value={edits.property_price}
                  onChange={(e) => onChangeData(e)}
                  label="Property Price"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <Grid container>
              <TextField
                rows={5}
                multiline
                margin="normal"
                fullWidth
                variant="outlined"
                size="small"
                required
                name="property_description"
                value={edits.property_description}
                onChange={(e) => onChangeData(e)}
                label="Property Description"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <TextField
              required
              variant="outlined"
              size="small"
              type="number"
              margin="normal"
              name="property_progress"
              label="Property Progress (%)"
              value={edits.property_progress}
              onChange={(e) => onChangeData(e)}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Typography
              color="primary"
              style={{ marginBottom: 5 }}
              align="right"
            >
              {roleTypes && roleTypes.role !== "Agent" ? (
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
              ) : (
                <Button disabled variant="contained" color="primary">
                  Save Changes
                </Button>
              )}
            </Typography>
          </Paper>
        </form>
      </Modal>
    </div>
  );
};

export default EditProperty;
