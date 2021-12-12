import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Inbox from "./Inbox";
import Messages from "./Messages";
import TextField from "@material-ui/core/TextField";
import * as api from "../../api";
import { FiSend } from "react-icons/fi";
import moment from "moment";
import ReactScrollableFeed from "react-scrollable-feed";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, addConvo } from "../../actions/chat";
import Pusher from "pusher-js";
import { Typography } from "@material-ui/core";
import Title from "../Title";

const Chat = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user && user.id;
  const [send, setSend] = useState({
    sender_message: {
      customer: {
        id: userId,
      },
    },
    created_at: moment().toDate(),
    send_message: "",
  });

  const handleChange = (e) => {
    setSend({ ...send, [e.target.name]: e.target.value });
  };

  const [message, setMessage] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [receiver, setReceiver] = useState("");
  const isStatus = useSelector((state) => state.chatReducer.status);
  const [delivered, setDelivered] = useState(false);

  const loadMessage = async () => {
    const res = await api.baseUrl.get(`get_messages/`);
    setMessage(res.data);
  };

  const loadInbox = async () => {
    const res = await api.baseUrl.get(`get_conversation/${userId}/`);
    setInbox(res.data);
  };

  const loadAllUser = async () => {
    const res = await api.baseUrl.get(`get_all_users/`);
    setAllUser(res.data);
  };

  useEffect(() => {
    loadInbox();
    loadMessage();
    loadAllUser();

    const pusher = new Pusher("cefdc6ce26f90218cdcd", {
      cluster: "ap1",
      authEndpoint: `${api.BASE_URL}/pusher_authentication/`,
    });

    const my_channel = pusher.subscribe(`chat-${id}`);

    my_channel.bind("chat_event", (msg) => {
      setMessage((messages) => [...messages, msg]);

      const updateInbox =
        inbox.length > 0 &&
        inbox.map((inboxes) =>
          inboxes.id === id
            ? { ...inboxes, created_at: msg.created_at }
            : inboxes
        );

      setInbox(updateInbox);
    });
  }, [id]);

  const getConvoMessage =
    message.length > 0 &&
    message.filter((msg) => msg.conversation_message.id === id);

  const getMessages = (id) => {
    setId(id);
  };

  const onSubmithandle = (e) => {
    e.preventDefault();
    const data = {
      ...send,
      id: id,
      created_at: moment().toDate(),
    };
    dispatch(addMessage(data));

    setSend({
      ...send,
      send_message: "",
      created_at: moment().toDate(),
    });
  };

  const startConvo = (e) => {
    e.preventDefault();
    const confirm = window.confirm("Are you sure you want to continue?");
    if (confirm) {
      dispatch(
        addConvo(JSON.stringify({ sender: userId, receiver: receiver }))
      );
    }
  };

  if (isStatus === "SuccessAdd") {
    window.location.reload();
  }

  if (isStatus === "FailedAdd") {
    window.location.reload();
  }

  return (
    <div>
      <Title title={"Chat Message"} />
      <Grid container>
        <Grid item>
          <Inbox
            getMessages={getMessages}
            inbox={inbox}
            id={id}
            allUser={allUser}
            receiver={receiver}
            setReceiver={setReceiver}
            startConvo={startConvo}
          />
        </Grid>

        {id ? (
          <Grid
            item
            style={{
              flexGrow: 1,
            }}
          >
            <div
              style={{
                background: "white",
                height: "79vh",

                scrollBehavior: "smooth",
              }}
            >
              <ReactScrollableFeed>
                {getConvoMessage.length > 0 &&
                  getConvoMessage.map((mess) => <Messages mess={mess} />)}
              </ReactScrollableFeed>
            </div>

            <form onSubmit={(e) => onSubmithandle(e)}>
              <Grid container>
                <div style={{ flexGrow: 1, margin: "15px 10px" }}>
                  <TextField
                    placeholder="Enter Message... or Windows logo key + . (period) for emoji"
                    autoComplete="off"
                    required
                    style={{ backgroundColor: "white" }}
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="send_message"
                    value={send.send_message}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div style={{ margin: "15px 5px" }}>
                  <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    endIcon={<FiSend />}
                    type="submit"
                  >
                    Send
                  </Button>
                </div>
              </Grid>
            </form>
          </Grid>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              flexGrow: 1,
            }}
          >
            <Typography>
              Click your chat or create new conversation 😶{" "}
            </Typography>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default Chat;
