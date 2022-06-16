import BoardListPage from "./BoardListPage";
import BoardReadPage from "./BoardReadPage";
import {Navigate, Route, Routes} from "react-router-dom";
import BoardModifyPage from "./BoardModifyPage";
import BoardRegisterPage from "./BoardRegisterPage";
import {useEffect, useState} from "react";
import {userService} from "../../../../2차백업/service/UserService";

export default function BoardIndex({boardList, setBoardList, isLogin}) {

    const [boardDTO, setBoardDTO] = useState({});

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <BoardListPage boardList={boardList} setBoardList={setBoardList}/>
                    }
                />
                <Route
                    path="/list"
                    element={
                        <BoardListPage boardList={boardList} setBoardList={setBoardList}/>
                    }
                />
                <Route path="/register" element={<BoardRegisterPage/>}/>
                <Route
                    path="/read/:board_idx"
                    element={
                        <BoardReadPage
                            boardDTO={boardDTO}
                            setBoardDTO={setBoardDTO}
                        />
                    }
                />
                <Route
                    path="/modify/:board_idx"
                    element={
                        <BoardModifyPage
                            boardDTO={boardDTO}
                            setBoardDTO={setBoardDTO}
                        />
                    }
                />
            </Routes>
        </>
    );
}
