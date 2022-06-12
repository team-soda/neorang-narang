import Axios from "../../config/axios-config";

const getUserInfo = async (callback) => {
  return Axios.get("/auth/getUser").then((response) => {
    console.log(response);
    callback(response);
  });
};

const login = async (loginInfo) => {
  return Axios.post("/auth/signin", loginInfo).then((response) => {
    console.log(response);
    localStorage.setItem("accessToken", response.data.accessToken);
    window.location.replace("/");
  });
};

export const axiosService = {
  getUserInfo,
  login,
};
