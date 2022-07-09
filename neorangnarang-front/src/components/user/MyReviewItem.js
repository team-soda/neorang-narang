import { Box, Grid, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";

function MyReviewItem({ reviewItem }) {
  const isReceived = useSelector((state) => state.review.isReceived);
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      style={{ padding: "0 2rem", marginBottom: "1.5rem" }}
    >
      <Grid item style={{ width: "100%" }}>
        <Box style={{ paddingLeft: "1.5rem" }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              {isReceived
                ? `from : ${reviewItem.writer_nickname}`
                : `to : ${reviewItem.target_nickname}`}
            </Box>
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
          <Box sx={{ height: "50px", display: "flex", alignItems: "center" }}>
            {reviewItem.content}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default MyReviewItem;
