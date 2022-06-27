import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../../service/UserService";

const REVIEW = "review";

export const registerReview = createAsyncThunk(
  `${REVIEW}/registerReview`,
  async (reviewObj) => {
    console.log("ㅠㅠㅠㅠㅠㅠㅠ");
    console.log(reviewObj);
    try {
      const response = await userService.registerReview(reviewObj);
      console.log(response.data.listData);
      alert("리뷰 작성 완료!");
      return response.data.listData;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const getUserReviews = createAsyncThunk(
  `${REVIEW}/getUserReviews`,
  async (uid) => {
    try {
      const response = await userService.getUserReviews(uid);
      console.log(response);
      return response.data.listData;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const getReviewer = createAsyncThunk(
  `${REVIEW}/getReviewer`,
  async (writerIdx) => {
    try {
      const response = await userService.getWriterInfo(writerIdx);
      console.log(response);
    } catch (error) {}
  }
);
