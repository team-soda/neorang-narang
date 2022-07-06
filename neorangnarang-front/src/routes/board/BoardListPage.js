import ListComponent from "../../components/board/ListComponent";
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
};

export default BoardListPage;
