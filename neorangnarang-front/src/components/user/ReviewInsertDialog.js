import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUserState } from "../../redux/user/selector/userSelector";
import { getUserInfo } from "../../redux/user/thunk/userThunk";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import StarRating from "./StarRating";
import { Box, TextField } from "@mui/material";
import { getAuthState } from "../../redux/user/selector/authSelector";
import {
  getUserReviews,
  registerReview,
} from "../../redux/user/thunk/reviewThunk";
import {
  closeInsertModal,
  closeModal,
  openInsertModal,
  openModal,
} from "../../redux/common/slice/modalSlice";
import { getRatingAvgState } from "../../redux/user/selector/reviewSelector";

function ReviewInsertDialog({ /* open, */ /* onCloseHandler, */ userInfo }) {
  const { uid } = useParams();
  const dispatch = useDispatch();
  const ratingAvg = useSelector(getRatingAvgState);
  const insertOpen = useSelector((state) => state.modal.insertOpen);
  const navigate = useNavigate();
  //const reviewIdxRef = useRef(1);

  //const userInfo = useSelector(getUserState);
  const authUser = useSelector(getAuthState);

  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  //const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  /* useEffect(() => {
    dispatch(getUserInfo(uid));
  }, [dispatch, uid]); */

  const onChangeValue = useCallback(
    (event, newValue) => {
      //console.log(newValue);
      setValue(newValue);
    },
    [value]
  );
  console.log(`보자보자 ${value}`);

  const onChangeHoverActive = useCallback(
    (event, newHover) => {
      setHover(newHover);
    },
    [hover]
  );

  const onChangeContentHandler = (event) => {
    setContent(event.target.value);
  };

  const onSubmitHandler = () => {
    console.log(content);
    const reviewObj = {
      writer_idx: authUser.user_idx,
      target_idx: userInfo.user_idx,
      content,
      rating: value,
      writer_display: false,
    };
    console.log(reviewObj);
    dispatch(registerReview(reviewObj));
    setValue(0);
    setContent("");
    dispatch(closeInsertModal());
  };

  /* const onCloseHandler = useCallback(() => {
    dispatch(closeInsertModal());
  }, [dispatch]); */

  return (
    <>
      <Button variant="outlined" onClick={() => dispatch(openInsertModal())}>
        리뷰남기기
      </Button>
      <BootstrapDialog
        onClose={() => dispatch(closeInsertModal())}
        aria-labelledby="customized-dialog-title"
        open={insertOpen}
        fullWidth
        maxWidth="sm"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClick={() => dispatch(closeInsertModal())}
        >
          {userInfo.nickname} 님을 평가해 주세요!
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ backgroundColor: "white" }}>
          <Box noValidate autoComplete="off">
            <StarRating
              value={value}
              hover={hover}
              onChangeValue={onChangeValue}
              onChangeHoverActive={onChangeHoverActive}
            />
            <TextField
              name="content"
              value={content}
              onChange={onChangeContentHandler}
              margin="normal"
              multiline
              rows={4}
              placeholder="악성 리뷰는 무통보 삭제될 수 있습니다."
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "white" }}>
          <Button autoFocus onClick={onSubmitHandler}>
            작성하기
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default ReviewInsertDialog;
