import { useState } from "react";
import { Box, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0.5: "완전 최악이에",
  1: "",
  1.5: "",
  2.0: "",
  2.5: "",
  3: "보통이에요",
  3.5: "",
  4: "",
  4.5: "",
  5: "최고최고",
};

const getLabelText = (value) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
};

function StarRating() {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  const onChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  const onChangeHoverActive = (event, newHover) => {
    setHover(newHover);
  };

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={onChangeValue}
        onChangeActive={onChangeHoverActive}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        defaultValue={0}
        size="large"
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}

export default StarRating;
