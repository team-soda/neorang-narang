import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getReviewer } from "../../redux/user/thunk/reviewThunk";
import { getUserInfo } from "../../redux/user/thunk/userThunk";

function ReviewReadItem({ reviewItem }) {
  const dispatch = useDispatch();

  console.log("리뷰아이템~~~");
  console.log(reviewItem);
  return (
    <>
      <Box>
        <Grid>
          <Grid item>{reviewItem.writer_nickname}</Grid>
          <Grid item>{reviewItem.content}</Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ReviewReadItem;
