import ListComponent from "../../components/board/ListComponent";
import React from "react";
import AlertComponent from "../../components/board/AlertComponent";
import MainMapComponent from "../../components/board/MainMapComponent";
import { Button, CardActions } from "@mui/material";
import { Link } from "react-router-dom";

const BoardListPage = () => {
  return (
    <div>
      <AlertComponent
        text={"검색 외에도 원하는 조건으로 필터를 적용할 수 있어요!"}
      />
      <MainMapComponent />
      <ListComponent />
      <CardActions>
        <Button color="secondary" to="/mainboard/register" component={Link}>
          {/* <Link to="/mainboard/register">새 글 쓰기</Link> */}새 글 쓰기
        </Button>
      </CardActions>
    </div>
  );
};

export default BoardListPage;
