import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState } from "../../redux/user/selector/authSelector";
import { getAuthUser } from "../../redux/user/thunk/authThunk";
import MyInfo from "../../components/user/MyInfo";

function MyPage() {
  const dispatch = useDispatch();
  const authUser = useSelector(getAuthState);

  console.log(authUser);

  useEffect(() => {
    dispatch(getAuthUser());
  }, [dispatch]);

  return (
    <div>
      <MyInfo />
    </div>
  );
}

export default MyPage;
