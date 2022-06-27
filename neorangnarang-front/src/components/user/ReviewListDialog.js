import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
} from "@mui/material";
import { useEffect, useRef } from "react";
import ReviewReadItem from "./ReviewReadItem";

function ReviewListDialog({ open, onCloseHandler, reviewList }) {
  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: desciptionElement } = descriptionElementRef;
      desciptionElement !== null && desciptionElement.focus();
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        onClose={onCloseHandler}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
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
