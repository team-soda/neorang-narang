import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerReview } from "../../redux/user/thunk/reviewThunk";
import { getAuthState } from "../../redux/user/selector/authSelector";
import {
  closeInsertModal,
  openInsertModal,
} from "../../redux/common/slice/modalSlice";
import StarRating from "./StarRating";
import {
  TextField,
  Button,
  IconButton,
  Tooltip,
  Fade,
  Grid,
} from "@mui/material";
import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from "../../assets/custom/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

function ReviewInsertDialog({ userInfo }) {
  const dispatch = useDispatch();
  const insertOpen = useSelector((state) => state.modal.insertOpen);
  const authUser = useSelector(getAuthState);

  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [content, setContent] = useState("");

  const onChangeValue = useCallback(
    (event, newValue) => {
      setValue(newValue);
    },
    [value]
  );

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

  return (
    <>
      <Tooltip
        title="리뷰작성"
        placement="top-end"
        TransitionComponent={Fade}
        arrow
      >
        <IconButton size="large" onClick={() => dispatch(openInsertModal())}>
          <RateReviewOutlinedIcon sx={{ fontSize: "0.875em" }} />
        </IconButton>
      </Tooltip>
      <BootstrapDialog
        onClose={() => dispatch(closeInsertModal())}
        aria-labelledby="customized-dialog-title"
        open={insertOpen}
        fullWidth
        maxWidth="sm"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={() => dispatch(closeInsertModal())}
        >
          {userInfo.nickname} 님을 평가해 주세요!
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid
            container
            direction="column"
            //justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item style={{ maxWidth: "500px", width: "100%" }}>
              <StarRating
                value={value}
                hover={hover}
                onChangeValue={onChangeValue}
                onChangeHoverActive={onChangeHoverActive}
              />
            </Grid>
            <Grid item style={{ maxWidth: "500px", width: "100%" }}>
              <TextField
                name="content"
                value={content}
                onChange={onChangeContentHandler}
                margin="normal"
                multiline
                rows={4}
                placeholder="악성 리뷰는 무통보 삭제될 수 있습니다."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onSubmitHandler}>
            작성하기
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default ReviewInsertDialog;
