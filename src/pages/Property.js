import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { FcOrganization } from "react-icons/fc";
import * as api from "../api";
import { FiHome } from "react-icons/fi";
import All from "./property/All";
import Available from "./property/Available";
import Reserved from "./property/Reserved";
import Sold from "./property/Sold";
import AddProperty from "./property/AddProperty";
import EditProperty from "./property/EditProperty";
import EditImage from "./property/EditImage";
import { addProperty, deleteProperties } from "../actions/employee";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Title from "./Title";
import { useHistory } from "react-router-dom";
import Archived from "./property/Archived";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  paper1: {
    display: "flex",
    padding: 5,
    margin: "15px 0px",
  },
});

const Property = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [properties, setProperties] = useState([]);
  const [value, setValue] = React.useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const isStatus = useSelector((state) => state.employeeReducer.status);
  const [add, setAdd] = useState({
    project_type: "",
    block: "",
    lot: "",
    phase: "",
    added_by_property: user.email,
    property_status: "",
    property_price: "",
    property_description: "",
    property_progress: "",
  });
  const [image, setImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);
  const [editStatus, setEditStatus] = useState(false);
  const roleTypes = JSON.parse(localStorage.getItem("user"));

  // Modal for Edit
  const [editOpens, setEditOpens] = useState(false);
  const [imageOpen, setImageOpen] = useState(null);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loadProperties = async () => {
    const res = await api.baseUrl.get("get_all_available_properties/");
    setProperties(res.data);
  };

  const onChangeData = (e) => {
    setAdd({ ...add, [e.target.name]: e.target.value });
  };

  const editOpen = (id) => {
    setId(id);
    setEditOpens(true);
  };

  const handleImageOpen = (id) => {
    setId(id);

    console.log(id);
    setImageOpen(true);
  };

  const onChangeImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setImageUpload(e.target.files[0]);
  };

  useEffect(() => {
    loadProperties();

    if (user.role === "Client") {
      history.push("/home");
    }
  }, []);

  const deleteProperty = (id) => {
    const deleteItem = properties.filter((property) => property.id !== id);

    const confirm = window.confirm(
      "⚠ WARNING: Deleting this property can affect the customer assigned properties. Please check your customer before clicking 'OK'"
    );
    if (confirm) {
      const prompt = window.prompt("Type DELETE to proceed");
      if (prompt === "DELETE" || prompt === "delete") {
        dispatch(deleteProperties(id));
        setProperties(deleteItem);
      }
    }
  };

  const SubmitData = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("data", JSON.stringify(add));
    form_data.append("added_by_property", user.id);
    form_data.append("image", imageUpload, imageUpload.name);

    if (
      Number(add.property_progress) < 0 ||
      Number(add.property_progress) > 100
    ) {
      window.alert("0% Progress to 100% Progress Only");
    } else {
      const confirm = window.confirm(
        "Are you sure you want to insert new property?"
      );
      if (confirm) {
        setIsLoading(true);
        dispatch(addProperty(form_data));
      }
    }
  };

  if (isStatus === "SuccessAddProp") {
    window.location.reload();
  }

  if (isStatus === "FailedAddProp") {
    window.location.reload();
  }

  const availableProp =
    properties.length > 0 &&
    properties.filter((property) => property.property_status === "Available");
  const soldProp =
    properties.length > 0 &&
    properties.filter((property) => property.property_status === "Sold");
  const reservedProp =
    properties.length > 0 &&
    properties.filter((property) => property.property_status === "Reserved");
  const archivedProp =
    properties.length > 0 &&
    properties.filter((property) => property.property_status === "Archived");

  return (
    <div>
      <Title title={"Properties"} />
      <Container>
        {/* Snackbar */}
        {isStatus === "SuccessAddProp" && (
          <Snackbar open={true}>
            <Alert severity="success">Successfully Added New Property 😀</Alert>
          </Snackbar>
        )}

        {isStatus === "FailedAddProp" && (
          <Snackbar open={true}>
            <Alert severity="error">Failed to Add New Property</Alert>
          </Snackbar>
        )}

        <Snackbar open={editStatus}>
          <Alert severity="success">Successfully Updated 😀</Alert>
        </Snackbar>

        <Grid container>
          {properties.length > 0 && (
            <EditProperty
              id={id}
              properties={properties}
              setProperties={setProperties}
              isLoading={isLoading}
              editOpens={editOpens}
              setEditOpens={setEditOpens}
              editStatus={editStatus}
              setEditStatus={setEditStatus}
            />
          )}

          {properties.length > 0 && (
            <EditImage
              id={id}
              setImageOpen={setImageOpen}
              imageOpen={imageOpen}
            />
          )}

          <Grid item>
            <Paper className={classes.paper1}>
              <FcOrganization size={30} />{" "}
              <Typography variant="h6" color="primary">
                Property Management
              </Typography>
            </Paper>
          </Grid>
          <Grid item style={{ flexGrow: 1 }}></Grid>
          <Grid item className={classes.paper1}>
            {roleTypes && roleTypes.role !== "Agent" && (
              <AddProperty
                endIcon={<FiHome />}
                add={add}
                onChangeData={onChangeData}
                onChangeImage={onChangeImage}
                SubmitData={SubmitData}
                isLoading={isLoading}
              />
            )}
          </Grid>
        </Grid>

        {properties.length > 0 && (
          <Paper style={{ marginBottom: 15 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label={`All Properties (${properties.length}) `} />
              <Tab label={`Available Properties (${availableProp.length}) `} />
              <Tab label={`Sold Properties (${soldProp.length}) `} />
              <Tab label={`Reserved Properties (${reservedProp.length}) `} />
              <Tab label={`Archived Properties (${archivedProp.length}) `} />
            </Tabs>
          </Paper>
        )}

        {properties && (
          <div>
            <TabPanel value={value} index={0}>
              <All
                properties={properties}
                deleteProperty={deleteProperty}
                editOpen={editOpen}
                handleImageOpen={handleImageOpen}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Available
                availableProp={availableProp}
                deleteProperty={deleteProperty}
                editOpen={editOpen}
                handleImageOpen={handleImageOpen}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Sold
                soldProp={soldProp}
                deleteProperty={deleteProperty}
                editOpen={editOpen}
                handleImageOpen={handleImageOpen}
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Reserved
                reservedProp={reservedProp}
                deleteProperty={deleteProperty}
                editOpen={editOpen}
                handleImageOpen={handleImageOpen}
              />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Archived
                archivedProp={archivedProp}
                deleteProperty={deleteProperty}
                editOpen={editOpen}
                handleImageOpen={handleImageOpen}
              />
            </TabPanel>
          </div>
        )}
      </Container>
    </div>
  );
  function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <Typography>{children}</Typography>}</div>;
  }
};

export default Property;
