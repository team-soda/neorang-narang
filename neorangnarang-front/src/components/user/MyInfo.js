import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../config/url-config";
import { getUserReviews } from "../../redux/user/thunk/reviewThunk";
import { openProfileModal } from "../../redux/common/slice/modalSlice";
import { getDefaultImgState } from "../../redux/user/selector/authSelector";
import { getRatingAvgState } from "../../redux/user/selector/reviewSelector";
import ProfileUpdateModal from "./MyProfileUpdateModal";
import {
  Avatar,
  Box,
  ClickAwayListener,
  Grid,
  IconButton,
  Rating,
  Tooltip,
  Fade,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

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
      <Grid item container justifyContent="flex-end">
        <Tooltip
          title="프로필 수정"
          placement="top-end"
          TransitionComponent={Fade}
          arrow
        >
          <IconButton size="large" onClick={() => dispatch(openProfileModal())}>
            <FontAwesomeIcon icon={faPenToSquare} size="sm" />
          </IconButton>
        </Tooltip>
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
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography sx={{ fontSize: "1rem" }}>{authUser.nickname}</Typography>
        </Grid>
        <Grid item>
          <Typography
            sx={{ fontSize: "0.9rem", opacity: 0.5, letterSpacing: "0.2rem" }}
          >{`@${authUser.uid}`}</Typography>
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
    </Grid>
  );
}

export default MyInfo;
