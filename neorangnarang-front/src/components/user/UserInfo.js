import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../config/url-config";
import { getDefaultImgState } from "../../redux/user/selector/userSelector";
import { getRatingAvgState } from "../../redux/user/selector/reviewSelector";
import { getUserReviews } from "../../redux/user/thunk/reviewThunk";
import ReviewListDialog from "./ReviewListDialog.js";
import {
  Avatar,
  Box,
  ClickAwayListener,
  Grid,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ReviewInsertDialog from "./ReviewInsertDialog";

function UserInfo({ userInfo, reviewList /* , ratingAvg */, uid }) {
  const { profile_img } = userInfo;
  const dispatch = useDispatch();
  const defaultImg = useSelector(getDefaultImgState);
  const ratingAvg = useSelector(getRatingAvgState);

  const [isTooltip, setIsTooltip] = useState(false);

  useEffect(() => {
    dispatch(getUserReviews(uid));
  }, [dispatch, uid]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={2}
    >
      <Grid item container justifyContent="flex-end">
        <ReviewInsertDialog userInfo={userInfo} />
      </Grid>
      <Grid item>
        <Avatar
          alt="프로필 사진"
          src={profile_img ? `${API_BASE_URL}/view/${profile_img}` : defaultImg}
          sx={{ width: 150, height: 150 }}
        />
      </Grid>
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography sx={{ fontSize: "1rem" }}>{userInfo.nickname}</Typography>
          {/* 닉네임 :<span>{userInfo?.nickname}</span> */}
        </Grid>
        <Grid item>
          <Typography
            sx={{ fontSize: "0.9rem", opacity: 0.5, letterSpacing: "0.2rem" }}
          >{`@${userInfo.uid}`}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <ClickAwayListener onClickAway={() => setIsTooltip(false)}>
          <Tooltip
            title={ratingAvg || "아직 평가가 없어요."}
            onClose={() => setIsTooltip(false)}
            open={isTooltip}
            arrow
            disableFocusListener
          >
            <Box
              justifyContent="center"
              sx={{ display: "flex", alignItems: "center" }}
              onClick={() => setIsTooltip(true)}
            >
              <Rating
                value={ratingAvg || 0}
                precision={0.5}
                defaultValue={0}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
                size="large"
                readOnly
              />
            </Box>
          </Tooltip>
        </ClickAwayListener>
      </Grid>
      {/* <ReviewListDialog reviewList={reviewList} /> */}
    </Grid>
  );
}

export default UserInfo;
