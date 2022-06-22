import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserImgState,
  getUserFileNameState,
  getUserState,
} from "../../redux/user/selector/userSelector";
import { getUserImg } from "../../redux/user/thunk/userThunk";

function UserInfo() {
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserState);
  const fileName = useSelector(getUserFileNameState);
  const profileImgView = useSelector(getUserImgState);

  useEffect(() => {
    dispatch(getUserImg(fileName));
  }, [dispatch, fileName]);

  return (
    <div>
      {profileImgView ? (
        <div style={{ width: "100px", height: "100px" }}>
          <img
            src={profileImgView}
            alt="프로필 이미지"
            style={{ width: "100%" }}
          />
        </div>
      ) : (
        <div style={{ width: "100px", height: "100px" }}>
          <img
            src="https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png"
            alt="프로필 이미지"
            style={{ width: "100%" }}
          />
        </div>
      )}
      <div>
        닉네임 :
        <input type="text" name="nickname" value={userInfo.nickname} readOnly />
      </div>
    </div>
  );
}

export default UserInfo;
