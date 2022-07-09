import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FixedSizeList } from "react-window";
import MyReviewItem from "./MyReviewItem";
import { ListItem } from "@mui/material";
import Loading from "./Loading";

function reviewRow(props) {
  const { index, style, data } = props;

  return (
    <ListItem style={style} key={index} components="div" disablePadding>
      <MyReviewItem reviewItem={data[index]} />
    </ListItem>
  );
}

function MyReviews({ myReviewList }) {
  const isLoading = useSelector((state) => state.review.isLoading);
  const [isList, setIsList] = useState(true);

  useEffect(() => {
    myReviewList.length > 0 ? setIsList(false) : setIsList(true);
  }, [myReviewList]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isList ? (
        "평가가 존재하지 않습니다."
      ) : (
        <FixedSizeList
          height={300}
          itemSize={100}
          itemCount={myReviewList.length}
          itemData={myReviewList}
          overscanCount={5}
        >
          {reviewRow}
        </FixedSizeList>
      )}
    </>
  );
}

export default MyReviews;
