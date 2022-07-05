import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserState } from "../../redux/user/selector/userSelector";
import {
  getRatingAvgState,
  getReviewsState,
} from "../../redux/user/selector/reviewSelector";
import { getUserInfo } from "../../redux/user/thunk/userThunk";
import { getUserReviews } from "../../redux/user/thunk/reviewThunk";
import UserInfo from "../../components/user/UserInfo";

import ReviewInsertDialog from "../../components/user/ReviewInsertDialog";
import Button from "@mui/material/Button";
import { openInsertModal } from "../../redux/common/slice/modalSlice";

function UserInfoPage() {
  const { uid } = useParams();
  const dispatch = useDispatch();

  const userInfo = useSelector(getUserState);
  const reviewList = useSelector(getReviewsState);

  useEffect(() => {
    dispatch(getUserInfo(uid));
  }, [uid, dispatch]);

  console.log(uid);
  console.log(userInfo);

  return (
    <div>
      <ReviewInsertDialog userInfo={userInfo} />
      <UserInfo userInfo={userInfo} reviewList={reviewList} uid={uid} />
    </div>
  );
}

export default UserInfoPage;
