import React, { useState, useEffect } from "react";
import * as api from "../../api";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { FcKey } from "react-icons/fc";

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
  paper1: {
    margin: "15px 0px",
    padding: 5,
    display: "flex",
  },
});

const MyProperty = () => {
  const classes = useStyles();
  const [property, setProperty] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const loadProperty = async () => {
    const res = await api.baseUrl.get(`get_my_property/${user.id}/`);
    setProperty(res.data);
  };

  useEffect(() => {
    loadProperty();
  }, []);

  console.log(property);

  return (
    <div>
      <Container>
        <Grid container>
          <Grid item>
            <Paper className={classes.paper1}>
              <FcKey size={30} />
              <Typography variant="h6" color="primary">
                My Property
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {property.length > 0 ? (
          property.map((prop) => (
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={prop.property_image}
                  title="Edit Property Image"
                />

                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ flexGrow: 1 }}
                  >
                    Customer: {prop.property_owner}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {prop.project_type}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="p">
                    {prop.block} / {prop.lot} / {prop.phase}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {prop.property_description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" variant="contained">
                  {prop.property_status}
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography>No Property Available</Typography>
        )}
      </Container>
    </div>
  );
};

export default MyProperty;
