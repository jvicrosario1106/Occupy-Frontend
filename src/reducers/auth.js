import {
  CREATE_ACCOUNT_STAFF_SUCCESS,
  CREATE_ACCOUNT_STAFF_FAILED,
  ACTIVATE_ACCOUNT_SUCCESS,
  ACTIVATE_ACCOUNT_FAILED,
  CREATE_ACCOUNT_CUSTOMER_SUCCESS,
  CREATE_ACCOUNT_CUSTOMER_FAILED,
  LOGIN_SUCCESS,
  AUTHENTICATION_FAILED,
  AUTHENTICATION_SUCCCESS,
  LOGIN_FAILED,
  REFRESH_TOKEN,
  LOGOUT_SUCCESS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
  PASSWORD_RESET_SEND_EMAIL_SUCCESS,
  PASSWORD_RESET_SEND_EMAIL_FAILED,
  PASSWORD_RESET_URL_SUCCESS,
  PASSWORD_RESET_URL_FAILED,
} from "../actions/type";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: false,
  user: null,
  message: null,
  status: null,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ACCOUNT_STAFF_SUCCESS:
      return {
        ...state,
        status: "Success",
      };
    case CREATE_ACCOUNT_STAFF_FAILED:
      return {
        ...state,
        status: "Failed",
        message: payload,
      };
    case ACTIVATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        message: "ActivationSuccess",
      };
    case ACTIVATE_ACCOUNT_FAILED:
      return {
        ...state,
        message: "ActivationFailed",
      };
    case CREATE_ACCOUNT_CUSTOMER_SUCCESS:
      return {
        ...state,

        status: "Success",
      };
    case CREATE_ACCOUNT_CUSTOMER_FAILED:
      return {
        ...state,
        status: "Failed",
        message: payload,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("refresh", payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOAD_USER_FAILED:
    case LOGIN_FAILED:
    case AUTHENTICATION_FAILED:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");

      return {
        ...state,
        message: payload,
        isAuthenticated: false,
      };
    case REFRESH_TOKEN:
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        isAuthenticated: true,
      };
    case AUTHENTICATION_SUCCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };

    case LOAD_USER_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");

      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
      };
    case PASSWORD_RESET_SEND_EMAIL_SUCCESS:
      return {
        ...state,
        status: "sendemailsuccess",
      };
    case PASSWORD_RESET_SEND_EMAIL_FAILED:
      return {
        ...state,
        status: "sendemailfailed",
      };
    case PASSWORD_RESET_URL_SUCCESS:
      return {
        ...state,
        status: "sendurlsuccess",
      };
    case PASSWORD_RESET_URL_FAILED:
      return {
        ...state,
        status: "sendurlfailed",
      };
    default:
      return {
        state,
      };
  }
};
