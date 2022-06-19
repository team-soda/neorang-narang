import Axios from "../config/axios-config";

const AUTH = "/auth";
const USER = "/user";

/* 로그인 한 유저의 정보 */
const getAuthUserInfo = async () => {
  return await Axios.get(`${USER}`);
};

const getUserByUid = async (uid) => {
  console.log(`getUserByUid uid: ${uid}`);
  return await Axios.get(`${USER}/${uid}`);
};

/* 마이페이지 */
const updateUser = async (userObj) => {
  return await Axios.put(`${USER}`, userObj);
};

const imgUpload = async () => {};

/* 인증 */
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

export const userService = {
  getAuthUserInfo,
  getUserByUid,
  updateUser,
  imgUpload,
  login,
  logout,
  signup,
  sendAuthEmail,
  checkAuthCode,
};
