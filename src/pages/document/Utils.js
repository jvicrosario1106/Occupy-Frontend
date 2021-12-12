import Typography from "@material-ui/core/Typography";
import { FiPlus, FiArrowUp } from "react-icons/fi";

export const priorityOption = [
  {
    value: "High",
    label: (
      <Typography>
        <FiArrowUp color="green" /> High Priority
      </Typography>
    ),
  },
  {
    value: "Medium",
    label: (
      <Typography>
        <FiArrowUp color="gray" /> Medium Priority
      </Typography>
    ),
  },
  {
    value: "Low",
    label: (
      <Typography>
        <FiArrowUp color="red" /> Low Priority
      </Typography>
    ),
  },
];

//Styles for Label
export const colourStylesLabel = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    width: 600,
    marginTop: 5,
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif',
  }),

  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: `${data.color}`,
      color: "white",
      borderRadius: 5,
    };
  },
  multiValueRemove: (styles, { data }) => ({
    ...styles,

    ":hover": {
      color: "black",
    },
  }),
};

export const colourStylesPriority = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    width: 600,
    marginTop: 10,
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif',
  }),
};

export const colourStylesAssignees = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    width: 600,
    margin: "10px 0px",
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif',
  }),
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "none",
      color: "black",
      borderRadius: 10,
    };
  },
  multiValueRemove: (styles, { data }) => ({
    ...styles,

    ":hover": {
      color: "red",
    },
  }),
};
