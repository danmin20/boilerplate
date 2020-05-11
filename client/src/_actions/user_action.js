import Axios from "axios";
import { LOGIN_USER, REGISTER_USER } from "./types";

export function loginUser(data) {
  const request = Axios.post("/api/user/login", data).then(
    (response) => response.data
  );
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(data) {
  const request = Axios.post("/api/user/register", data).then(
    (response) => response.data
  );
  return {
    type: REGISTER_USER,
    payload: request,
  };
}
