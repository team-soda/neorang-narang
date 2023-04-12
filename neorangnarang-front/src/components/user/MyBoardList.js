import { Grid, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { AutoSizer } from "react-virtualized";
import { FixedSizeList } from "react-window";

function MyBoardList({ list }) {
  const rowRenderer = ({ index, style }) => {
    const listItem = list[index];
    const { day, month, year } = listItem.created_at.date;

    return (
      <ListItem key={index} component="div" style={style} disablePadding>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item style={{ width: "10%" }}>
            <ListItemText>{listItem.board_idx}</ListItemText>
          </Grid>
          <Grid item style={{ width: "55%" }}>
            <ListItemText
              to={`/mainboard/read/${listItem.board_idx}`}
              as={Link}
            >
              {listItem.title}
            </ListItemText>
          </Grid>
          <Grid item style={{ width: "25%" }}>
            <ListItemText>{`${year}-${month}-${day}`}</ListItemText>
          </Grid>
          <Grid item style={{ width: "10%" }}>
            <ListItemText>{listItem.like_count}</ListItemText>
          </Grid>
        </Grid>
      </ListItem>
    );
  };
  return (
    <>
      {list.length === 0 ? (
        <h4>작성한 글이 없습니다.</h4>
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item style={{ width: "10%" }}>
              번호
            </Grid>
            <Grid item style={{ width: "55%" }}>
              제목
            </Grid>
            <Grid item style={{ width: "25%" }}>
              작성일
            </Grid>
            <Grid item style={{ width: "10%" }}>
              좋아요
            </Grid>
          </Grid>
          <Grid item sx={{ width: "100%", maxWidth: 668, height: 300 }}>
            <AutoSizer>
              {({ width, height }) => (
                <FixedSizeList
                  height={height}
                  width={width}
                  itemSize={50}
                  itemCount={list.length}
                  overscanCount={5}
                >
                  {rowRenderer}
                </FixedSizeList>
              )}
            </AutoSizer>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default MyBoardList;
