import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserState } from "../../redux/user/selector/userSelector";
import { getUserInfo } from "../../redux/user/thunk/userThunk";
import UserInfo from "../../components/user/UserInfo";

function UserInfoPage() {
  const { uid } = useParams();
  const dispatch = useDispatch();

  const userInfo = useSelector(getUserState);

  useEffect(() => {
    dispatch(getUserInfo(uid));
  }, [uid, dispatch]);

  console.log(uid);
  console.log(userInfo);

  return (
    <>
      <UserInfo userInfo={userInfo} />
    </>
  );
}

export default UserInfoPage;
