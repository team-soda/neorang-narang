import Axios, { imgAxios } from "../config/axios-config";

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
  return await imgAxios.put(`${USER}`, userObj);
};

/* 인증 */
const login = async (loginObj) => {
  return await Axios.post(`${AUTH}/signin`, loginObj);
};

const logout = async () => {
  return await Axios.get(`${AUTH}/logout`);
};

const signup = async (signupObj) => {
  console.log(signupObj);
  try {
    return await Axios.post(`${AUTH}/signup`, signupObj);
  } catch (error) {
    return error;
  }
};

const sendAuthEmail = async (email) => {
  try {
    const response = await Axios.post(`${AUTH}/signup/authEmailSend`, email);
    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const checkAuthCode = async (emailCheckObj) => {
  try {
    const response = await Axios.post(
      `${AUTH}/signup/authCodeCheck`,
      emailCheckObj
    );
    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    alert("인증코드가 일치하지 않습니다. ");
    return false;
  }
};

export const userService = {
  getAuthUserInfo,
  getUserByUid,
  updateUser,
  login,
  logout,
  signup,
  sendAuthEmail,
  checkAuthCode,
};
