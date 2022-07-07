import MyReviewItem from "./MyReviewItem";
import { ListItem } from "@mui/material";
import { FixedSizeList } from "react-window";

function reviewRow(props) {
  const { index, style, data } = props;

  return (
    <ListItem style={style} key={index} components="div" disablePadding>
      <MyReviewItem reviewItem={data[index]} />
    </ListItem>
  );
}

function MyReviews({ myReviewList }) {
  return (
    <FixedSizeList
      height={300}
      itemSize={100}
      itemCount={myReviewList.length}
      itemData={myReviewList}
      overscanCount={5}
    >
      {reviewRow}
    </FixedSizeList>
  );
}

export default MyReviews;
