import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../../service/UserService";

const REVIEW = "review";

export const registerReview = createAsyncThunk(
  `${REVIEW}/registerReview`,
  async (reviewObj) => {
    try {
      const response = await userService.registerReview(reviewObj);
      alert("리뷰 작성 완료!");
      window.location.reload();
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
      return response.data.listData;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const getReviewsByWriter = createAsyncThunk(
  `${REVIEW}/getReviewsByWriter`,
  async (userIdx) => {
    try {
      const response = await userService.getReviewsByWriter(userIdx);
      return response.data.listData;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

export const deleteReview = createAsyncThunk(
  `${REVIEW}/deleteReview`,
  async (review) => {
    try {
      const response = await userService.deleteReview(review);
      return response.data.listData;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);
