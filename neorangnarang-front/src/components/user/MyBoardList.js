import { Box, Grid, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { AutoSizer } from "react-virtualized";
import { FixedSizeList } from "react-window";

function MyBoardList({ postList }) {
  console.log("MyBoardList");

  const rowRenderer = ({ index, style }) => {
    const post = postList[index];
    const { day, month, year } = post.created_at.date;

    console.log(post);

    return (
      <ListItem key={index} component="div" style={style} disablePadding>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item>
            <ListItemText>{post.board_idx}</ListItemText>
          </Grid>
          <Grid item>
            <ListItemText to={`/mainboard/read/${post.board_idx}`} as={Link}>
              {post.title}
            </ListItemText>
          </Grid>
          <Grid item>
            <ListItemText>{`${year}-${month}-${day}`}</ListItemText>
          </Grid>
        </Grid>
      </ListItem>
    );
  };
  return (
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
        <Grid item>번호</Grid>
        <Grid item>제목</Grid>
        <Grid item>작성일</Grid>
      </Grid>
      <Grid item sx={{ width: "100%", maxWidth: 668, height: 300 }}>
        <AutoSizer>
          {({ width, height }) => (
            <FixedSizeList
              height={height}
              width={width}
              itemSize={50}
              itemCount={postList.length}
              overscanCount={5}
            >
              {rowRenderer}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Grid>
    </Grid>
  );
}

export default MyBoardList;
