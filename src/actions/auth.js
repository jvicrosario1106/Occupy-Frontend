import axios from "axios";
import {
  CREATE_ACCOUNT_STAFF_SUCCESS,
  CREATE_ACCOUNT_STAFF_FAILED,
  ACTIVATE_ACCOUNT_SUCCESS,
  ACTIVATE_ACCOUNT_FAILED,
  CREATE_ACCOUNT_CUSTOMER_SUCCESS,
  CREATE_ACCOUNT_CUSTOMER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REFRESH_TOKEN,
  AUTHENTICATION_SUCCCESS,
  AUTHENTICATION_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
  PASSWORD_RESET_SEND_EMAIL_SUCCESS,
  PASSWORD_RESET_SEND_EMAIL_FAILED,
  PASSWORD_RESET_URL_SUCCESS,
  PASSWORD_RESET_URL_FAILED,
} from "../actions/type";

import * as api from "../api";

export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.get(`${api.BASE_URL}/auth/users/me/`, config);
      dispatch({ type: LOAD_USER_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAILED });
    }
  } else {
    dispatch({ type: LOAD_USER_FAILED });
  }
};

export const verifyUser = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });
    try {
      const res = await axios.post(
        `${api.BASE_URL}/auth/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== "token_not_valid") {
        dispatch({ type: AUTHENTICATION_SUCCCESS });
      } else {
        dispatch({ type: AUTHENTICATION_FAILED });
      }
    } catch (error) {
      dispatch({ type: AUTHENTICATION_FAILED });
    }
  } else {
    dispatch({ type: AUTHENTICATION_FAILED });
  }
};

export const logOut = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  const body = JSON.stringify({ refresh: localStorage.getItem("refresh") });
  try {
    await axios.post(`${api.BASE_URL}/logout/`, body, config);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILED });
  }
};

export const createStaff = (staffData) => async (dispatch) => {
  const config = {
    headers: { "Content-type": "application/json" },
  };

  const body = JSON.stringify(staffData);

  console.log(body);
  try {
    await axios.post(`${api.BASE_URL}/auth/users/`, body, config);

    dispatch({ type: CREATE_ACCOUNT_STAFF_SUCCESS });
  } catch (error) {
    dispatch({
      type: CREATE_ACCOUNT_STAFF_FAILED,
      payload:
        error.response.data["email"] ||
        error.response.data["password"] ||
        error.response.data["non_field_errors"],
    });
  }
};

export const createCustomer = (customerData) => async (dispatch) => {
  const config = {
    headers: { "Content-type": "application/json" },
  };

  const body = JSON.stringify(customerData);

  try {
    await axios.post(`${api.BASE_URL}/auth/users/`, body, config);

    dispatch({ type: CREATE_ACCOUNT_CUSTOMER_SUCCESS });
  } catch (error) {
    dispatch({
      type: CREATE_ACCOUNT_CUSTOMER_FAILED,
      payload:
        error.response.data["email"] ||
        error.response.data["password"] ||
        error.response.data["non_field_errors"],
    });
  }
};

export const activateUser = (uid, token) => async (dispatch) => {
  const config = {
    headers: { "Content-type": "application/json" },
  };
  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(`${api.BASE_URL}/auth/users/activation/`, body, config);
    dispatch({ type: ACTIVATE_ACCOUNT_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: ACTIVATE_ACCOUNT_FAILED });
  }
};

export const jwtCreate = (loginCredentials) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify(loginCredentials);
  try {
    const res = await axios.post(
      `${api.BASE_URL}/auth/jwt/create/`,
      body,
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(refreshToken());
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: LOGIN_FAILED, payload: error.response.data.detail });
  }
};

export const refreshToken = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify({ refresh: localStorage.getItem("refresh") });

  try {
    const res = await axios.post(
      `${api.BASE_URL}/auth/jwt/refresh/`,
      body,
      config
    );

    dispatch({ type: REFRESH_TOKEN, payload: res.data });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: LOGIN_FAILED });
  }
};

export const passwordResetEmailSend = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `${api.BASE_URL}/auth/users/reset_password/`,
      body,
      config
    );

    dispatch({ type: PASSWORD_RESET_SEND_EMAIL_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: PASSWORD_RESET_SEND_EMAIL_FAILED });
  }
};

export const passwordResetURL =
  (uid, token, newPassword, rePassword) => async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({
      uid: uid,
      token: token,
      new_password: newPassword,
      re_new_password: rePassword,
    });

    try {
      await axios.post(
        `${api.BASE_URL}/auth/users/reset_password_confirm/`,
        body,
        config
      );

      dispatch({ type: PASSWORD_RESET_URL_SUCCESS });
    } catch (error) {
      console.log({ ...error });
      dispatch({ type: PASSWORD_RESET_URL_FAILED });
    }
  };
