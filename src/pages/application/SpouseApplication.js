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
const SpouseApplication = ({ applicationData, handleChange }) => {
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              name="spouse_lastname"
              value={applicationData.spouse_lastname}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Last Name"
            />
          </Grid>
          <Grid item>
            <TextField
              name="spouse_firstname"
              value={applicationData.spouse_firstname}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="First Name"
            />
          </Grid>
          <Grid item>
            <TextField
              name="spouse_nameextension"
              value={applicationData.spouse_nameextension}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Name Extension"
            />
          </Grid>
          <Grid item>
            <TextField
              name="spouse_middlename"
              value={applicationData.spouse_middlename}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Middle Name"
            />
          </Grid>
          <Grid item>
            <TextField
              name="spouse_citizenship"
              value={applicationData.spouse_citizenship}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Citizenship"
            />
          </Grid>
          <Grid item>
            <TextField
              name="spouse_dateofbirth"
              value={applicationData.spouse_dateofbirth}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="date"
              label="Date Of Birth"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              name="spouse_tin"
              value={applicationData.spouse_tin}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Tin"
            />
          </Grid>
          <Grid item>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Industry
              </InputLabel>
              <Select
                native
                name="spouse_industry"
                value={applicationData.spouse_industry}
                onChange={(e) => handleChange(e)}
                label="Project Type"
                inputProps={{
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={"Accounting"}>Accounting</option>
                <option
                  value={
                    "Activities of Private House holds as Employers and Undifferentiated Production Activities Of Private Households"
                  }
                >
                  Activities of Private House holds as Employers and
                  Undifferentiated Production Activities Of Private Households
                </option>
                <option value={"Education and Training"}>
                  Education and Training
                </option>
                <option value={"Agriculture, Hunting, Forestry and Fishing"}>
                  Agriculture, Hunting, Forestry and Fishing
                </option>
                <option value={"Basic Materials"}>Basic Materials</option>
                <option value={"Construction"}>Construction</option>
                <option value={"HR/Recruitment"}>HR/Recruitment</option>

                <option value={"Electricity,Gas and Water Supply"}>
                  Electricity,Gas and Water Supply
                </option>
                <option value={"Extra-Territorial Organization and Bodies"}>
                  Extra-Territorial Organization and Bodies
                </option>
                <option value={"Financial Services/Intermediation"}>
                  Financial Services/Intermediation
                </option>
                <option value={"Financial Services"}>HR/Recruitement</option>
                <option
                  value={" Health and Social Work; Health and Medical Services"}
                >
                  Health and Social Work; Health and Medical Services{" "}
                </option>
                <option value={"Life Sciences"}>Life Sciences </option>
                <option value={"Manufacturing"}>Manufacturing </option>
                <option value={"Technology"}>Technology</option>
                <option value={"Media"}>Media</option>
                <option value={"Management"}>Management</option>
                <option value={"Mining and Quarrying"}>
                  Mining and Quarrying
                </option>
                <option
                  value={
                    "Other Community, Social and Personal Service Activities"
                  }
                >
                  Other Community, Social and Personal Service Activities
                </option>
                <option
                  value={
                    "Public Administrations and Defense; Compulsory Social Security"
                  }
                >
                  Public Administrations and Defense; Compulsory Social Security{" "}
                </option>
                <option value={"Travel and Leisure"}>Travel and Leisure</option>
                <option value={"Transport, Storage and Communications"}>
                  Transport, Storage and Communications
                </option>
                <option
                  value={
                    "Wholesale and Retail Trade; Repair of Motor Vehicles,Motorcycles, Personal and Household Goods"
                  }
                >
                  Wholesale and Retail Trade; Repair of Motor
                  Vehicles,Motorcycles, Personal and Household Goods
                </option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SpouseApplication;
