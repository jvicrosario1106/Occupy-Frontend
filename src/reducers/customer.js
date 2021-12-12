import {
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILED,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
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
  UPDATE_DOCS_STATUS_FAILED,
  UPDATE_DOCS_STATUS_SUCCESS,
  ADD_IN_HOUSE_SUCCESS,
  ADD_IN_HOUSE_FAILED,
  APPLICATION_SUCCESS,
  APPLICATION_FAILED,
  UPDATE_IN_HOUSE_SUCCESS,
  UPDATE_IN_HOUSE_FAILED,
  DELETE_IN_HOUSE_SUCCESS,
  DELETE_IN_HOUSE_FAILED,
  UPDATE_PAYMENT_STATUS_SUCCESS,
  UPDATE_PAYMENT_STATUS_FAILED,
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
  SEND_CANCEL_FAILED,
  SEND_CANCEL_SUCCESS,
} from "../actions/type";

const initialState = {
  message: null,
  status: null,
};

export const customerReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case APPLICATION_SUCCESS:
      return {
        ...state,
        status: "SuccessApplication",
        message: "Successfully Submitted your application",
      };
    case APPLICATION_FAILED:
      return {
        ...state,
        status: "FailedApplication",
        message:
          "Failed to Submit your application. Please Review your Application and Check if there is a value that needs to be Change",
      };
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,

        message: "Success",
      };
    case UPDATE_CUSTOMER_FAILED:
      return {
        state,
        message: "Failed",
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        message: "Success",
      };
    case DELETE_USER_FAILED:
      return {
        ...state,
        message: "Failed",
      };
    case CUSTOMER_PAYING_SUCCESS:
      return {
        ...state,
        status: "Payment Success",
      };
    case CUSTOMER_PAYING_FAILED:
      return {
        ...state,
        status: "Payment Failed",
      };
    case UPDATE_RESEVATIONDETAILS_SUCCESS:
      return {
        ...state,
        status: "successreserved",
        message: "SuccessReserved",
      };
    case UPDATE_RESEVATIONDETAILS_FAILED:
      return {
        ...state,
        status: "failedreserved",
        message: "FailedReserved",
      };
    case UPLOAD_REQ_SUCCESS:
      return {
        ...state,
        status: "Success",
        message: "Successfully upload a requirements",
      };
    case UPLOAD_REQ_FAILED:
      return {
        ...state,
        status: "Failed",
        message: "Please Try Again",
      };
    case UPLOAD_ID_SUCCESS:
      return {
        ...state,
        status: "SuccessID",
        message: "Successfully upload ID",
      };
    case UPLOAD_ID_FAILED:
      return {
        ...state,
        status: "FailedID",
        message: "Please Try Again",
      };
    case PAYMENT_STATUS_SUCCESS:
      return {
        ...state,
        status: "Success",
        message: "Successfully upload ID",
      };
    case PAYMENT_STATUS_FAILED:
      return {
        ...state,
        status: "Failed",
        message: "Please Try Again",
      };
    case UPLOAD_DELETE_SUCCESS:
      return {
        status: "DeleteUploadSuccess",
        message: "Successfully Delete File",
      };
    case UPLOAD_DELETE_FAILED:
      return {
        status: "DeleteUploadFailed",
        message: "Failed to Delete File",
      };
    case UPDATE_DOCS_STATUS_SUCCESS:
      return {
        status: "Successfully Updated",
        message: "Successfully Updated",
      };
    case UPDATE_DOCS_STATUS_FAILED:
      return {
        status: "Failed to Update",
        message: "Failed to Update",
      };
    case ADD_IN_HOUSE_SUCCESS:
      return {
        status: "SuccessHouseAdd",
        message: "Successfully Added",
      };
    case ADD_IN_HOUSE_FAILED:
      return {
        status: "FailedHouseAdd",
        message: "Failed to Add",
      };
    case UPDATE_IN_HOUSE_SUCCESS:
      return {
        status: "SuccessHouseUpdate",
        message: "Successfully Updated",
      };
    case UPDATE_IN_HOUSE_FAILED:
      return {
        status: "FailedHouseUpdate",
        message: "Failed to Update",
      };
    case DELETE_IN_HOUSE_SUCCESS:
      return {
        status: "SuccessHouse",
        message: "Successfully Deleted",
      };
    case DELETE_IN_HOUSE_FAILED:
      return {
        status: "FailedHouse",
        message: "Failed to Delete",
      };

    case UPDATE_PAYMENT_STATUS_SUCCESS:
      return {
        status: "SuccessUpdateStatus",
        message: "Successfully Update",
      };
    case UPDATE_PAYMENT_STATUS_FAILED:
      return {
        status: "FailedUpdateStatus",
        message: "Failed to Update",
      };
    case UPDATE_TO_SEEN_SUCCESS:
      return {
        status: "SuccessUpdateSeen",
        message: "Successfully Update",
      };
    case UPDATE_TO_SEEN_FAILED:
      return {
        status: "FailedUpdateSeen",
        message: "Failed to Update",
      };
    case UPDATE_TO_SAVED_SUCCESS:
      return {
        status: "SuccessUpdateSave",
        message: "Successfully Update",
      };
    case UPDATE_TO_SAVED_FAILED:
      return {
        status: "FailedUpdateSave",
        message: "Failed to Update",
      };
    case INVOICE_SUCCESS:
      return {
        status: "invoicesuccess",
      };
    case INVOICE_FAILED:
      return {
        status: "invoicefailed",
      };

    case UPDATE_MESSAGE_SEEN_SUCCESS:
      return {
        status: "SuccessUpdateSave",
        message: "Successfully Update",
      };
    case UPDATE_MESSAGE_SEEN_FAILED:
      return {
        status: "FailedUpdateSave",
        message: "Failed to Update",
      };
    case PROOF_SUCCESS:
      return {
        ...state,
        status: "ProofSuccess",
      };
    case PROOF_FAILED:
      return {
        ...state,
        status: "ProofFailed",
      };
    case SEND_CANCEL_SUCCESS:
      return {
        ...state,
        status: "SuccessCancel",
      };
    case SEND_CANCEL_FAILED:
      return {
        ...state,
        status: "FailedCancel",
      };
    default:
      return {
        ...state,
      };
  }
};
