import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openProfileModal } from "../../redux/common/slice/modalSlice";
import {
  getAuthState,
  getDefaultImgState,
} from "../../redux/user/selector/authSelector";
import { API_BASE_URL } from "../../config/url-config";
import ProfileUpdateModal from "./MyProfileUpdateModal";
import { getUserReviews } from "../../redux/user/thunk/reviewThunk";
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Grid,
  Rating,
  Tooltip,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { getRatingAvgState } from "../../redux/user/selector/reviewSelector";

function MyInfo({ authUser }) {
  const dispatch = useDispatch();
  const profileImgRef = useRef();

  const defaultImg = useSelector(getDefaultImgState);
  const profileOpen = useSelector((state) => state.modal.profileOpen);
  const ratingAvg = useSelector(getRatingAvgState);

  const [imgPreview, setImgPreview] = useState(null);
  const [isTooltip, setIsTooltip] = useState(false);

  useEffect(() => {
    dispatch(getUserReviews(authUser.uid));
  }, [dispatch, authUser.uid]);

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

  console.log("mypage myinfo");
  console.log(authUser);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Avatar
          alt="프로필 사진"
          src={
            authUser.profile_img
              ? `${API_BASE_URL}/view/${authUser.profile_img}`
              : defaultImg
          }
          sx={{ width: 150, height: 150 }}
        />
      </Grid>
      <Grid item>
        <Chip
          label={authUser.nickname}
          variant="outlined"
          sx={{ minWidth: 150, py: 2, fontSize: 14, letterSpacing: 1 }}
          onClick={() => dispatch(openProfileModal())}
        />
        <ProfileUpdateModal
          open={profileOpen}
          authUser={authUser}
          profileImgRef={profileImgRef}
          onImageChangeHandler={onImageChangeHandler}
          onClearHandler={onClearHandler}
          imgPreview={imgPreview}
          defaultImg={defaultImg}
        />
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
    </Grid>
  );
}

export default MyInfo;
