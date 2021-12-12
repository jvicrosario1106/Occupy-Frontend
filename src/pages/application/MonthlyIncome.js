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

const MonthlyIncome = ({ applicationData, handleChange }) => {
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Typography variant="h6" style={{ opacity: 0.6, marginBottom: 10 }}>
          Borrower
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              name="borrower_salary"
              value={applicationData.borrower_salary}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="number"
              label="Salary (required)"
            />
          </Grid>

          <Grid item>
            <TextField
              name="borrower_businessincome"
              value={applicationData.borrower_businessincome}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="number"
              label="Business Income"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_commissions"
              value={applicationData.borrower_commissions}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="number"
              label="Commissions"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_rentalincome"
              value={applicationData.borrower_rentalincome}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="number"
              label="Rental Income"
            />
          </Grid>
          <Grid item>
            <TextField
              name="borrower_others"
              value={applicationData.borrower_others}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="number"
              label="Others"
            />
          </Grid>
        </Grid>

        <Divider style={{ marginTop: 15 }} />
        <Typography variant="h6" style={{ opacity: 0.6, marginBottom: 10 }}>
          Spouse/Co-Borrower/Co-Maker
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              name="co_borrower_salary"
              value={applicationData.co_borrower_salary}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="number"
              label="Salary"
            />
          </Grid>

          <Grid item>
            <TextField
              name="co_borrower_businessincome"
              value={applicationData.co_borrower_businessincome}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="number"
              label="Business Income"
            />
          </Grid>
          <Grid item>
            <TextField
              name="co_borrower_commissions"
              value={applicationData.co_borrower_commissions}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="number"
              label="Commissions"
            />
          </Grid>
          <Grid item>
            <TextField
              name="co_borrower_rentalincome"
              value={applicationData.co_borrower_rentalincome}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="number"
              label="Rental Income"
            />
          </Grid>
          <Grid item>
            <TextField
              name="co_borrower_others"
              value={applicationData.co_borrower_others}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
              type="number"
              label="Others"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MonthlyIncome;
