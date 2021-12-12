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

const BorrowersDataApplication = ({ applicationData, handleChange }) => {
  const classes = useStyles();
  console.log(applicationData);
  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              variant="outlined"
              size="small"
              type="text"
              name="borrower_lastname"
              value={applicationData.borrower_lastname}
              onChange={(e) => handleChange(e)}
              label="Last Name (required)"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_firstname"
              value={applicationData.borrower_firstname}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="First Name (required)"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_nameextension"
              value={applicationData.borrower_nameextension}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Name Extension"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_middlename"
              value={applicationData.borrower_middlename}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Middle Name (required)"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_citizenship"
              value={applicationData.borrower_citizenship}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Citizenship (required)"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_dateofbirth"
              value={applicationData.borrower_dateofbirth}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="date"
              label="Date Of Birth (required)"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_age"
              value={applicationData.borrower_age}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="number"
              label="Age (required)"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Sex (required)
              </InputLabel>
              <Select
                native
                name="borrower_sex"
                value={applicationData.borrower_sex}
                onChange={(e) => handleChange(e)}
                label="Sex"
                inputProps={{
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple" shrink={true}>
                Marital Status (required)
              </InputLabel>
              <Select
                native
                label="Marital Status (required)"
                name="borrower_marital"
                value={applicationData.borrower_marital}
                onChange={(e) => handleChange(e)}
                inputProps={{
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={"Single"}>Single/Unmarried</option>
                <option value={"Married"}>Married</option>
                <option value={"Widowed"}>Widow/er</option>
                <option value={"Legally Separated"}>Legally Separated</option>
                <option value={"Anulled/Divorced"}>Anulled/Divorced</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name="borrower_street"
              value={applicationData.borrower_street}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Street, Bldg Name (required)"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_subdivision"
              value={applicationData.borrower_subdivision}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Subdivision"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_barangay"
              value={applicationData.borrower_barangay}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Barangay (required)"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_municipality"
              value={applicationData.borrower_municipality}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Municipality (required)"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_province"
              value={applicationData.borrower_province}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Province (required)"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_country"
              value={applicationData.borrower_country}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Country (required)"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_zipcode"
              value={applicationData.borrower_zipcode}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Zipcode (required)"
            />
          </Grid>

          <Grid item>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Home Ownership (required)
              </InputLabel>
              <Select
                native
                name="borrower_homeownership"
                value={applicationData.borrower_homeownership}
                onChange={(e) => handleChange(e)}
                label="Project Type"
                inputProps={{
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={"Rented"}>Rented</option>
                <option value={"Owned"}>Owned</option>
                <option value={"Living w/ Parents or Relatives"}>
                  Living w/ Parents or Relatives
                </option>
                <option value={"Mortgaged"}>Mortgaged</option>
                <option value={"Mortgaged"}>Company</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              name="borrower_yrshome"
              value={applicationData.borrower_yrshome}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="number"
              label="Yrs of Stay in Present Home"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_gsis"
              value={applicationData.borrower_gsis}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="EE SSS/GSIS No."
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_tin"
              value={applicationData.borrower_tin}
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
                Industry (required)
              </InputLabel>
              <Select
                native
                name="borrower_industry"
                value={applicationData.borrower_industry}
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
        <Divider style={{ margin: "10px 0px" }} />
        <Typography variant="h6" style={{ opacity: 0.6, marginBottom: 10 }}>
          Contact Details ( Personal )
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              name="contact_home"
              value={applicationData.contact_home}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Home"
            />
          </Grid>
          <Grid item>
            <TextField
              name="contact_cellphone"
              value={applicationData.contact_cellphone}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Cellphone (required)"
            />
          </Grid>
          <Grid item>
            <TextField
              name="contact_email"
              value={applicationData.contact_email}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="email"
              label="Email Address (required)"
            />
          </Grid>
        </Grid>

        <Divider style={{ margin: "10px 0px" }} />
        <Typography variant="h6" style={{ opacity: 0.6, marginBottom: 10 }}>
          Contact Details ( Business )
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              name="business_direct_line"
              value={applicationData.business_direct_line}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Business (Direct Line)"
            />
          </Grid>
          <Grid item>
            <TextField
              name="business_trunt_line"
              value={applicationData.business_trunt_line}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="text"
              label="Business (Trunt Line)"
            />
          </Grid>
          <Grid item>
            <TextField
              name="business_email"
              value={applicationData.business_email}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="email"
              label="Business Email Address"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default BorrowersDataApplication;
