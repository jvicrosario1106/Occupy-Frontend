import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 400,
    marginRight: 10,
  },
}));

const PropertyApplication = ({ applicationData, handleChange }) => {
  const classes = useStyles();

  return (
    <div>
      <Container>
        <Grid container>
          <Grid item>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
              margin="normal"
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Project Type
              </InputLabel>
              <Select
                native
                name="project_type"
                value={applicationData.project_type}
                onChange={(e) => handleChange(e)}
                label="Project Type"
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
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
              margin="normal"
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Desired Loan Term
              </InputLabel>
              <Select
                native
                name="desired_loan_term"
                value={applicationData.desired_loan_term}
                onChange={(e) => handleChange(e)}
                label="Desired Loan Term"
                inputProps={{
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={"5 Years"}>5 Years</option>
                <option value={"10 Years"}>10 Years</option>
              </Select>
            </FormControl>
          </Grid>
          {applicationData.project_type !== "" &&
          applicationData.desired_loan_term !== "" ? (
            <Grid item>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                size="small"
                margin="normal"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Unit
                </InputLabel>
                <Select
                  native
                  name="unit"
                  value={applicationData.unit}
                  onChange={(e) => handleChange(e)}
                  label="Unit"
                  inputProps={{
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"Inner Unit"}>Inner Unit</option>
                  <option value={"End Unit"}>End Unit</option>
                </Select>
              </FormControl>
            </Grid>
          ) : null}

          {/* UNIT */}
          <Grid container>
            {applicationData.project_type === "Elyana" &&
              applicationData.unit === "Inner Unit" && (
                <div>
                  <Typography variant="h6" color="primary">
                    Unit / Property Information
                  </Typography>
                  <Typography>Lot Area: 50 SQM</Typography>
                  <Typography>Floor Area: 46 SQM</Typography>
                  <Typography>Total Contract: 1,893,438</Typography>
                </div>
              )}

            {applicationData.project_type === "Elyana" &&
              applicationData.unit === "End Unit" && (
                <div>
                  <Typography variant="h6" color="primary">
                    Unit / Property Information
                  </Typography>
                  <Typography>Lot Area: 75 SQM</Typography>
                  <Typography>Floor Area: 46 SQM</Typography>
                  <Typography>Total Contract: 2,036,094</Typography>
                </div>
              )}

            {applicationData.project_type === "Natania" &&
              applicationData.unit === "Inner Unit" && (
                <div>
                  <Typography variant="h6" color="primary">
                    Unit / Property Information
                  </Typography>
                  <Typography>Lot Area: 50 SQM</Typography>
                  <Typography>Floor Area: 54 SQM</Typography>
                  <Typography>Total Contract: 1,976,850</Typography>
                </div>
              )}

            {applicationData.project_type === "Natania" &&
              applicationData.unit === "End Unit" && (
                <div>
                  <Typography variant="h6" color="primary">
                    Unit / Property Information
                  </Typography>
                  <Typography>Lot Area: 75 SQM</Typography>
                  <Typography>Floor Area: 54 SQM</Typography>
                  <Typography>Total Contract: 2,119,506</Typography>
                </div>
              )}

            {applicationData.project_type === "Aliyah" &&
              applicationData.unit === "Inner Unit" && (
                <div>
                  <Typography variant="h6" color="primary">
                    Unit / Property Information
                  </Typography>
                  <Typography>Lot Area: 50 SQM</Typography>
                  <Typography>Floor Area: 54 SQM</Typography>
                  <Typography>Total Contract: 2,044,125</Typography>
                </div>
              )}

            {applicationData.project_type === "Aliyah" &&
              applicationData.unit === "End Unit" && (
                <div>
                  <Typography variant="h6" color="primary">
                    Unit / Property Information
                  </Typography>
                  <Typography>Lot Area: 75 SQM</Typography>
                  <Typography>Floor Area: 54 SQM</Typography>
                  <Typography>Total Contract: 2,471,063</Typography>
                </div>
              )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PropertyApplication;
