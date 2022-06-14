import BoardListPage from "./BoardListPage";
import BoardReadPage from "./BoardReadPage";
import {Route, Routes} from "react-router-dom";
import BoardModifyPage from "./BoardModifyPage";
import BoardRegisterPage from "./BoardRegisterPage";

export default function BoardIndex() {
    return (
        <>
            <Routes>
                <Route path="/" element={<BoardListPage/>}/>
                <Route path="/list" element={<BoardListPage/>}/>
                <Route path="/register" element={<BoardRegisterPage/>}/>
                <Route path="/read/:board_idx" element={<BoardReadPage/>}/>
                <Route path="/modify/:board_idx" element={<BoardModifyPage/>}/>
            </Routes>
        </>
    );
};