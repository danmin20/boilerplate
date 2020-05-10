import Axios from "axios";
import { LOGIN_USER } from "./types";

export function loginUser(data) {
  const request = Axios.post("/api/user/login", data).then(
    (response) => response.data
  );
  return {
    type: "LOGIN_USER",
    payload: request,
  };
}
