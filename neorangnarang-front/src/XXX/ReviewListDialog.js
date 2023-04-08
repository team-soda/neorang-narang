import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
} from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeReadModal,
  openReadModal,
} from "../../redux/common/slice/modalSlice";
import { getUserState } from "../../redux/user/selector/userSelector";
import ReviewReadItem from "./ReviewReadItem";

function ReviewListDialog({ reviewList }) {
  const dispatch = useDispatch();
  const descriptionElementRef = useRef(null);
  const userInfo = useSelector(getUserState);
  const readOpen = useSelector((state) => state.modal.readOpen);

  useEffect(() => {
    if (readOpen) {
      const { current: desciptionElement } = descriptionElementRef;
      desciptionElement !== null && desciptionElement.focus();
    }
  }, [readOpen]);

  const onCloseHandler = useCallback(() => {
    dispatch(closeReadModal());
  }, [dispatch]);

  return (
    <>
      <Button onClick={() => dispatch(openReadModal())}>리뷰보기</Button>
      <Dialog
        open={readOpen}
        onClose={onCloseHandler}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">
          {userInfo.nickname} 님에 대한 평가
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <List>
              {reviewList &&
                reviewList.map((review) => (
                  <ReviewReadItem key={review.review_idx} reviewItem={review} />
                ))}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseHandler}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ReviewListDialog;
