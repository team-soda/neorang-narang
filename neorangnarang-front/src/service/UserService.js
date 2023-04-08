import Axios, { imgAxios } from "../config/axios-config";

const AUTH = "/auth";
const USER = "/user";
const REVIEW = "/review";

/* 로그인 한 유저의 정보 */
const getAuthUserInfo = async () => {
  return await Axios.get(`${USER}`);
};

const getUserByUid = async (uid) => {
  console.log(`getUserByUid uid: ${uid}`);
  return await Axios.get(`${USER}/${uid}`);
};

const getUserByIdx = async (idx) => {
  return await Axios.get(`${USER}/getUserByIdx/${idx}`);
};

/* 마이페이지 */
const updateUser = async (userObj) => {
  return await imgAxios.put(`${USER}/update`, userObj);
};

const registerReview = async (reviewObj) => {
  return await Axios.post(`${REVIEW}`, reviewObj);
};

const getUserReviews = async (uid) => {
  return await Axios.get(`${REVIEW}/${uid}`);
};

const getReviewsByWriter = async (idx) => {
  return await Axios.get(`${REVIEW}/getReviewsByWriter/${idx}`);
};

const deleteReview = async (review) => {
  return await Axios.put(`${REVIEW}/deleteReview`, review);
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
    alert(error.response.data.error);
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
    response.status === 200 && alert("인증 성공");
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
  getUserByIdx,
  updateUser,
  registerReview,
  getUserReviews,
  getReviewsByWriter,
  deleteReview,
  login,
  logout,
  signup,
  sendAuthEmail,
  checkAuthCode,
};
