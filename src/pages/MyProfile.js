import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/styles";
import MyProfileForm from "../components/staff/MyProfileForm";
import * as api from "../api";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../actions/employee";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  paper1: {
    padding: 20,
    margin: "10px 0px",
  },
  paper2: {
    padding: 5,
    width: "500px",
    display: "flex",
  },
  fullname: {
    flexGrow: 1,
  },

  grid1: {
    marginTop: 5,
  },
  grid2: {
    marginTop: 5,
  },
  date: {
    width: 625,
  },
  names: {
    width: 300,
  },
  age: {
    width: 300,
  },
  citizenship: {
    width: 460,
  },
  sex: {
    width: 465,
  },
  address: {
    width: 625,
  },
  marital: {
    width: 300,
  },
  submit: {
    marginTop: 10,
  },
  img: {
    borderRadius: "50%",
    height: "150px",
    width: "150px",
    margin: "0px 5px",
  },
  role: {
    marginBottom: 5,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 4,
    color: "#fff",
  },
}));

const MyProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [employeeInfo, setEmployeeInfo] = useState([]);
  const users = JSON.parse(localStorage.getItem("user"));
  const [image, setImage] = useState();
  const [opens, setOpens] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const loadEmployee = async () => {
    if (users) {
      const { data } = await api.baseUrl.get(`get_one_employee/${users.id}/`);
      setEmployeeInfo(data);
    }
  };
  const isStatus = useSelector((state) => state.employeeReducer.status);
  console.log(isStatus);

  const onSubmitImage = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("id", users.id);
    form_data.append("customer_profile", image, image.name);
    const confirm = window.confirm(
      "Are you sure you want to update your profile image?"
    );
    console.log(isStatus);
    if (confirm) {
      dispatch(updateProfile(form_data));
      setOpen(true);
      setOpens(false);
    }
  };

  if (isStatus) {
    window.location.reload();
  }

  useEffect(() => {
    loadEmployee();
  }, []);

  console.log(employeeInfo);

  return (
    <div>
      <Title title={"Profile"} />
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container>
        {employeeInfo.length > 0 &&
          employeeInfo.map((emp) => (
            <MyProfileForm
              classes={classes}
              emp={emp}
              image={image}
              onSubmitImage={onSubmitImage}
              setImage={setImage}
              opens={opens}
              setOpens={setOpens}
            />
          ))}
      </Container>
    </div>
  );
};

export default MyProfile;
