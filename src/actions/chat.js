import {
  ADD_CONVO_FAILED,
  ADD_CONVO_SUCCESS,
  ADD_MESSAGE_FAILED,
  ADD_MESSAGE_SUCCESS,
} from "./type";
import * as api from "../api";
import axios from "axios";

export const addMessage = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  const body = JSON.stringify(data);

  try {
    await axios.post(`${api.BASE_URL}/add_message/`, body, config);
    dispatch({ type: ADD_MESSAGE_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: ADD_MESSAGE_FAILED });
  }
};

export const addConvo = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    await axios.post(`${api.BASE_URL}/start_conversation/`, data, config);
    dispatch({ type: ADD_CONVO_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: ADD_CONVO_FAILED });
  }
};
