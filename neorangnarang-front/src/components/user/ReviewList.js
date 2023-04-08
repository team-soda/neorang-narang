import { useRef, useCallback } from "react";
import {
  CellMeasurerCache,
  CellMeasurer,
  AutoSizer,
  List,
} from "react-virtualized";
import { ListItem } from "@mui/material";
import ReviewItem from "./ReviewItem";

function ReviewList({ reviews }) {
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  const noRowsRenderer = () => {
    return <div>평가가 존재하지 않습니다.</div>;
  };

  const rowRenderer = useCallback(
    ({ index, key, parent, style }) => {
      return (
        <CellMeasurer
          key={key}
          cache={cache.current}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <ListItem style={style}>
            <ReviewItem reviewItem={reviews[index]} />
          </ListItem>
        </CellMeasurer>
      );
    },
    [reviews]
  );

  return (
    <div style={{ maxWidth: "716px", width: "100%", height: "500px" }}>
      <AutoSizer>
        {({ width, height }) => (
          <List
            height={height}
            width={width}
            rowCount={reviews.length}
            rowHeight={cache.current.rowHeight}
            rowRenderer={rowRenderer}
            deferredMeasurementCache={cache.current}
            noRowsRenderer={noRowsRenderer}
            //overscanRowCount={5}
          />
        )}
      </AutoSizer>
    </div>
  );
}

export default ReviewList;
