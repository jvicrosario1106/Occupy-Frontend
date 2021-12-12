import * as api from "../api";
import axios from "axios";
import { SEARCH_SUCCESS, SEARCH_FAILED } from "./type";

export const searchData = (search) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const { data } = await axios.get(
      `${api.BASE_URL}/search_user?search=${search}`,
      config
    );

    dispatch({ type: SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SEARCH_FAILED });
  }
};
