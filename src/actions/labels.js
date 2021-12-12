import * as api from "../api";
import axios from "axios";
import {
  GET_ALL_LABELS,
  LABEL_CREATED_SUCCESS,
  LABEL_CREATED_FAILED,
  DELETE_LABEL_SUCCESS,
  DELETE_LABEL_FAILED,
} from "./type";

export const allLabels = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const { data } = await axios.get(`${api.BASE_URL}/all_labels/`, config);

    dispatch({ type: GET_ALL_LABELS, payload: data });
  } catch (error) {
    dispatch({ type: LABEL_CREATED_FAILED });
  }
};

export const NewLabels = (datas) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    const { data } = await axios.post(
      `${api.BASE_URL}/add_labels/`,
      datas,
      config
    );

    dispatch({ type: LABEL_CREATED_SUCCESS, payload: data });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: LABEL_CREATED_FAILED });
  }
};

export const deleteLabels = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    await axios.delete(`${api.BASE_URL}/delete_labels/${id}/`, config);

    dispatch({ type: DELETE_LABEL_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_LABEL_FAILED });
  }
};
