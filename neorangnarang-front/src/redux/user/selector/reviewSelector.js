import { createSelector } from "@reduxjs/toolkit";

const getReviewsState = createSelector(
  (state) => state.review.reviewList,
  (reviewList) => reviewList
);

const getRatingAvgState = createSelector(
  (state) => state.review.ratingAvg,
  (ratingAvg) => ratingAvg
);

export { getReviewsState, getRatingAvgState };
