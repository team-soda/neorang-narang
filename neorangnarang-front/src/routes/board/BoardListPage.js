import ListComponent from "../../components/board/ListComponent";
import Card from "@mui/material/Card";
import SearchComponent from "../../components/board/SearchComponent";
import { Button, CardActions } from "@material-ui/core";
import React from "react";

const BoardListPage = ({ boardList, setBoardList }) => {
  return (
    <Card>
      <SearchComponent boardList={boardList} setBoardList={setBoardList} />
      <ListComponent boardList={boardList} setBoardList={setBoardList} />
      <CardActions>
        <Button color="secondary" href="/mainboard/register">
          새 글 쓰기
        </Button>
      </CardActions>
    </Card>
  );
};

export default BoardListPage;
