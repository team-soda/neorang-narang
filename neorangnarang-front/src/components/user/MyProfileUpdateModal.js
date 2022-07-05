import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
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
    <Dialog
      open={open}
      onClose={onCloseHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">프로필 수정</DialogTitle>
      <DialogContent id="alert-dialog-description">
        <Box>
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
          />
        </Box>
        <Box>
          <input
            type="text"
            name="nickname"
            value={newName}
            onChange={onNameChangeHandler}
          />
        </Box>
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
