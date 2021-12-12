import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import * as api from "../api";
import Pusher from "pusher-js";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import All from "./notification/All";
import Saved from "./notification/Saved";
import Title from "./Title";

const Notifications = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user && user.id;

  const [notifications, setNotifications] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const pusher = new Pusher("cefdc6ce26f90218cdcd", {
  //   cluster: "ap1",
  //   authEndpoint: `${api.BASE_URL}/pusher_authentication/`,
  // });

  // var my_channel = pusher.subscribe(`payment-${userId}`);

  const loadNotifications = async () => {
    const res = await api.baseUrl.get(`get_notification/${userId}/`);
    setNotifications(res.data);
  };

  useEffect(() => {
    loadNotifications();

    const pusher = new Pusher("cefdc6ce26f90218cdcd", {
      cluster: "ap1",
      authEndpoint: `${api.BASE_URL}/pusher_authentication/`,
    });

    var my_channel = pusher.subscribe(`payment-${userId}`);
    var my_channel2 = pusher.subscribe(`paying-${userId}`);
    var my_channel3 = pusher.subscribe(`assign-${userId}`);
    var my_channel4 = pusher.subscribe(`updateassign-${userId}`);

    my_channel.bind("an_event", (msg) => {
      setNotifications((notification) => [msg, ...notification]);
    });

    my_channel2.bind("paying_an_event", (msg) => {
      setNotifications((notification) => [msg, ...notification]);
    });

    my_channel3.bind("assign_an_event", (msg) => {
      setNotifications((notification) => [msg, ...notification]);
    });

    my_channel4.bind("updateassign_an_event", (msg) => {
      setNotifications((notification) => [msg, ...notification]);
    });
  }, []);

  const saveNotif =
    notifications.length > 0 &&
    notifications.filter((notif) => notif.notification_save === "Saved");

  return (
    <div>
      <Title title={"Notifications"} />
      <Container>
        <Paper style={{ margin: "20px 0px" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label={`All (${notifications.length})`} />
            <Tab
              label={`Saved (${saveNotif.length > 0 ? saveNotif.length : 0})`}
            />
          </Tabs>
        </Paper>

        <TabPanel value={value} index={0}>
          <All
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Saved
            saveNotif={saveNotif}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </TabPanel>
      </Container>
    </div>
  );
  function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <Typography>{children}</Typography>}</div>;
  }
};

export default Notifications;
