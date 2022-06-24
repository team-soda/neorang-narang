import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../config/url-config";
import { getDefaultImgState } from "../../redux/user/selector/userSelector";
import StarRating from "./StarRating";

function UserInfo({ userInfo }) {
  const { profile_img } = userInfo;
  const defaultImg = useSelector(getDefaultImgState);

  return (
    <div>
      <div>
        <img
          src={profile_img ? `${API_BASE_URL}/user/${profile_img}` : defaultImg}
          alt="프로필 이미지"
          style={{ width: "150px" }}
        />
      </div>
      <div>
        닉네임 :<span>{userInfo?.nickname}</span>
      </div>
      <div>
        <StarRating />
      </div>
    </div>
  );
}

export default UserInfo;
