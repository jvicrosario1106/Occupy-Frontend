import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

const Messages = ({ mess }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user && user.id;

  return (
    <div>
      <div>
        {mess.sender_message.customer.id === userId ? (
          <Grid container direction="column">
            <Grid item>
              <Paper
                style={{
                  margin: 15,
                  padding: 9,
                  float: "right",
                  background: "rgba(0, 106, 255, 0.7)",
                  color: "white",
                }}
              >
                <Typography>{mess.send_message}</Typography>
                <Typography
                  align="right"
                  variant="body2"
                  style={{ opacity: 0.6 }}
                >
                  {moment(mess.created_at).fromNow()}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2} style={{ marginTop: 10 }}>
            <Grid item>
              <img
                src={mess.sender_message.customer_profile}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  marginLeft: 10,
                }}
                alt=""
              />
            </Grid>
            <Grid item>
              <Paper
                style={{
                  padding: 9,
                  float: "left",
                  color: "white",
                  background: "rgba(0, 106, 255, 0.7)",
                }}
              >
                <Typography>{mess.send_message}</Typography>
                <Typography variant="body2" style={{ opacity: 0.6 }}>
                  {moment(mess.created_at).fromNow()}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Messages;
