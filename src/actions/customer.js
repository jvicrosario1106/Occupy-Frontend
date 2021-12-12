import * as api from "../api";
import axios from "axios";
import {
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILED,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  AUTHENTICATION_SUCCCESS,
  CUSTOMER_PAYING_SUCCESS,
  CUSTOMER_PAYING_FAILED,
  UPDATE_RESEVATIONDETAILS_SUCCESS,
  UPDATE_RESEVATIONDETAILS_FAILED,
  UPLOAD_REQ_SUCCESS,
  UPLOAD_REQ_FAILED,
  UPLOAD_ID_SUCCESS,
  UPLOAD_ID_FAILED,
  PAYMENT_STATUS_SUCCESS,
  PAYMENT_STATUS_FAILED,
  UPLOAD_DELETE_SUCCESS,
  UPLOAD_DELETE_FAILED,
  UPDATE_DOCS_STATUS_SUCCESS,
  UPDATE_DOCS_STATUS_FAILED,
  ADD_IN_HOUSE_SUCCESS,
  ADD_IN_HOUSE_FAILED,
  APPLICATION_SUCCESS,
  APPLICATION_FAILED,
  DELETE_IN_HOUSE_SUCCESS,
  DELETE_IN_HOUSE_FAILED,
  UPDATE_IN_HOUSE_SUCCESS,
  UPDATE_IN_HOUSE_FAILED,
  UPDATE_PAYMENT_STATUS_SUCCESS,
  UPDATE_PAYMENT_STATUS_FAILED,
  UPDATE_APPLICATION_STATUS_FAILED,
  UPDATE_TO_SEEN_SUCCESS,
  UPDATE_TO_SEEN_FAILED,
  UPDATE_TO_SAVED_SUCCESS,
  UPDATE_TO_SAVED_FAILED,
  INVOICE_SUCCESS,
  INVOICE_FAILED,
  UPDATE_MESSAGE_SEEN_SUCCESS,
  UPDATE_MESSAGE_SEEN_FAILED,
  PROOF_SUCCESS,
  PROOF_FAILED,
  SEND_CANCEL_SUCCESS,
  SEND_CANCEL_FAILED,
} from "./type";

export const updateCustomer = (customerData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  const body = JSON.stringify(customerData);

  try {
    await axios.post(
      `${api.BASE_URL}/update_one_customer_reserved/`,
      body,
      config
    );

    dispatch({ type: UPDATE_CUSTOMER_SUCCESS });
    dispatch({ type: AUTHENTICATION_SUCCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: UPDATE_CUSTOMER_FAILED });
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
    await axios.delete(`${api.BASE_URL}/delete_one_customer/${id}/`, config);
    dispatch({ type: DELETE_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILED });
  }
};

//Customer Payments

export const paymentCustomer = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    await axios.post(`${api.BASE_URL}/customer_paying/`, data, config);
    dispatch({ type: CUSTOMER_PAYING_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: CUSTOMER_PAYING_FAILED });
  }
};

//Reservation Details
export const reservationDetails = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    await axios.post(
      `${api.BASE_URL}/update_reservation_details/`,
      data,
      config
    );
    dispatch({ type: UPDATE_RESEVATIONDETAILS_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: UPDATE_RESEVATIONDETAILS_FAILED });
  }
};

//Upload Req

export const uploadReq = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    await axios.post(`${api.BASE_URL}/upload_requirements/`, data, config);
    dispatch({ type: UPLOAD_REQ_SUCCESS });
  } catch (error) {
    dispatch({ type: UPLOAD_REQ_FAILED });
  }
};

export const deleteReq = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios.delete(`${api.BASE_URL}/delete_requirement/${id}/`, config);
    dispatch({ type: UPLOAD_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: UPLOAD_DELETE_FAILED });
  }
};

export const uploadId = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios.post(`${api.BASE_URL}/upload_id/`, data, config);
    dispatch({ type: UPLOAD_ID_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: UPLOAD_ID_FAILED });
  }
};

export const customerPaymentStatus = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios.post(`${api.BASE_URL}/update_payment_status/`, data, config);
    dispatch({ type: UPDATE_PAYMENT_STATUS_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: UPDATE_PAYMENT_STATUS_FAILED });
  }
};

export const customerDocStatus = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios.post(`${api.BASE_URL}/update_req_status/`, data, config);
    dispatch({ type: UPDATE_DOCS_STATUS_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: UPDATE_DOCS_STATUS_FAILED });
  }
};

export const customerInHouse = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  const body = JSON.stringify(data);
  try {
    await axios.post(`${api.BASE_URL}/add_in_house_ledger/`, body, config);
    dispatch({ type: ADD_IN_HOUSE_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: ADD_IN_HOUSE_FAILED });
  }
};

export const UpdatecustomerInHouse = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  const body = JSON.stringify(data);
  try {
    await axios.post(`${api.BASE_URL}/update_in_house_ledger/`, body, config);
    dispatch({ type: UPDATE_IN_HOUSE_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: UPDATE_IN_HOUSE_FAILED });
  }
};

export const DeletecustomerInHouse = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    await axios.delete(`${api.BASE_URL}/delete_in_house_ledger/${id}/`, config);
    dispatch({ type: DELETE_IN_HOUSE_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: DELETE_IN_HOUSE_FAILED });
  }
};

export const addApplication = (data) => async (dispatch) => {
  const config = {
    headers: { "Content-type": "application/json" },
  };

  // const body = JSON.stringify({ data: data, images: images });
  try {
    await axios.post(`${api.BASE_URL}/add_application/`, data, config);
    dispatch({ type: APPLICATION_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: APPLICATION_FAILED });
  }
};

export const updatecustomerPaymentStatus = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  // const body = JSON.stringify({ data: data, images: images });
  try {
    await axios.post(`${api.BASE_URL}/update_customer_payment/`, data, config);
    dispatch({ type: UPDATE_PAYMENT_STATUS_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: UPDATE_APPLICATION_STATUS_FAILED });
  }
};

export const updateToSeen = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  // const body = JSON.stringify({ data: data, images: images });
  try {
    await axios.post(`${api.BASE_URL}/update_to_seen/`, data, config);
    dispatch({ type: UPDATE_TO_SEEN_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: UPDATE_TO_SEEN_FAILED });
  }
};

export const MessageToSeen = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  // const body = JSON.stringify({ data: data, images: images });
  try {
    await axios.post(`${api.BASE_URL}/update_message_seen/`, data, config);
    dispatch({ type: UPDATE_MESSAGE_SEEN_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: UPDATE_MESSAGE_SEEN_FAILED });
  }
};

export const updateToSave = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  // const body = JSON.stringify({ data: data, images: images });
  try {
    await axios.post(`${api.BASE_URL}/save_notif/`, data, config);
    dispatch({ type: UPDATE_TO_SAVED_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: UPDATE_TO_SAVED_FAILED });
  }
};

export const sendInvoice = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  // const body = JSON.stringify({ data: data, images: images });
  try {
    await axios.get(`${api.BASE_URL}/send_email_invoice/${id}/`, config);
    dispatch({ type: INVOICE_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: INVOICE_FAILED });
  }
};

export const updateProof = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  // const body = JSON.stringify({ data: data, images: images });
  try {
    await axios.post(`${api.BASE_URL}/proof_payment_status/`, data, config);
    dispatch({ type: PROOF_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: PROOF_FAILED });
  }
};

export const sendCancel = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  // const body = JSON.stringify({ data: data, images: images });
  try {
    await axios.get(`${api.BASE_URL}/send_alert_cancelation/${id}/`, config);
    dispatch({ type: SEND_CANCEL_SUCCESS });
  } catch (error) {
    console.log({ ...error });
    dispatch({ type: SEND_CANCEL_FAILED });
  }
};
