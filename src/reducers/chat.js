import {
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_FAILED,
  ADD_CONVO_SUCCESS,
  ADD_CONVO_FAILED,
} from "../actions/type";

const initialState = {
  status: null,
  message: null,
};

export const chatReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ADD_MESSAGE_SUCCESS:
      return {
        ...state,
        status: "Success",
      };
    case ADD_MESSAGE_FAILED:
      return {
        ...state,
        status: "Failed",
      };
    case ADD_CONVO_SUCCESS:
      return {
        ...state,
        status: "SuccessAdd",
      };
    case ADD_CONVO_FAILED:
      return {
        ...state,
        status: "FailedAdd",
      };
    default:
      return {
        state,
      };
  }
};
