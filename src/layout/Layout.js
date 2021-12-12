import {
  AppBar,
  Button,
  Divider,
  Drawer,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles, alpha } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, verifyUser, logOut } from "../actions/auth";
import { FcSearch, FcUnlock, FcButtingIn, FcFile } from "react-icons/fc";
import CustomerUrl from "./CustomerUrl";
import StaffUrl from "./StaffUrl";
import AdminUrl from "./AdminUrl";
import AgentUrl from "./AgentUrl";
import { withRouter, Redirect, useHistory } from "react-router";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as api from "../api";
import { FiBell, FiMail } from "react-icons/fi";
import { MessageToSeen, updateToSeen } from "../actions/customer";
import Pusher from "pusher-js";

const Layout = ({ children, ids }) => {
  const dispatch = useDispatch();
  const date = new Date();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [user, setUser] = useState([]);
  const roleTypes = JSON.parse(localStorage.getItem("user"));
  const userId = roleTypes && roleTypes.id;
  const [invisible, setInvisible] = useState(true);
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [inbox, setInbox] = useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const loadImage = async () => {
    if (ids) {
      const { data } = await api.baseUrl.get(`get_profile/${ids.id}/`);

      setUser(data);
    }
  };

  const loadNotifications = async () => {
    if (ids) {
      const res = await api.baseUrl.get(`get_notification/${ids.id}/`);
      setNotifications(res.data);
    }
  };

  const loadInbox = async () => {
    if (ids) {
      const res = await api.baseUrl.get(`get_conversation/${ids.id}/`);
      setInbox(res.data);
    }
  };

  useEffect(() => {
    dispatch(verifyUser());
    dispatch(loadUser());
    loadNotifications();
    loadInbox();
    loadImage();

    const pusher = new Pusher("cefdc6ce26f90218cdcd", {
      cluster: "ap1",
      authEndpoint: `${api.BASE_URL}/pusher_authentication/`,
    });

    var my_channel = pusher.subscribe(`payment-${userId}`);
    var my_channel2 = pusher.subscribe(`paying-${userId}`);
    var my_channel3 = pusher.subscribe(`assign-${userId}`);
    var my_channel4 = pusher.subscribe(`updateassign-${userId}`);
    var my_channel5 = pusher.subscribe(`status-${userId}`);

    my_channel.bind("an_event", (msg) => {
      setNotifications((notification) => [...notification, msg]);
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
  }, [userId]);

  const clickBell = () => {
    history.push("/notifications");
    const updateNotifStatus =
      notifications.length > 0 &&
      notifications.map(
        (notif) => notif && { ...notif, notification_status: "Seen" }
      );

    const saveUpdate =
      updateNotifStatus.length > 0 &&
      updateNotifStatus.map((notif) => {
        return notif.id;
      });
    if (saveUpdate.length > 0) {
      dispatch(updateToSeen(JSON.stringify({ saveUpdate })));
      setNotifications(updateNotifStatus);
    }
  };

  const clickMessage = () => {
    history.push("/chat");
    const updateMessageStatus =
      inbox.length > 0 &&
      inbox.map((inboxes) => inboxes && { ...inboxes, status: "Seen" });

    console.log(updateMessageStatus);

    const saveUpdate =
      updateMessageStatus.length > 0 &&
      updateMessageStatus.map((notif) => {
        return notif.id;
      });
    if (saveUpdate.length > 0) {
      // dispatch(updateToSeen(JSON.stringify({ saveUpdate })));
      dispatch(MessageToSeen(JSON.stringify({ saveUpdate })));
      setInbox(updateMessageStatus);
    }
  };

  const countUnseen =
    notifications.length > 0 &&
    notifications.filter((notif) => notif.notification_status === "Unseen");

  const messageUnseen =
    inbox.length > 0 && inbox.filter((inboxes) => inboxes.status === "Unseen");

  const onPressEnter = (e) => {
    e.preventDefault();
    history.push(`/results?search_query=${search || "none"}`);
  };

  // Drawer Styles and Configurations
  const drawerWidth = 260;

  const useStyles = makeStyles((theme) => {
    return {
      page: {
        background: "#F1F1FA",
        width: "100%",
      },
      drawer: {
        width: drawerWidth,
      },
      root: {
        display: "flex",
      },
      title: {
        textAlign: "center",
        padding: 16,
      },
      active: {
        backgroundColor: "#7440FF",
        "&:hover": {
          backgroundColor: "#7440FF",
        },
      },
      activetext: {
        color: "white",
      },
      appbar: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
      welcome: { flexGrow: 1 },
      search: {
        // position: "relative",

        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.25),
        "&:hover": {
          backgroundColor: alpha(theme.palette.common.white, 0.15),
        },
        display: "flex",
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing(2),
          width: "30%",
        },
      },

      searchIcon: {
        padding: theme.spacing(0, 1, 0, 0),
        height: "100%",
        // position: "absolute",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
      },
      inputRoot: {
        color: "inherit",
      },
      inputInput: {
        // padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon

        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
          width: "25ch",
        },
      },
      backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
      },
      toolbar: theme.mixins.toolbar,
    };
  });

  const classes = useStyles();
  const logOutUser = () => {
    setOpen(true);
    dispatch(logOut());

    <Redirect to="/login" />;
  };
  const myProfile = () => {
    history.push("/profile");
  };

  const roleType = JSON.parse(localStorage.getItem("user"));

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        anchor="left"
        classes={{ paper: classes.drawer }}
      >
        <Typography className={classes.title}>
          <img
            src="https://occupyrem-bucket.s3.ap-southeast-1.amazonaws.com/occupy.PNG"
            width="60%"
            alt=""
          />
        </Typography>
        <Divider />
        {roleType && roleType.role === "Client" && <CustomerUrl />}
        {roleType && roleType.role === "Staff" && <StaffUrl />}
        {roleType && roleType.role === "Admin" && <AdminUrl />}
        {roleType && roleType.role === "Manager" && <StaffUrl />}
        {roleType && roleType.role === "Agent" && <AgentUrl />}

        <Divider />
        {/* <img src={AppbarPicture} alt="" width="100%" /> */}
      </Drawer>

      <AppBar className={classes.appbar}>
        <Toolbar>
          <Typography>
            Welcome to Occupy, {roleType && roleType.first_name}
          </Typography>
          {roleType &&
          roleType.role !== "Client" &&
          roleType.role !== "Agent" ? (
            <form className={classes.search} onSubmit={(e) => onPressEnter(e)}>
              <div className={classes.searchIcon}>
                <Button
                  type="submit"
                  size="small"
                  startIcon={<FcSearch size={25} cursor={"pointer"} />}
                ></Button>
              </div>
              <InputBase
                placeholder="Search Customer and employee"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </form>
          ) : null}

          <Typography className={classes.welcome}></Typography>
          <Button
            variant="outlined"
            style={{ border: "1px solid rgba(245, 246, 250,0.3)" }}
          >
            <Typography style={{ color: "rgba(245, 246, 250,0.9)" }}>
              {date.toDateString()}
            </Typography>
          </Button>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            // onClick={() => setInvisible(true)}
            onClick={() => clickMessage()}
          >
            {messageUnseen.length > 0 ? (
              <Badge color="error" badgeContent={messageUnseen.length}>
                <FiMail />
              </Badge>
            ) : (
              <Badge>
                <FiMail />
              </Badge>
            )}
          </IconButton>

          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={() => clickBell()}
          >
            {countUnseen.length > 0 ? (
              <Badge color="error" badgeContent={countUnseen.length}>
                <FiBell />
              </Badge>
            ) : (
              <Badge>
                <FiBell />
              </Badge>
            )}
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            aria-haspopup="true"
            onClick={handleClick}
          >
            {user.length > 0 && (
              <Avatar src={user[0].customer_profile} alt="Remy Sharp"></Avatar>
            )}
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={myProfile}>
              <FcButtingIn size={23} /> My Profile
            </MenuItem>

            <MenuItem onClick={logOutUser}>
              <FcUnlock size={23} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Backdrop open={open} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};
export default withRouter(Layout);
