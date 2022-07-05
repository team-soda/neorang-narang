import ListComponent from "../../components/board/ListComponent";
import Card from "@mui/material/Card";
import SearchComponent from "../../components/board/SearchComponent";
import { Button, CardActions } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const BoardListPage = () => {
  return (
    <>
      <SearchComponent />
      <ListComponent />
      <Button color="secondary">
        <Link to="/mainboard/register" style={{ textDecoration: "none" }}>
          새 글 쓰기
        </Link>
      </Button>
    </>
  );
};

export default BoardListPage;
