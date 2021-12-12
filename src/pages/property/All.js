import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Progress from "./Progress";
import { FiEdit } from "react-icons/fi";

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

const All = ({ properties, deleteProperty, editOpen, handleImageOpen }) => {
  const classes = useStyles();
  const roleTypes = JSON.parse(localStorage.getItem("user"));
  console.log(properties);
  return (
    <div>
      <Grid container spacing={3}>
        {properties.length > 0 ? (
          properties.map((property) => (
            <Grid item>
              <Card className={classes.root}>
                <CardActionArea
                  onClick={() => {
                    roleTypes &&
                      roleTypes.role !== "Agent" &&
                      handleImageOpen(property.id);
                  }}
                >
                  <CardMedia
                    className={classes.media}
                    image={property.property_image}
                    title="Edit Property Image"
                  />

                  <CardContent>
                    <div style={{ display: "flex" }}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{ flexGrow: 1 }}
                      >
                        Added By: {property.added_by_property}
                      </Typography>

                      <Progress value={property.property_progress} />
                    </div>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ flexGrow: 1 }}
                    >
                      Customer: {property.property_owner}
                    </Typography>

                    <Typography gutterBottom variant="h5" component="h2">
                      {property.project_type}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {property.property_description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  {roleTypes && roleTypes.role !== "Agent" ? (
                    <div style={{ flexGrow: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() => editOpen(property.id)}
                        startIcon={<FiEdit />}
                      >
                        Edit
                      </Button>
                      {/* <Button
                        size="small"
                        style={{ color: "red" }}
                        onClick={() => deleteProperty(property.id)}
                      >
                        Delete
                      </Button> */}
                    </div>
                  ) : (
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => editOpen(property.id)}
                    >
                      View
                    </Button>
                  )}

                  <Button size="small" color="primary" variant="contained">
                    {property.property_status}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography> No Properties Available</Typography>
        )}
      </Grid>
    </div>
  );
};

export default All;
