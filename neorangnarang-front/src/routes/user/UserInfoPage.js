import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserState } from "../../redux/user/selector/userSelector";
import { getReviewsState } from "../../redux/user/selector/reviewSelector";
import { getUserInfo } from "../../redux/user/thunk/userThunk";
import { getUserReviews } from "../../redux/user/thunk/reviewThunk";
import UserInfo from "../../components/user/UserInfo";

import ReviewInsertDialog from "../../components/user/ReviewInsertDialog";
import Button from "@mui/material/Button";

function UserInfoPage() {
  const { uid } = useParams();
  const dispatch = useDispatch();

  const userInfo = useSelector(getUserState);
  const reviewList = useSelector(getReviewsState);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserInfo(uid));
    dispatch(getUserReviews(uid));
  }, [uid, dispatch]);

  console.log(uid);
  console.log(userInfo);

  const onCloseHandler = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        리뷰남기기
      </Button>
      <ReviewInsertDialog
        open={open}
        onCloseHandler={onCloseHandler}
        userInfo={userInfo}
      />
      <UserInfo userInfo={userInfo} reviewList={reviewList} />
    </div>
  );
}

export default UserInfoPage;
