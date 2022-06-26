import { useCallback, useState } from "react";
import { Box, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  1: "완전 최악이에",
  2: "별로임",
  3: "보통이에요",
  4: "친절해요",
  5: "최고최고",
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
    <Box
      sx={{
        width: 300,
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
        //size="large"
      />
      {value !== null && (
        <Box sx={{ ml: 1 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}

export default StarRating;
