import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const Progress = (props) => {
  return (
    <div>
      <Box position="relative" display="inline-flex">
        {Number(props.value) === 100 ? (
          <CircularProgress
            variant="determinate"
            color="secondary"
            {...props}
          />
        ) : (
          <CircularProgress variant="determinate" {...props} />
        )}

        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="caption"
            component="div"
            color="textSecondary"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Progress;
