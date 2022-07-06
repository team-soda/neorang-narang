import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openProfileModal } from "../../redux/common/slice/modalSlice";
import {
  getAuthState,
  getDefaultImgState,
} from "../../redux/user/selector/authSelector";
import { API_BASE_URL } from "../../config/url-config";
import ProfileUpdateModal from "./MyProfileUpdateModal";
import { Avatar, Chip, Grid } from "@mui/material";

function MyInfo() {
  const dispatch = useDispatch();
  const profileImgRef = useRef();

  const authUser = useSelector(getAuthState);
  const defaultImg = useSelector(getDefaultImgState);
  const profileOpen = useSelector((state) => state.modal.profileOpen);

  const [imgPreview, setImgPreview] = useState(null);

  const { profile_img, nickname } = authUser;

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
        <Grid item>
          <Avatar
              alt="프로필 사진"
              src={profile_img ? `${API_BASE_URL}/view/${profile_img}` : defaultImg}
              sx={{ width: 120, height: 120 }}
          />
        </Grid>
        <Grid item>
          <Chip
              label={nickname}
              variant="outlined"
              onClick={() => dispatch(openProfileModal())}
          />
          <ProfileUpdateModal
              open={profileOpen}
              authUser={authUser}
              profileImgRef={profileImgRef}
              onImageChangeHandler={onImageChangeHandler}
              onClearHandler={onClearHandler}
              imgPreview={imgPreview}
          />
        </Grid>
      </Grid>
  );
}

export default MyInfo;