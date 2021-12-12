import { SEARCH_SUCCESS, SEARCH_FAILED } from "../actions/type";

export const SearchReducer = (search = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_SUCCESS:
      return payload;
    case SEARCH_FAILED:
      return search;
    default:
      return search;
  }
};
