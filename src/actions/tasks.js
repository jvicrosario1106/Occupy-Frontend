import * as api from "../api";
import axios from "axios";
import {
  GET_ALL_TASKS,
  TASKS_CREATED_SUCCESS,
  TASKS_CREATED_FAILED,
  TASKS_ORDER_SUCCESS,
  TASKS_ORDER_FAILED,
  TASK_DELETED_SUCCESS,
  TASK_DELETED_FAILED,
  TASKS_UPDATE_SUCCESS,
  TASKS_UPDATE_FAILED,
  UPDATE_TASK_ONE_SUCCESS,
  UPDATE_TASK_ONE_FAILED,
} from "./type";

export const allTasks = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    const { data } = await axios.get(`${api.BASE_URL}/get_tasks/`, config);

    dispatch({ type: GET_ALL_TASKS, payload: data });
  } catch (error) {
    dispatch({ type: TASKS_CREATED_FAILED });
  }
};

export const NewTasks = (datas) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    const { data } = await axios.post(
      `${api.BASE_URL}/add_task/`,
      datas,
      config
    );

    dispatch({ type: TASKS_CREATED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TASKS_CREATED_FAILED });
  }
};

export const updateTasks = (datas) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    const { data } = await axios.post(
      `${api.BASE_URL}/update_task/`,
      datas,
      config
    );

    dispatch({ type: TASKS_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({ type: TASKS_UPDATE_FAILED });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    await axios.delete(`${api.BASE_URL}/delete_task/${id}/`, config);

    dispatch({ type: TASK_DELETED_SUCCESS });
  } catch (error) {
    dispatch({ type: TASK_DELETED_FAILED });
  }
};

export const reOrderedTasks = (datas) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    const { data } = await axios.post(
      `${api.BASE_URL}/order_tasks/`,
      datas,
      config
    );

    dispatch({ type: TASKS_ORDER_SUCCESS });
  } catch (error) {
    dispatch({ type: TASKS_ORDER_FAILED });
  }
};

export const reOrderedTasksbyColumn = (datas) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    const { data } = await axios.post(
      `${api.BASE_URL}/order_tasks_by_column/`,
      datas,
      config
    );

    dispatch({ type: TASKS_ORDER_SUCCESS });
  } catch (error) {
    dispatch({ type: TASKS_ORDER_FAILED });
  }
};

export const updateOneTask = (datas) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    const { data } = await axios.post(
      `${api.BASE_URL}/update_task_status/`,
      datas,
      config
    );

    dispatch({ type: UPDATE_TASK_ONE_SUCCESS });
  } catch (error) {
    dispatch({ type: UPDATE_TASK_ONE_FAILED });
  }
};
