import { createSlice } from "@reduxjs/toolkit";
import {
  deleteReview,
  getReviewsByWriter,
  getUserReviews,
  registerReview,
} from "../thunk/reviewThunk";

const reviewInitState = {
  review: {},
  reviewList: [],
  ratingAvg: 0,
  isLoading: true,
  isReceived: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState: reviewInitState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerReview.fulfilled, (state, { payload }) => {
        state.reviewList = payload;
      })
      .addCase(getUserReviews.pending, (state) => {
        state.isLoading = true;
        state.isReceived = false;
        state.reviewList = [];
      })
      .addCase(getUserReviews.fulfilled, (state, { payload }) => {
        state.reviewList = payload;
        const result = state.reviewList.reduce(
          (sum, current) => sum + current.rating,
          0
        );
        const avg = result / state.reviewList.length;
        const temp = Math.round((avg + Number.EPSILON) * 10) / 10;
        state.ratingAvg = temp;
        state.isLoading = false;
        state.isReceived = true;
      })
      .addCase(getUserReviews.rejected, (state) => {
        state.isLoading = true;
        state.isReceived = false;
      })
      .addCase(getReviewsByWriter.pending, (state) => {
        state.isLoading = true;
        state.reviewList = [];
      })
      .addCase(getReviewsByWriter.fulfilled, (state, { payload }) => {
        state.reviewList = payload;
        state.isLoading = false;
        state.isReceived = false;
      })
      .addCase(getReviewsByWriter.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReview.fulfilled, (state, { payload }) => {
        state.reviewList = payload;
      });
  },
});

export default reviewSlice.reducer;
