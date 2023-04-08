import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useLocation } from "react-router-dom";
import { useCallback } from "react";
import { deleteReview } from "../../redux/user/thunk/reviewThunk";
import { API_BASE_URL } from "../../config/url-config";
import { getDefaultImgState } from "../../redux/user/selector/userSelector";

function ReviewItem({ reviewItem }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const defaultImg = useSelector(getDefaultImgState);
  const isReceived = useSelector((state) => state.review.isReceived);

  const { year, month, day } = reviewItem.created_at.date;
  const { hour, minute } = reviewItem.created_at.time;

  const onDeleteReviewHandler = useCallback(() => {
    dispatch(deleteReview(reviewItem));
  }, [dispatch, reviewItem]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      style={{ padding: "0 2rem", marginBottom: "1.5rem" }}
    >
      <Grid
        item
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ width: "100%" }}
      >
        <Grid item>
          <Box>
            {isReceived ? (
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <Avatar
                    src={
                      reviewItem.writer_profileImg
                        ? `${API_BASE_URL}/view/${reviewItem.writer_profileImg}`
                        : defaultImg
                    }
                    sx={{ width: 40, height: 40 }}
                  />
                </Grid>
                <Grid item sx={{ px: 2 }}>
                  <Typography fontSize={18}>
                    {reviewItem.writer_nickname}
                  </Typography>
                  <Typography
                    fontSize={12}
                    style={{ opacity: 0.5 }}
                  >{`${year}-${month}-${day}`}</Typography>
                </Grid>
              </Grid>
            ) : (
              `to : ${reviewItem.target_nickname}`
            )}
          </Box>
        </Grid>
        <Grid item>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating
              value={reviewItem.rating || 0}
              precision={0.5}
              defaultValue={0}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
              readOnly
            />
          </Box>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        //style={{ minHeight: "70px" }}
      >
        <Grid item style={{ maxWidth: "507px" }}>
          <Box
            sx={{
              px: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            {reviewItem.content}
          </Box>
        </Grid>
        {location.pathname === "/user/mypage" && !isReceived && (
          <Grid item>
            <IconButton onClick={onDeleteReviewHandler}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
      {/* <Grid item container justifyContent="flex-start">
        <Typography>{`${year}-${month}-${day}`}</Typography>
      </Grid> */}
    </Grid>
  );
}

export default ReviewItem;
