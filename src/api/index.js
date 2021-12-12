import axios from "axios";

// axios.defaults.headers.common["Authorization"] = `JWT ${localStorage.getItem(
//   "access"
// )}`;
// para sa mga components or pages
export const baseUrl = axios.create({
  // baseURL: "https://occupydev.herokuapp.com/",
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-type": "application/json",
    Authorization: localStorage.getItem("access")
      ? `JWT ${localStorage.getItem("access")}`
      : null,
  },
});
// https://www.occupy-rem.com/
// base url para sa action
// export const BASE_URL = "https://occupydev.herokuapp.com";
export const BASE_URL = "http://localhost:8000";

// Inquiry
