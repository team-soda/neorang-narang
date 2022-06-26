import { Box, Button, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../config/url-config";
import { getDefaultImgState } from "../../redux/user/selector/userSelector";
import ReviewListDialog from "./ReviewListDialog.js";
import StarIcon from "@mui/icons-material/Star";
import { getRatingAvgState } from "../../redux/user/selector/reviewSelector";
import { getUserReviews } from "../../redux/user/thunk/reviewThunk";

function UserInfo({ userInfo, reviewList }) {
  const { profile_img } = userInfo;
  const defaultImg = useSelector(getDefaultImgState);
  const ratingAvg = useSelector(getRatingAvgState);
  //const reviewList = useSelector(getUserReviews);
  //const ratingAvgString = ratingAvg.toString();

  const [open, setOpen] = useState(false);

  const onCloseHandler = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        <img
          src={profile_img ? `${API_BASE_URL}/view/${profile_img}` : defaultImg}
          alt="프로필 이미지"
          style={{ width: "150px" }}
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
        <Button onClick={() => setOpen(true)}>리뷰보기</Button>
        <ReviewListDialog
          open={open}
          onCloseHandler={onCloseHandler}
          reviewList={reviewList}
        />
      </div>
    </div>
  );
}

export default UserInfo;
