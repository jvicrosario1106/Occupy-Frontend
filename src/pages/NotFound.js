import React from "react";
import { Typography, Grid } from "@material-ui/core";
import NotFoundImage from "../img/notfound.svg";

const NotFound = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "89vh",
          flexDirection: "column",
        }}
      >
        <img src={NotFoundImage} width="30%" alt="NotFound" />
        <Typography variant="h5">Sorry, Page not Found </Typography>
      </div>
    </div>
  );
};

export default NotFound;
