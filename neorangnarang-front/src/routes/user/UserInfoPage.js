import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import UserInfo from "../../components/user/UserInfo";
import { getUserInfo } from "../../redux/user/thunk/userThunk";

function UserInfoPage() {
  const { uid } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo(uid));
  }, [uid, dispatch]);

  return (
    <>
      <UserInfo />
    </>
  );
}

export default UserInfoPage;
