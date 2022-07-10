import { Box, Grid, Rating, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  1: "최악이에요",
  2: "별로예요",
  3: "보통이에요",
  4: "친절해요!",
  5: "당신은 최고!",
};

const getLabelText = (value) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
};

function StarRating({
  value,
  hover,
  onChangeValue,
  onChangeHoverActive,
  onSetRatingHandler,
}) {
  //console.log(value);
  return (
    <>
      {/* <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={onChangeValue}
        onChangeActive={onChangeHoverActive}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        defaultValue={0}
        size="large"
      />
      {value !== null && (
        <Box sx={{ ml: 1 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box> */}
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item>
          <Rating
            name="hover-feedback"
            value={value}
            precision={1}
            getLabelText={getLabelText}
            onChange={onChangeValue}
            onChangeActive={onChangeHoverActive}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
            defaultValue={0}
            //size="large"
            sx={{ fontSize: "2.5rem" }}
          />
        </Grid>
        <Grid item>
          {value !== null && (
            <Box sx={{ ml: 2 }}>
              <Typography variant="overline" sx={{ fontSize: "1rem" }}>
                {labels[hover !== -1 ? hover : value]}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default StarRating;
