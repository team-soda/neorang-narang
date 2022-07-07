import { Box, Grid, Rating } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getReviewer } from "../../redux/user/thunk/reviewThunk";
import { getUserInfo } from "../../redux/user/thunk/userThunk";
import StarIcon from "@mui/icons-material/Star";

function ReviewReadItem({ reviewItem }) {
  console.log("리뷰아이템~~~");
  console.log(reviewItem);
  return (
    <Box>
      <Grid>
        <Grid item sx={{ width: 200, display: "flex", alignItems: "center" }}>
          <Box sx={{ mr: 2 }}>{reviewItem.writer_nickname}</Box>
          <Rating
            value={reviewItem.rating || 0}
            precision={0.5}
            defaultValue={0}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
            readOnly
          />
        </Grid>
        <Grid item>{reviewItem.content}</Grid>
      </Grid>
    </Box>
  );
}

export default ReviewReadItem;
