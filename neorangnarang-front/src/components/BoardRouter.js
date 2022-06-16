import BoardListPage from "../routes/board/BoardListPage";
import BoardReadPage from "../routes/board/BoardReadPage";
import {Navigate, Route, Routes} from "react-router-dom";
import BoardModifyPage from "../routes/board/BoardModifyPage";
import BoardRegisterPage from "../routes/board/BoardRegisterPage";
import {useState} from "react";

export default function BoardRouter({isLogin}) {

    const [boardDTO, setBoardDTO] = useState({});

    return (
        <>
            <Routes>
                <Route path="/" element={<BoardListPage />}/>
                <Route path="/list" element={<BoardListPage />}/>
                <Route path="/register" element={ isLogin ? <BoardRegisterPage /> : <Navigate replace to="/auth/signin"/>}/>
                <Route path="/read/:board_idx" element={<BoardReadPage boardDTO={boardDTO} setBoardDTO={setBoardDTO}/>}/>
                <Route path="/modify/:board_idx" element={<BoardModifyPage boardDTO={boardDTO} setBoardDTO={setBoardDTO}/>}/>
            </Routes>
        </>
    );
}
