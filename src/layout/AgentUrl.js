import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, useHistory } from "react-router-dom";
import {
  FcParallelTasks,
  FcCollapse,
  FcExpand,
  FcOpenedFolder,
  FcPackage,
  FcBarChart,
  FcBullish,
  FcConferenceCall,
  FcDocument,
  FcPaid,
  FcCollaboration,
  FcDataSheet,
  FcKindle,
  FcSurvey,
  FcOrganization,
  FcNews,
} from "react-icons/fc";

const AgentUrl = () => {
  const urlPath = [
    // {
    //   urlName: "Reservation",
    //   path: "/customer-reservation",
    //   icon: <FcPackage size={30} />,
    // },
    // {
    //   urlName: "Resident",
    //   path: "/customer-resident",
    //   icon: <FcConferenceCall size={30} />,
    // },
    // {
    //   urlName: "Accounting",
    //   path: "/accounting",
    //   icon: <FcPaid size={30} />,
    // },
    {
      urlName: "Assigned Inquiries",
      path: "/home",
      icon: <FcSurvey size={30} />,
    },
    {
      urlName: "Applicants",
      path: "/applicants",
      icon: <FcKindle size={30} />,
    },

    {
      urlName: "Property",
      path: "/properties",
      icon: <FcOrganization size={30} />,
    },
    {
      urlName: "Requirements",
      path: "/list-requirements",
      icon: <FcNews size={30} />,
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
      activenested: {
        backgroundColor: "#7440FF",
        "&:hover": {
          backgroundColor: "#7440FF",
        },
        paddingLeft: theme.spacing(4),
      },
      nested: {
        paddingLeft: theme.spacing(4),
      },
      toolbar: theme.mixins.toolbar,
    };
  });

  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
    history.push("/document");
  };

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
        {/* Document Managemnet URL  */}
        <ListItem
          button
          onClick={handleClick}
          className={location.pathname === "/document" ? classes.active : null}
        >
          <ListItemIcon
            className={
              location.pathname === "/document" ? classes.activetext : null
            }
          >
            <FcDocument size={30} />,
          </ListItemIcon>
          <ListItemText
            className={
              location.pathname === "/document" ? classes.activetext : null
            }
            primary="Document"
          />
          {/* {open ? <FcCollapse /> : <FcExpand />} */}
        </ListItem>
        {/* Collapse DropDown */}
        {/* <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={
                location.pathname === "/tasks"
                  ? classes.activenested
                  : classes.nested
              }
              onClick={(e) => history.push("/tasks")}
            >
              <ListItemIcon
                className={
                  location.pathname === "/tasks" ? classes.activetext : null
                }
              >
                {<FcParallelTasks size={30} />}
              </ListItemIcon>
              <ListItemText
                className={
                  location.pathname === "/tasks" ? classes.activetext : null
                }
                primary="Task"
              />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem
              button
              className={
                location.pathname === "/tasks-history"
                  ? classes.activenested
                  : classes.nested
              }
              onClick={(e) => history.push("/tasks-history")}
            >
              <ListItemIcon
                className={
                  location.pathname === "/tasks-history"
                    ? classes.activetext
                    : null
                }
              >
                {<FcDataSheet size={30} />}
              </ListItemIcon>
              <ListItemText
                primary="Task History"
                className={
                  location.pathname === "/tasks-history"
                    ? classes.activetext
                    : null
                }
              />
            </ListItem>
          </List> */}

        {/* <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>{<FcOpenedFolder size={30} />}</ListItemIcon>
              <ListItemText primary="Archive" />
            </ListItem>
          </List> */}
        {/* </Collapse> */}
      </List>
    </div>
  );
};

export default AgentUrl;
