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
} from "../actions/type";

const initialState = {
  message: null,
  status: null,
};

export const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_TASKS:
      return payload;
    case TASKS_CREATED_SUCCESS:
      return {
        ...state,
        status: "taskcreated",
      };
    case TASKS_CREATED_FAILED:
      return {
        ...state,
        status: "taskfailed",
      };
    case TASKS_ORDER_SUCCESS:
      return state;
    case TASKS_ORDER_FAILED:
      return state;
    case TASK_DELETED_SUCCESS:
      return {
        ...state,
        status: "taskdeleted",
      };
    case TASK_DELETED_FAILED:
      return {
        ...state,
        status: "taskdeletedfailed",
      };
    case TASKS_UPDATE_SUCCESS:
      return {
        ...state,
        status: "taskupdated",
      };
    case TASKS_UPDATE_FAILED:
      return {
        ...state,
        status: "taskupdatedfailed",
      };
    case UPDATE_TASK_ONE_SUCCESS:
      return state;
    case UPDATE_TASK_ONE_FAILED:
      return state;
    default:
      return state;
  }
};
