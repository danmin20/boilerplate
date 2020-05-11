import Axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types";

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

export function auth() {
  const request = Axios.get("/api/user/auth").then((response) => response.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = Axios.get("/api/user/logout").then(
    (response) => response.data
  );
  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
