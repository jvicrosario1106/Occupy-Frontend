import {
  CREATE_SUCCESS,
  CREATE_FAILED,
  DELETE_SUCCESS,
  DELETE_FAILED,
  ASSIGN_SUCCESS,
  ASSIGN_FAILED,
} from "./type";
import * as api from "../api";
import axios from "axios";

export const createInquiry = (inquiryData) => async (dispatch) => {
  const config = {
    headers: { "Content-type": "application/json" },
  };

  const body = JSON.stringify(inquiryData);

  try {
    await axios.post(`${api.BASE_URL}/create_inquiry/`, body, config);
    dispatch({ type: CREATE_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_FAILED, payload: error.response.data.email[0] });
  }
};

export const assignInquiry = (inquiryData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    await axios.post(
      `${api.BASE_URL}/assign_agent_inquiry/`,
      inquiryData,
      config
    );
    dispatch({ type: ASSIGN_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: ASSIGN_FAILED });
  }
};

export const deleteInquiry = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    await axios.delete(`${api.BASE_URL}/delete_one_inquiry/${id}/`, config);
    dispatch({ type: DELETE_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: DELETE_FAILED });
  }
};
