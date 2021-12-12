import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import { FcExport, FcUp, FcLike, FcDislike } from "react-icons/fc";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { FiChevronRight, FiVolume2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { updateToSave } from "../../actions/customer";
import moment from "moment";

const All = ({ notifications, setNotifications }) => {
  const dispatch = useDispatch();

  const clickSaved = (id, status) => {
    const savedItem =
      notifications.length > 0 &&
      notifications.map((notif) =>
        notif.id === id ? { ...notif, notification_save: status } : notif
      );
    setNotifications(savedItem);
    dispatch(updateToSave(JSON.stringify({ id: id, status: status })));
  };

  const tableIcons = {
    Search: Search,
    Clear: Clear,
    FirstPage: FirstPage,
    LastPage: LastPage,
    PreviousPage: ChevronLeft,
    NextPage: ChevronRight,
    ResetSearch: Clear,
    SortArrow: FcUp,
    Export: FcExport,
    DetailPanel: FiChevronRight,
  };

  const columns = [
    {
      title: "Message",
      render: (rowData) => (
        <Grid container direction="column">
          <Grid item>
            <Typography variant="caption">
              {moment(rowData.notification_date_created).fromNow()}
            </Typography>
          </Grid>
          <Grid item>
            <FiVolume2 /> {rowData.notification_message}
          </Grid>
        </Grid>
      ),
    },
    {
      title: "From",
      render: (rowData) => (
        <Grid container spacing={2}>
          <Grid item>
            {" "}
            <img
              src={rowData.customer_notification_from.customer_profile}
              alt="Profile"
              style={{ width: 40, height: 40, borderRadius: "50%" }}
            />{" "}
          </Grid>
          <Grid item>
            <Typography variant="caption" style={{ opacity: 0.6 }}>
              {rowData.customer_notification_from.customer.role}
            </Typography>
            <Grid item>
              <Typography
                variant="caption"
                style={{
                  backgroundColor: "#8E30FF",
                  padding: 5,
                  color: "white",
                }}
              >
                {rowData.customer_notification_from.customer.email}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <div>
      <MaterialTable
        style={{ margin: "35px 0px" }}
        data={notifications ? notifications : notifications.display}
        columns={columns}
        icons={tableIcons}
        title="Notifications"
        options={{
          headerStyle: {
            fontSize: 16,
            fontWeight: 100,
          },
          search: false,
          sorting: true,
          pageSize: 10,
          draggable: true,
          exportButton: true,
          searchAutoFocus: true,

          rowStyle: {
            fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif',
          },
          actionsColumnIndex: -1,
        }}
        actions={[
          (rowData) => ({
            icon: () =>
              rowData.notification_save === "Saved" ? (
                <FcDislike color="green" />
              ) : (
                <FcLike />
              ),

            tooltip:
              rowData.notification_save === "Saved" ? "Unsaved" : "Saved",
            onClick: (event, rowData) =>
              rowData.notification_save === "Saved"
                ? clickSaved(rowData.id, "Unsaved")
                : clickSaved(rowData.id, "Saved"),
          }),
        ]}
      />
    </div>
  );
};

export default All;
