import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, useHistory } from "react-router-dom";
import {
  FcMoneyTransfer,
  FcHome,
  FcDebt,
  FcSms,
  FcRules,
  FcKey,
} from "react-icons/fc";
const CustomerUrl = () => {
  const urlPath = [
    {
      urlName: "Home",
      path: "/home",
      icon: <FcHome size={30} />,
    },
    {
      urlName: "Payment Details",
      path: "/payment-details",
      icon: <FcMoneyTransfer size={30} />,
    },

    {
      urlName: "Balance",
      path: "/balance",
      icon: <FcDebt size={30} />,
    },
    {
      urlName: "Payment History",
      path: "/payment-history",
      icon: <FcRules size={30} />,
    },
    {
      urlName: "My Property",
      path: "/my-property",
      icon: <FcKey size={30} />,
    },
  ];

  const useStyles = makeStyles((theme) => {
    return {
      active: {
        backgroundColor: "#7440FF",
        "&:hover": {
          backgroundColor: "#7440FF",
        },
      },
      activetext: {
        color: "white",
      },

      toolbar: theme.mixins.toolbar,
    };
  });

  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  return (
    <div>
      <List>
        {urlPath.map((url) => (
          <ListItem
            button
            key={url.path}
            onClick={(e) => history.push(url.path)}
            className={location.pathname === url.path ? classes.active : null}
          >
            <ListItemIcon
              className={
                location.pathname === url.path ? classes.activetext : null
              }
            >
              {url.icon}
            </ListItemIcon>
            <ListItemText
              className={
                location.pathname === url.path ? classes.activetext : null
              }
              primary={url.urlName}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CustomerUrl;
