import {
  LABEL_CREATED_SUCCESS,
  LABEL_CREATED_FAILED,
  GET_ALL_LABELS,
  DELETE_LABEL_SUCCESS,
  DELETE_LABEL_FAILED,
} from "../actions/type";

export const labelReducer = (labels = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_LABELS:
      return payload;
    case LABEL_CREATED_SUCCESS:
      return [payload, ...labels];
    case LABEL_CREATED_FAILED:
      return labels;
    case DELETE_LABEL_SUCCESS:
      return labels.filter((l) => l.id !== payload);
    case DELETE_LABEL_FAILED:
      return labels;
    default:
      return labels;
  }
};
