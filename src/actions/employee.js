import * as api from "../api";
import axios from "axios";
import {
  UPDATE_EMPLOYEE_PROFILE_SUCCESS,
  UPDATE_EMPLOYEE_PROFILE_FAILED,
  DELETE_EMPLOYEE_PROFILE_SUCCESS,
  DELETE_EMPLOYEE_PROFILE_FAILED,
  AUTHENTICATION_SUCCCESS,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILED,
  COMPANY_DOCS_SUCCESS,
  COMPANY_DOCS_FAILED,
  UPDATE_COMPANY_DOCS_SUCCESS,
  UPDATE_COMPANY_DOCS_FAILED,
  DELETE_COMPANY_DOCS_SUCCESS,
  DELETE_COMPANY_DOCS_FAILED,
  UPDATE_EMPLOYEE_INFO_SUCCESS,
  UPDATE_EMPLOYEE_INFO_FAILED,
  DELETE_APPLICATION_SUCCESS,
  DELETE_APPLICATION_FAILED,
  UPDATE_APPLICATION_STATUS_SUCCESS,
  UPDATE_APPLICATION_STATUS_FAILED,
  ADD_CUSTOMER_LOGS_SUCCESS,
  ADD_CUSTOMER_LOGS_FAILED,
  ADD_PROPERTY_SUCCESS,
  ADD_PROPERTY_FAILED,
  DELETE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_FAILED,
  UPDATE_PROPERTY_SUCCESS,
  UPDATE_PROPERTY_FAILED,
  IMAGE_PROPERTY_SUCCESS,
  IMAGE_PROPERTY_FAILED,
  GET_CUSTOMER_LOGS_SUCCESS,
  GET_CUSTOMER_LOGS_FAILED,
} from "./type";

export const updateProfileEmployee = (employeeData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    await axios.post(
      `${api.BASE_URL}/update_one_employee_profile/`,
      employeeData,
      config
    );

    dispatch({ type: UPDATE_EMPLOYEE_PROFILE_SUCCESS });
    dispatch({ type: AUTHENTICATION_SUCCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: UPDATE_EMPLOYEE_PROFILE_FAILED });
    dispatch({ type: AUTHENTICATION_SUCCCESS });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    await axios.delete(`${api.BASE_URL}/delete_one_employee/${id}/`, config);
    dispatch({ type: DELETE_EMPLOYEE_PROFILE_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_EMPLOYEE_PROFILE_FAILED });
  }
};

export const updateProfile = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    await axios.post(`${api.BASE_URL}/update_user_image/`, data, config);
    dispatch({ type: UPDATE_USER_PROFILE_SUCCESS });
  } catch (error) {
    dispatch({ type: UPDATE_USER_PROFILE_FAILED });
  }
};

export const uploadCompanyFile = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios.post(`${api.BASE_URL}/upload_company_docs/`, data, config);
    dispatch({ type: COMPANY_DOCS_SUCCESS });
  } catch (error) {
    dispatch({ type: COMPANY_DOCS_FAILED });
  }
};

export const updateCompanyFile = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios.post(
      `${api.BASE_URL}/update_company_doc_status/`,
      data,
      config
    );
    dispatch({ type: UPDATE_COMPANY_DOCS_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: UPDATE_COMPANY_DOCS_FAILED });
  }
};

export const deleteCompanyFile = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios.delete(`${api.BASE_URL}/delete_company_doc/${id}/`, config);
    dispatch({ type: DELETE_COMPANY_DOCS_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: DELETE_COMPANY_DOCS_FAILED });
  }
};

export const updateEmployeeInfo = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios.post(`${api.BASE_URL}/update_one_employee/`, data, config);
    dispatch({ type: UPDATE_EMPLOYEE_INFO_SUCCESS });
  } catch (error) {
    dispatch({ type: UPDATE_EMPLOYEE_INFO_FAILED });
  }
};

export const deleteApplication = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios.delete(`${api.BASE_URL}/delete_one_application/${id}/`, config);
    dispatch({ type: DELETE_APPLICATION_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: DELETE_APPLICATION_FAILED });
  }
};

export const updateApplicationStatus = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios.post(
      `${api.BASE_URL}/update_status_application/`,
      data,
      config
    );
    dispatch({ type: UPDATE_APPLICATION_STATUS_SUCCESS });
  } catch (error) {
    dispatch({ type: UPDATE_APPLICATION_STATUS_FAILED });
  }
};

export const addCustomerLogs = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const { datas } = await axios.post(
      `${api.BASE_URL}/add_customer_logs/`,
      data,
      config
    );
    console.log(datas);
    dispatch({ type: ADD_CUSTOMER_LOGS_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: ADD_CUSTOMER_LOGS_FAILED });
  }
};

export const deleteLogs = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios.delete(`${api.BASE_URL}/delete_customer_log/${id}/`, config);
    dispatch({ type: DELETE_APPLICATION_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: DELETE_APPLICATION_FAILED });
  }
};

export const addProperty = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios.post(`${api.BASE_URL}/add_property/`, data, config);
    dispatch({ type: ADD_PROPERTY_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: ADD_PROPERTY_FAILED });
  }
};

export const deleteProperties = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios.delete(`${api.BASE_URL}/delete_property/${id}/`, config);
    dispatch({ type: DELETE_PROPERTY_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: DELETE_PROPERTY_FAILED });
  }
};

export const updateProperty = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios.post(`${api.BASE_URL}/update_property_info/`, data, config);
    dispatch({ type: UPDATE_PROPERTY_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: UPDATE_PROPERTY_FAILED });
  }
};

export const imageProperty = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios.post(`${api.BASE_URL}/update_property_image/`, data, config);
    dispatch({ type: IMAGE_PROPERTY_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: IMAGE_PROPERTY_FAILED });
  }
};
