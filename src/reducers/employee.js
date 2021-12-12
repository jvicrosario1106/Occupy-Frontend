import {
  UPDATE_EMPLOYEE_PROFILE_SUCCESS,
  UPDATE_EMPLOYEE_PROFILE_FAILED,
  DELETE_EMPLOYEE_PROFILE_SUCCESS,
  DELETE_EMPLOYEE_PROFILE_FAILED,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILED,
  UPLOAD_REQ_SUCCESS,
  UPLOAD_REQ_FAILED,
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
  DELETE_CUSTOMER_LOGS_SUCCESS,
  DELETE_CUSTOMER_LOGS_FAILED,
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
} from "../actions/type";

const initialState = {
  message: null,
  status: null,
  logs: [],
};

export const employeeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_EMPLOYEE_PROFILE_SUCCESS:
      return {
        ...state,
        message: "Success",
      };
    case UPDATE_EMPLOYEE_PROFILE_FAILED:
      return {
        state,
        message: "Failed",
      };
    case DELETE_EMPLOYEE_PROFILE_SUCCESS:
      return {
        ...state,
        message: "Success",
      };
    case DELETE_EMPLOYEE_PROFILE_FAILED:
      return {
        ...state,
        message: "Failed",
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        status: "Success",
      };
    case UPDATE_USER_PROFILE_FAILED:
      return {
        ...state,
        status: "Failed",
      };
    case UPLOAD_REQ_SUCCESS:
      return {
        ...state,
        status: "Success",
      };
    case UPLOAD_REQ_FAILED:
      return {
        ...state,
        status: "Failed",
      };
    case COMPANY_DOCS_SUCCESS:
      return {
        ...state,
        status: "Success",
      };
    case COMPANY_DOCS_FAILED:
      return {
        ...state,
        status: "Failed",
      };
    case UPDATE_COMPANY_DOCS_SUCCESS:
      return {
        ...state,
        status: "SuccessUpdate",
      };
    case UPDATE_COMPANY_DOCS_FAILED:
      return {
        ...state,
        status: "FailedUpdate",
      };
    case DELETE_COMPANY_DOCS_SUCCESS:
      return {
        ...state,
        status: "SuccessDeleted",
      };
    case DELETE_COMPANY_DOCS_FAILED:
      return {
        ...state,
        status: "FailedDeleted",
      };
    case UPDATE_EMPLOYEE_INFO_SUCCESS:
      return {
        ...state,
        status: "Success",
        message: "Succesfully Updated",
      };
    case UPDATE_EMPLOYEE_INFO_FAILED:
      return {
        ...state,
        status: "Failed",
        message: "Failed to Updated",
      };
    case DELETE_APPLICATION_SUCCESS:
      return {
        ...state,
        status: "SuccessDeletedApp",
        message: "Succesfully Deleted",
      };
    case DELETE_APPLICATION_FAILED:
      return {
        ...state,
        status: "FailedDeletedApp",
        message: "Failed to Delete",
      };
    case UPDATE_APPLICATION_STATUS_SUCCESS:
      return {
        ...state,
        status: "SuccessUpdatedApp",
        message: "Succesfully Updated",
      };
    case UPDATE_APPLICATION_STATUS_FAILED:
      return {
        ...state,
        status: "FailedUpdatedApp",
        message: "Failed to Update",
      };
    case ADD_CUSTOMER_LOGS_SUCCESS:
      return {
        ...state,
        status: "SuccessAddLogs",
        message: "Success to Update",
      };

    case ADD_CUSTOMER_LOGS_FAILED:
      return {
        ...state,
        status: "FailedAdd",
        message: "Failed to Update",
      };
    case DELETE_CUSTOMER_LOGS_SUCCESS:
      return {
        ...state,
        status: "SuccessDeleted",
        message: "Failed to Update",
      };

    case DELETE_CUSTOMER_LOGS_FAILED:
      return {
        ...state,
        status: "FailedDeleted",
        message: "Failed to Update",
      };
    case ADD_PROPERTY_SUCCESS:
      return {
        ...state,
        status: "SuccessAddProp",
        message: "Succesfully Added",
      };
    case ADD_PROPERTY_FAILED:
      return {
        ...state,
        status: "FailedAddProp",
        message: "Failed to Add",
      };
    case DELETE_PROPERTY_SUCCESS:
      return {
        ...state,
        status: "SuccessDeleteProp",
        message: "Succesfully Delete",
      };
    case DELETE_PROPERTY_FAILED:
      return {
        ...state,
        status: "FailedDeleteProp",
        message: "Failed to Delete",
      };
    case UPDATE_PROPERTY_SUCCESS:
      return {
        ...state,
        status: "SuccessUpdatedProp",
        message: "Succesfully Update",
      };
    case UPDATE_PROPERTY_FAILED:
      return {
        ...state,
        status: "FailedUpdateProp",
        message: "Failed to Update",
      };
    case IMAGE_PROPERTY_SUCCESS:
      return {
        ...state,
        status: "SuccessImageProp",
        message: "Succesfully Update",
      };
    case IMAGE_PROPERTY_FAILED:
      return {
        ...state,
        status: "FailedImageProp",
        message: "Failed to Update",
      };

    default:
      return {
        ...state,
      };
  }
};
