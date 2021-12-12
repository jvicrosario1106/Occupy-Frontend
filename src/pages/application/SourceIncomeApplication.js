import React from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 200,
    marginRight: 10,
  },
}));

const SourceIncomeApplication = ({ applicationData, handleChange }) => {
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Typography variant="h6" style={{ opacity: 0.6, marginBottom: 10 }}>
          Borrower
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Employment Type (required)
              </InputLabel>
              <Select
                native
                name="borrower_employment_type"
                value={applicationData.borrower_employment_type}
                onChange={(e) => handleChange(e)}
                label="Project Type"
                inputProps={{
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={"Employed Private"}>Employed Private</option>
                <option value={"OFW"}>OFW</option>
                <option value={"Employed Government"}>
                  Employed Government
                </option>
                <option value={"Self-employed with Business"}>
                  Self-employed with Business
                </option>
                <option value={"Self-Employed Professional"}>
                  Self-employed Professional
                </option>
                <option value={"Retired"}>Retired</option>
                <option value={"Immigrant"}>Immigrant</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name="borrower_employer"
              value={applicationData.borrower_employer}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Employer"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_address"
              value={applicationData.borrower_address}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Address"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_position"
              value={applicationData.borrower_position}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Position"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_yrsemployement"
              value={applicationData.borrower_yrsemployement}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Years of Employement"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_prevemployer"
              value={applicationData.borrower_prevemployer}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Previous Employer"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_prevposition"
              value={applicationData.borrower_prevposition}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Previous Position"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_yrsprevemployement"
              value={applicationData.borrower_yrsprevemployement}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Yrs Previous Employement"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_businessname"
              value={applicationData.borrower_businessname}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Business Name"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_businessaddress"
              value={applicationData.borrower_businessaddress}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Business Address"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_yrsoperation"
              value={applicationData.borrower_yrsoperation}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Years in Operation"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_typebusiness"
              value={applicationData.borrower_typebusiness}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Type of Business"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_nature"
              value={applicationData.borrower_nature}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Nature of Business"
            />
          </Grid>
        </Grid>

        <Divider style={{ marginTop: 15 }} />
        <Typography variant="h6" style={{ opacity: 0.6, marginBottom: 10 }}>
          Spouse/Co-Borrower/Co-Maker
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Employment Type
              </InputLabel>
              <Select
                native
                name="co_borrower_employment_type"
                value={applicationData.co_borrower_employment_type}
                onChange={(e) => handleChange(e)}
                label="Project Type"
                inputProps={{
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={"Employed Private"}>Employed Private</option>
                <option value={"OFW"}>OFW</option>
                <option value={"Employed Government"}>
                  Employed Government
                </option>
                <option value={"Self-employed with Business"}>
                  Self-employed with Business
                </option>
                <option value={"Self-Employed Professional"}>
                  Self-employed Professional
                </option>
                <option value={"Retired"}>Retired</option>
                <option value={"Immigrant"}>Immigrant</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name="co_borrower_employer"
              value={applicationData.co_borrower_employer}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Employer"
            />
          </Grid>
          <Grid item>
            <TextField
              name="co_borrower_address"
              value={applicationData.co_borrower_address}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Address"
            />
          </Grid>
          <Grid item>
            <TextField
              name="co_borrower_position"
              value={applicationData.co_borrower_position}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Position"
            />
          </Grid>
          <Grid item>
            <TextField
              name="co_borrower_yrsemployement"
              value={applicationData.co_borrower_yrsemployement}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Years of Employement"
            />
          </Grid>
          <Grid item>
            <TextField
              name="co_borrower_prevemployer"
              value={applicationData.co_borrower_prevemployer}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Previous Employer"
            />
          </Grid>
          <Grid item>
            <TextField
              name="co_borrower_prevposition"
              value={applicationData.co_borrower_prevposition}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Previous Position"
            />
          </Grid>
          <Grid item>
            <TextField
              name="co_borrower_yrsprevemployement"
              value={applicationData.co_borrower_yrsprevemployement}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Yrs Previous Employement"
            />
          </Grid>
          <Grid item>
            <TextField
              name="co_borrower_businessname"
              value={applicationData.co_borrower_businessname}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Business Name"
            />
          </Grid>
          <Grid item>
            <TextField
              name="co_borrower_businessaddress"
              value={applicationData.co_borrower_businessaddress}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Business Address"
            />
          </Grid>
          <Grid item>
            <TextField
              name="co_borrower_yrsoperation"
              value={applicationData.co_borrower_yrsoperation}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Years in Operation"
            />
          </Grid>
          <Grid item>
            <TextField
              name="co_borrower_typebusiness"
              value={applicationData.co_borrower_typebusiness}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Type of Business"
            />
          </Grid>
          <Grid item>
            <TextField
              name="co_borrower_nature"
              value={applicationData.co_borrower_nature}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Nature of Business"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SourceIncomeApplication;
