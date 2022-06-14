import ListComponent from "../../components/board/ListComponent";
import Card from "@mui/material/Card";
import SearchComponent from "../../components/board/SearchComponent";
import {Button, CardActions} from "@material-ui/core";
import React from "react";

const BoardListPage = ({location}) => {
    return (
        <>
            <Card>
                <SearchComponent/>
                <ListComponent location={location}/>
                <CardActions>
                    <Button color="secondary" href="/mainboard/register">새 글 쓰기</Button>
                </CardActions>
            </Card>
        </>
    );
};

export default BoardListPage;