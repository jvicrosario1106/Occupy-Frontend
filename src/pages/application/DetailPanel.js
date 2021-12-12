import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import * as api from "../../api";
const DetailPanel = ({ rowData }) => {
  const [images, setImages] = useState([]);

  const loadAppImages = async () => {
    const res = await api.baseUrl.get(`get_application_images/${rowData.id}/`);
    setImages(res.data);
  };

  useEffect(() => {
    loadAppImages();
  }, []);

  return (
    <div>
      <Container>
        <Grid container>
          <Grid item>
            <Typography variant="h6" style={{ margin: "10px 0px" }}>
              Property Application Data
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Project Type
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.project_type}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Desired Loan Term
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.desired_loan_term}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Unit
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.unit}
            </Typography>
          </Grid>
        </Grid>

        <Divider style={{ margin: "10px 0px" }} />

        <Grid container>
          <Grid item>
            <Typography variant="h6" style={{ marginBottom: 10 }}>
              Borrower's Data
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              First Name
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_firstname === ""
                ? "N/A"
                : rowData.borrower_firstname}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Middle Name
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_middlename === ""
                ? "N/A"
                : rowData.borrower_middlename}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Last Name
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_lastname === ""
                ? "N/A"
                : rowData.borrower_lastname}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Citizenship
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_citizenship === ""
                ? "N/A"
                : rowData.borrower_citizenship}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Age
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_age === "" ? "N/A" : rowData.borrower_age}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Date of Birth
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_dateofbirth === ""
                ? "N/A"
                : rowData.borrower_dateofbirth}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Sex
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_sex === "" ? "N/A" : rowData.borrower_sex}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Marital Status
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_marital === ""
                ? "N/A"
                : rowData.borrower_marital}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Street
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_street === "" ? "N/A" : rowData.borrower_street}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Subdivision
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_subdivision === ""
                ? "N/A"
                : rowData.borrower_subdivision}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Barangay
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_barangay === ""
                ? "N/A"
                : rowData.borrower_barangay}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Municipality
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_municipality === ""
                ? "N/A"
                : rowData.borrower_municipality}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Province
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_province === ""
                ? "N/A"
                : rowData.borrower_province}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Country
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_country === ""
                ? "N/A"
                : rowData.borrower_country}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Zip Code
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_zipcode === ""
                ? "N/A"
                : rowData.borrower_zipcode}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Home Ownership
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_homeownership === ""
                ? "N/A"
                : rowData.borrower_homeownership}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Year of stay in Present Home
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_yrshome === ""
                ? "N/A"
                : rowData.borrower_yrshome}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              GSIS
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_gsis === "" ? "N/A" : rowData.borrower_gsis}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              TIN
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_tin === "" ? "N/A" : rowData.borrower_tin}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Industry
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_industry === ""
                ? "N/A"
                : rowData.borrower_industry}
            </Typography>
          </Grid>
        </Grid>

        <Divider style={{ margin: "10px 0px" }} />

        <Grid container>
          <Grid item>
            <Typography variant="h6" style={{ marginBottom: 10 }}>
              Contact Details
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Home
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.contact_home === "" ? "N/A" : rowData.contact_home}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Cellphone
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.contact_cellphone === ""
                ? "N/A"
                : rowData.contact_cellphone}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Email
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.contact_email === "" ? "N/A" : rowData.contact_email}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Business (Direct Line)
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.business_direct_line === ""
                ? "N/A"
                : rowData.business_direct_line}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Business (Trunt Line)
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.business_trunt_line === ""
                ? "N/A"
                : rowData.business_trunt_line}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Business (Email)
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.business_email === "" ? "N/A" : rowData.business_email}
            </Typography>
          </Grid>
        </Grid>

        <Divider style={{ margin: "10px 0px" }} />

        <Grid container>
          <Grid item>
            <Typography variant="h6" style={{ marginBottom: 10 }}>
              Spouse Personal Data
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              First Name
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.spouse_firstname === ""
                ? "N/A"
                : rowData.spouse_firstname}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Middle Name
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.spouse_middlename === ""
                ? "N/A"
                : rowData.spouse_middlename}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Last Name
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.spouse_lastname === "" ? "N/A" : rowData.spouse_lastname}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Citizenship
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.spouse_citizenship === ""
                ? "N/A"
                : rowData.spouse_citizenship}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Date of Birth
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.spouse_dateofbirth === ""
                ? "N/A"
                : rowData.spouse_dateofbirth}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              TIN
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.spouse_tin === "" ? "N/A" : rowData.spouse_tin}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Industry
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.spouse_industry === "" ? "N/A" : rowData.spouse_industry}
            </Typography>
          </Grid>
        </Grid>

        <Divider style={{ margin: "10px 0px" }} />

        <Grid container>
          <Grid item>
            <Typography variant="h6" style={{ marginBottom: 10 }}>
              Source Income
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item>
            <Typography
              variant="body1"
              style={{ opacity: 0.6, marginBottom: 10 }}
            >
              Borrower's
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Employment Type
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_employment_type === ""
                ? "N/A"
                : rowData.borrower_employment_type}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Employer
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_employer === ""
                ? "N/A"
                : rowData.borrower_employer}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Address
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_address === ""
                ? "N/A"
                : rowData.borrower_address}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Position
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_position === ""
                ? "N/A"
                : rowData.borrower_position}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Years of Employment
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_yrsemployement === ""
                ? "N/A"
                : rowData.borrower_yrsemployement}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Previous Employer
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_prevemployer === ""
                ? "N/A"
                : rowData.borrower_prevemployer}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Previous Position
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_prevposition === ""
                ? "N/A"
                : rowData.borrower_prevposition}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Previous Years of Employement
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_yrsprevemployement === ""
                ? "N/A"
                : rowData.borrower_yrsprevemployement}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Business Name
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_businessname === ""
                ? "N/A"
                : rowData.borrower_businessname}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Business Address
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_businessaddress === ""
                ? "N/A"
                : rowData.borrower_businessaddress}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Years of Operation
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_yrsoperation === ""
                ? "N/A"
                : rowData.borrower_yrsoperation}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Type Business
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_typebusiness === ""
                ? "N/A"
                : rowData.borrower_typebusiness}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Nature of Business
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_nature === "" ? "N/A" : rowData.borrower_nature}
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item>
            <Typography
              variant="body1"
              style={{ opacity: 0.6, margin: "15px 0px 10px 0px" }}
            >
              Co-Borrower's
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Employment Type
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_employment_type === ""
                ? "N/A"
                : rowData.co_borrower_employment_type}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Employer
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_employer === ""
                ? "N/A"
                : rowData.co_borrower_employer}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Address
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_address === ""
                ? "N/A"
                : rowData.co_borrower_address}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Position
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_position === ""
                ? "N/A"
                : rowData.co_borrower_position}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Years of Employment
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_yrsemployement === ""
                ? "N/A"
                : rowData.co_borrower_yrsemployement}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Previous Employer
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_prevemployer === ""
                ? "N/A"
                : rowData.co_borrower_prevemployer}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Previous Position
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_prevposition === ""
                ? "N/A"
                : rowData.co_borrower_prevposition}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Previous Years of Employement
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_yrsprevemployement === ""
                ? "N/A"
                : rowData.co_borrower_yrsprevemployement}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Business Name
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_businessname === ""
                ? "N/A"
                : rowData.co_borrower_businessname}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Business Address
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_businessaddress === ""
                ? "N/A"
                : rowData.co_borrower_businessaddress}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Years of Operation
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_yrsoperation === ""
                ? "N/A"
                : rowData.co_borrower_yrsoperation}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Type Business
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_typebusiness === ""
                ? "N/A"
                : rowData.co_borrower_typebusiness}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Nature of Business
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_nature === ""
                ? "N/A"
                : rowData.co_borrower_nature}
            </Typography>
          </Grid>
        </Grid>

        <Divider style={{ margin: "10px 0px" }} />

        <Grid container>
          <Grid item>
            <Typography variant="h6" style={{ margin: "10px 0px 10px 0px" }}>
              Monthly Income
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item>
            <Typography
              variant="body1"
              style={{ opacity: 0.6, marginBottom: 10 }}
            >
              Borrower's
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Salary
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_salary}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Business Income
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_businessincome}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Commissions
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_commissions}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Rental Income
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_rentalincome}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Others
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.borrower_others}
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item>
            <Typography
              variant="body1"
              style={{ opacity: 0.6, margin: "15px 0px 10px 0px" }}
            >
              Co-Borrower's
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Salary
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_salary}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Business Income
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_businessincome}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Commissions
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_commissions}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Rental Income
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_rentalincome}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" style={{ marginBottom: 10 }}>
              Others
            </Typography>
            <Typography style={{ opacity: 0.6, marginBottom: 10 }}>
              {rowData.co_borrower_others}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography variant="h6">Bank Statement</Typography>
          </Grid>
        </Grid>
        <Grid container style={{ margin: "10px 0px" }}>
          {images.length > 0
            ? images.map((img) => (
                <Grid item>
                  <a href={img.images} target="_blank" title="See Image">
                    <img src={img.images} width="30%" alt="Image" />
                  </a>
                </Grid>
              ))
            : "No Image"}
        </Grid>
      </Container>
    </div>
  );
};

export default DetailPanel;
