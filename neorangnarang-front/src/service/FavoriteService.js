import Axios from "../config/axios-config";

const FAVORITE = "/favorite";

const insertFavorite = async (reqObj) => {
  try {
    await Axios.post(`${FAVORITE}/insertFavorite`, reqObj);
  } catch (err) {
    console.log(err);
  }
};

const getFavoriteListByUid = async (uid, callback) => {
  try {
    const res = await Axios.get(`${FAVORITE}/getFavoriteList/${uid}`);
    callback(res.data.listData);
  } catch (err) {
    console.log(err);
  }
};

const getFavoriteItem = async (reqObj, callback) => {
  try {
    const res = await Axios.get(`${FAVORITE}/getFavorite`, { params: reqObj });
    console.log(res);
    callback(res);
  } catch (err) {
    console.log(err);
  }
};

const deleteFavorite = async (reqObj) => {
  try {
    await Axios.delete(`${FAVORITE}/deleteFavorite`, {
      data: reqObj,
    });
  } catch (err) {
    console.log(err);
  }
};

export const favoriteService = {
  insertFavorite,
  getFavoriteListByUid,
  getFavoriteItem,
  deleteFavorite,
};
