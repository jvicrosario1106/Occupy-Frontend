import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as api from "../../api";
import { Container } from "@material-ui/core";
import { FiEdit } from "react-icons/fi";
import IconButton from "@material-ui/core/IconButton";
import AddConvo from "./AddConvo";
import moment from "moment";

const Inbox = ({
  getMessages,
  id,
  inbox,
  allUser,
  receiver,
  setReceiver,
  startConvo,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user && user.id;

  return (
    <div>
      <div
        style={{
          background: "white",
          padding: "20px 0px",
          overflowY: "scroll",
          height: "84vh",
        }}
      >
        <Container>
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }}>
              <Typography style={{ margin: "0px 0px 15px 0px" }}>
                Chats ({inbox.length > 0 ? inbox.length : 0})
              </Typography>
            </div>
            <Typography align="right" style={{ margin: "0px 0px 15px 0px" }}>
              <AddConvo
                allUser={allUser}
                receiver={receiver}
                setReceiver={setReceiver}
                startConvo={startConvo}
              />
            </Typography>
          </div>
          {inbox.length > 0 ? (
            inbox.map((inboxes) => (
              <div>
                {inboxes.sender_convo.customer.id === userId ? (
                  <Grid container spacing={6}>
                    <Grid item>
                      <Grid
                        container
                        spacing={2}
                        onClick={() => getMessages(inboxes.id)}
                        style={{
                          cursor: "pointer",
                          background:
                            id === inboxes.id ? "rgba(0,0,0,0.05)" : null,
                          borderRadius: 5,
                        }}
                      >
                        <Grid item>
                          <img
                            src={inboxes.receiver_convo.customer_profile}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: "50%",
                            }}
                            alt="Profile"
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="body2"
                            style={{ fontWeight: "bold" }}
                          >
                            {inboxes.receiver_convo.customer.first_name}{" "}
                            {inboxes.receiver_convo.customer.middle_name}{" "}
                            {inboxes.receiver_convo.customer.last_name}
                          </Typography>
                          <Typography variant="body2" style={{ opacity: 0.6 }}>
                            {inboxes.receiver_convo.customer.role}
                          </Typography>
                          <Typography variant="body2" style={{ opacity: 0.6 }}>
                            Created on: {moment(inboxes.created_at).fromNow()}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={6}>
                    <Grid item>
                      <Grid
                        container
                        spacing={2}
                        onClick={() => getMessages(inboxes.id)}
                        style={{
                          cursor: "pointer",
                          background:
                            id === inboxes.id ? "rgba(0,0,0,0.05)" : null,
                          borderRadius: 5,
                        }}
                      >
                        <Grid item>
                          <img
                            src={inboxes.sender_convo.customer_profile}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: "50%",
                            }}
                            alt="Profile"
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="body2"
                            style={{ fontWeight: "bold" }}
                          >
                            {inboxes.sender_convo.customer.first_name}{" "}
                            {inboxes.sender_convo.customer.middle_name}{" "}
                            {inboxes.sender_convo.customer.last_name}
                          </Typography>
                          <Typography variant="body2" style={{ opacity: 0.6 }}>
                            {inboxes.sender_convo.customer.role}
                          </Typography>
                          <Typography variant="body2" style={{ opacity: 0.6 }}>
                            Created on: {moment(inboxes.created_at).fromNow()}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </div>
            ))
          ) : (
            <div
              style={{
                height: 500,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography align="center">
                Create new conversation 📢{" "}
              </Typography>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Inbox;
