import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../config/url-config";
import { openProfileModal } from "../../redux/common/slice/modalSlice";
import { getDefaultImgState } from "../../redux/user/selector/userSelector";
import { getRatingAvgState } from "../../redux/user/selector/reviewSelector";
import { getUserReviews } from "../../redux/user/thunk/reviewThunk";
import ReviewInsertDialog from "./ReviewInsertDialog";
import ProfileUpdateModal from "./MyProfileUpdateModal";
import {
  Avatar,
  Box,
  ClickAwayListener,
  Fade,
  Grid,
  IconButton,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function UserInfo({ userInfo, mypage }) {
  const { profile_img } = userInfo;
  const dispatch = useDispatch();
  const profileImgRef = useRef();

  const defaultImg = useSelector(getDefaultImgState);
  const profileOpen = useSelector((state) => state.modal.profileOpen);
  const ratingAvg = useSelector(getRatingAvgState);

  const [imgPreview, setImgPreview] = useState(null);
  const [isTooltip, setIsTooltip] = useState(false);

  useEffect(() => {
    dispatch(getUserReviews(userInfo.uid));
  }, [dispatch, userInfo.uid]);

  const onImageChangeHandler = useCallback(() => {
    const reader = new FileReader();
    const file = profileImgRef.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
  }, [profileImgRef, imgPreview]);

  const onClearHandler = () => {
    profileImgRef.current.value = null;
    setImgPreview(null);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={2}
    >
      <Grid item container justifyContent="flex-end">
        {mypage ? (
          <>
            <Tooltip
              title="프로필 수정"
              placement="top-end"
              TransitionComponent={Fade}
              arrow
            >
              <IconButton
                size="large"
                onClick={() => dispatch(openProfileModal())}
              >
                <FontAwesomeIcon icon={faPenToSquare} size="sm" />
              </IconButton>
            </Tooltip>
            <ProfileUpdateModal
              open={profileOpen}
              authUser={userInfo}
              profileImgRef={profileImgRef}
              onImageChangeHandler={onImageChangeHandler}
              onClearHandler={onClearHandler}
              imgPreview={imgPreview}
              defaultImg={defaultImg}
            />
          </>
        ) : (
          <ReviewInsertDialog userInfo={userInfo} />
        )}
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
