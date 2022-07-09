import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../config/url-config";
import { getDefaultImgState } from "../../redux/user/selector/userSelector";
import { getRatingAvgState } from "../../redux/user/selector/reviewSelector";
import { getUserReviews } from "../../redux/user/thunk/reviewThunk";
import ReviewListDialog from "./ReviewListDialog.js";
import { Avatar, Box, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

function UserInfo({ userInfo, reviewList /* , ratingAvg */, uid }) {
  const { profile_img } = userInfo;
  const dispatch = useDispatch();
  const defaultImg = useSelector(getDefaultImgState);
  const ratingAvg = useSelector(getRatingAvgState);

  useEffect(() => {
    dispatch(getUserReviews(uid));
  }, [dispatch, uid]);

  return (
    <div>
      <div>
        <Avatar
          alt="프로필 사진"
          src={profile_img ? `${API_BASE_URL}/view/${profile_img}` : defaultImg}
          sx={{ width: 120, height: 120 }}
        />
      </div>
      <div>
        닉네임 :<span>{userInfo?.nickname}</span>
      </div>
      <div>
        <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
          <Rating
            value={ratingAvg || 0}
            precision={0.5}
            defaultValue={0}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
            readOnly
          />
          <Box sx={{ ml: 2 }}>{ratingAvg || 0}</Box>
        </Box>
        <ReviewListDialog reviewList={reviewList} />
      </div>
    </div>
  );
}

export default UserInfo;
