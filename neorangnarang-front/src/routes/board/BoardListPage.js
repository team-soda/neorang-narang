import ListComponent from "../../components/board/ListComponent";
<<<<<<< HEAD
import React from "react";
import AlertComponent from "../../components/board/AlertComponent";
import MainMapComponent from "../../components/board/MainMapComponent";

const BoardListPage = () => {
  return (
    <div>
      <AlertComponent
        text={"검색 외에도 원하는 조건으로 필터를 적용할 수 있어요!"}
      />
      <MainMapComponent />
      <ListComponent />
    </div>
  );
=======
import Card from "@mui/material/Card";
import {Button, CardActions} from "@material-ui/core";
import React from "react";
import {Link} from "react-router-dom";

const BoardListPage = () => {

    return (
        <>
            <Card>
                <ListComponent/>
                <CardActions>
                    <Button color="secondary">
                        <Link to="/mainboard/register" style={{textDecoration: "none"}}>
                            새 글 쓰기
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        </>
    );
>>>>>>> 0242d8fdcd2c1d4261497f90bca975297ee2bf5b
};

export default BoardListPage;
