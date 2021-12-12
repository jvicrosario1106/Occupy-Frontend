import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
const HDMF = () => {
  return (
    <div>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <img
              src="https://occupyrem-bucket.s3.ap-southeast-1.amazonaws.com/listreq/HDMF+Loan+-+Locally+Employed+Resized.jpg"
              alt=""
              style={{ width: 500 }}
            />
          </Grid>
          <Grid item>
            <img
              src="https://occupyrem-bucket.s3.ap-southeast-1.amazonaws.com/listreq/HDMF+Loan+-+OFW+Resized.jpg"
              alt=""
              style={{ width: 500 }}
            />
          </Grid>
          <Grid item>
            <img
              src="https://occupyrem-bucket.s3.ap-southeast-1.amazonaws.com/listreq/HDMF+Loan+-+Self-Employed+Resized.jpg"
              alt=""
              style={{ width: 500 }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HDMF;
