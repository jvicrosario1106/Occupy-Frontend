import {
  CREATE_SUCCESS,
  CREATE_FAILED,
  DELETE_SUCCESS,
  DELETE_FAILED,
  ASSIGN_SUCCESS,
  ASSIGN_FAILED,
} from "../actions/type";

const initialState = {
  status: null,
  message: null,
};

export const inquiryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_SUCCESS:
      return {
        ...state,
        status: "Success",
        message:
          "Successfully Submitted your Inquiries. Please Wait to process it.",
      };
    case CREATE_FAILED:
      return {
        status: "Failed",
        message: payload,
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        status: "Success",
        message: "Successfully delete the Inquiry. Please Wait to process it.",
      };
    case DELETE_FAILED:
      return {
        ...state,
        status: "Failed",
        message: "Failed to delete the Inquiries. Please Try Again",
      };
    case ASSIGN_SUCCESS:
      return {
        ...state,
        status: "SuccessAssign",
        message: "Successfully assign the Inquiry. Please Wait to process it.",
      };
    case ASSIGN_FAILED:
      return {
        ...state,
        status: "FailedAssign",
        message: "Failed to assign the Inquiry. Please Try Again",
      };
    default:
      return {
        state,
      };
  }
};
