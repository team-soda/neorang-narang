import Axios from "../config/axios-config";

const AUTH = "/auth";

const getUserInfo = async (callback) => {
  return Axios.get("/auth/getUser").then((response) => {
    console.log(response);
    callback(response);
  });
};

const login = async (loginObj) => {
  return Axios.post(`${AUTH}/signin`, loginObj).then((response) => {
    console.log(response);
    localStorage.setItem("accessToken", response.data.accessToken);
    window.location.replace("/");
  });
};

const logout = async () => {
  return Axios.get(`${AUTH}/logout`).then((response) => {
    console.log(response);
    localStorage.removeItem("accessToken");
    window.location.replace("/");
  });
};

const signup = async (signupObj) => {
  console.log(signupObj);
  return Axios.post(`${AUTH}/signup`, signupObj).then((response) =>
    console.log(response)
  );
};

export const userService = {
  getUserInfo,
  login,
  logout,
  signup,
};
