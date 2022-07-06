import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getUserState} from "../../redux/user/selector/userSelector";
import {getReviewsState,} from "../../redux/user/selector/reviewSelector";
import {getUserInfo} from "../../redux/user/thunk/userThunk";
import UserInfo from "../../components/user/UserInfo";

import ReviewInsertDialog from "../../components/user/ReviewInsertDialog";

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
