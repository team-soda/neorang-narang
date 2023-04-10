<<<<<<< HEAD
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../../config/url-config";
import { updateUser } from "../../redux/user/thunk/authThunk";
import { closeProfileModal } from "../../redux/common/slice/modalSlice";
=======
>>>>>>> 0242d8fdcd2c1d4261497f90bca975297ee2bf5b
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
<<<<<<< HEAD
import { EditImgButton } from "../../assets/custom/IconButton";
import { EditNameField } from "../../assets/custom/TextField";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

function ProfileUpdateModal({
  open,
  authUser,
  profileImgRef,
  onImageChangeHandler,
  onClearHandler,
  imgPreview,
  defaultImg,
}) {
  const { nickname, profile_img } = authUser;
=======
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../config/url-config";
import { closeProfileModal } from "../../redux/common/slice/modalSlice";
import { updateUser } from "../../redux/user/thunk/authThunk";

function ProfileUpdateModal({
                              open,
                              authUser,
                              profileImgRef,
                              onImageChangeHandler,
                              onClearHandler,
                              imgPreview,
                            }) {
  const { nickname, profile_img, defaultImg } = authUser;
>>>>>>> 0242d8fdcd2c1d4261497f90bca975297ee2bf5b
  const dispatch = useDispatch();
  //const profileOpen = useSelector((state) => state.modal.profileOpen);

  const [newName, setNewName] = useState(authUser && nickname);

  const onNameChangeHandler = useCallback(
      (event) => {
        console.log(newName);
        setNewName(event.target.value);
      },
      [newName]
  );

  const onUpdateSubmitHandler = useCallback(() => {
    const formData = new FormData();
    formData.append("profile_img", profileImgRef.current.files[0]);
    formData.append("nickname", newName);

    const updateObj = {
      file: formData.get("profile_img"),
      nickname: formData.get("nickname"),
    };

    dispatch(updateUser(updateObj));
    //setIsEdit(false);
    //navigate("/user/mypage", { replace: true });
  }, [newName, profileImgRef]);

  //const onSubmitHandler = () => {};

  const onCloseHandler = () => {
    onClearHandler();
    setNewName(nickname);
    dispatch(closeProfileModal());
  };

  return (
<<<<<<< HEAD
    <Dialog
      open={open}
      onClose={onCloseHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "400px",
          },
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item sx={{ px: 1.5 }}>
            <Typography variant="subtitle1">프로필 수정</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={onCloseHandler}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent id="alert-dialog-description">
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
=======
      <Dialog
          open={open}
          onClose={onCloseHandler}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">프로필 수정</DialogTitle>
        <DialogContent id="alert-dialog-description">
          <Grid>
>>>>>>> 0242d8fdcd2c1d4261497f90bca975297ee2bf5b
            <input
                ref={profileImgRef}
                onChange={onImageChangeHandler}
                name="profile_img"
                id="profile_img"
                type="file"
                accept="image/*"
            />
            <button onClick={onClearHandler}>취소</button>
            <Avatar
                alt="프로필 사진"
                src={
                  imgPreview ||
                  (profile_img ? `${API_BASE_URL}/view/${profile_img}` : defaultImg)
                }
                sx={{ width: 120, height: 120 }}
<<<<<<< HEAD
              />
              <div className="profileImg-overlay">
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ height: "100%" }}
                >
                  <EditImgButton onClick={() => profileImgRef.current.click()}>
                    <AddPhotoAlternateIcon sx={{ color: "white" }} />
                  </EditImgButton>
                </Grid>
              </div>
            </div>
          </Grid>
          <Grid item>
            <EditNameField
              type="text"
              label="닉네임"
              name="nickname"
              defaultValue={newName}
              onChange={onNameChangeHandler}
              margin="normal"
              variant="standard"
              color="warning"
              fullWidth
=======
>>>>>>> 0242d8fdcd2c1d4261497f90bca975297ee2bf5b
            />
          </Grid>
          <Grid>
            <input
                type="text"
                name="nickname"
                value={newName}
                onChange={onNameChangeHandler}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseHandler}>취소</Button>
          <Button onClick={onUpdateSubmitHandler} autoFocus>
            저장하기
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default ProfileUpdateModal;