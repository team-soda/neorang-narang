import { createSlice } from "@reduxjs/toolkit";
import { getUserReviews, registerReview } from "../thunk/reviewThunk";

const reviewInitState = {
  review: {},
  reviewList: [],
  ratingAvg: 0,
};

const reviewSlice = createSlice({
  name: "review",
  initialState: reviewInitState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerReview.fulfilled, (state, { payload }) => {
        //console.log(payload);
        state.reviewList = payload;
        console.log(state.reviewList);
      })
      .addCase(getUserReviews.fulfilled, (state, { payload }) => {
        console.log("리뷰가져오는슬라이스");
        //console.log(payload);
        state.reviewList = payload;
        const result = state.reviewList.reduce(
          (sum, current) => sum + current.rating,
          0
        );
        const avg = result / state.reviewList.length;
        const temp = Math.round((avg + Number.EPSILON) * 10) / 10;
        state.ratingAvg = temp;
        //console.log(temp);
      });
  },
});

export default reviewSlice.reducer;
