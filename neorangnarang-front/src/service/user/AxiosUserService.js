import Axios from "../../config/axios-config";

const AUTH = "/auth";
const USER = "/user";

const getUserInfo = async (callback) => {
  return Axios.get(`${USER}/getUser`).then((response) => {
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
  return Axios.post(`${AUTH}/signup`, signupObj);
};

const sendAuthEmail = async (email) => {
  return Axios.post(`${AUTH}/signup/authEmailSend`, email).then((response) =>
    console.log(response)
  );
};

const checkAuthCode = async (emailCheckObj, callback) => {
  return Axios.post(`${AUTH}/signup/authCodeCheck`, emailCheckObj).then(
    (response) => {
      console.log(response);
      if (response.status === 200) {
        callback(true);
      }
    }
  );
};

export const axiosUserService = {
  getUserInfo,
  login,
  logout,
  signup,
  sendAuthEmail,
  checkAuthCode,
};
