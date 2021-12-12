import React, { useState } from "react";
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

const AddProperty = ({
  endIcon,
  add,
  onChangeData,
  onChangeImage,
  SubmitData,
  isLoading,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        endIcon={endIcon}
        onClick={() => setOpen(true)}
      >
        Add New Property
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <form onSubmit={(e) => SubmitData(e)}>
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
                    value={add.project_type}
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
                  value={add.block}
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
                  value={add.lot}
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
                  value={add.phase}
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
                    value={add.property_status}
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
                  value={add.property_price}
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
                value={add.property_description}
                onChange={(e) => onChangeData(e)}
                label="Property Description"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  margin="normal"
                  required
                  variant="outlined"
                  size="small"
                  name="property_progress"
                  type="number"
                  min="0"
                  max="100"
                  value={add.property_progress}
                  onChange={(e) => onChangeData(e)}
                  label="Property Progress (%)"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item>
                <Typography color="primary" style={{ marginBottom: 5 }}>
                  Upload Property Image
                </Typography>
                <input
                  required
                  type="file"
                  name="image"
                  onChange={(e) => onChangeImage(e)}
                />
              </Grid>
            </Grid>

            <Typography
              color="primary"
              style={{ marginBottom: 5 }}
              align="right"
            >
              {!isLoading ? (
                <Button type="submit" variant="contained" color="primary">
                  Confirm
                </Button>
              ) : (
                <Button disable variant="contained">
                  Inserting new Property...
                </Button>
              )}
            </Typography>
          </Paper>
        </form>
      </Modal>
    </div>
  );
};

export default AddProperty;
