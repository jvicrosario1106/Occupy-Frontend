import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
const Spot = () => {
  return (
    <div>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <img
              src="https://occupyrem-bucket.s3.ap-southeast-1.amazonaws.com/listreq/SpotCash+Requirements.jpg"
              alt=""
              style={{ width: 500, marginBottom: 80 }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Spot;
