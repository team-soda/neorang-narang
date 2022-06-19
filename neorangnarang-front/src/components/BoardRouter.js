import BoardListPage from "../routes/board/BoardListPage";
import BoardReadPage from "../routes/board/BoardReadPage";
import { Navigate, Route, Routes } from "react-router-dom";
import BoardModifyPage from "../routes/board/BoardModifyPage";
import BoardRegisterPage from "../routes/board/BoardRegisterPage";
import { useState } from "react";

export default function BoardRouter({ isLogin, userObj }) {
  const [boardDTO, setBoardDTO] = useState({});
  alert("board Router isLogin?? " + isLogin);

  return (
    <>
      <Routes>
        <Route path="/" element={<BoardListPage />} />
        <Route path="/list" element={<BoardListPage />} />
        <Route
          path="/register"
          element={
            isLogin ? (
              <BoardRegisterPage userObj={userObj} />
            ) : (
              <Navigate replace to="/auth/signin" />
            )
          }
        />
        <Route
          path="/read/:board_idx"
          element={
            isLogin ? (
              <BoardReadPage
                isLogin={isLogin}
                userObj={userObj}
                boardDTO={boardDTO}
                setBoardDTO={setBoardDTO}
              />
            ) : (
              <Navigate replace to="/auth/signin" />
            )
          }
        />
        <Route
          path="/modify/:board_idx"
          element={
            isLogin ? (
              <BoardModifyPage
                userObj={userObj}
                boardDTO={boardDTO}
                setBoardDTO={setBoardDTO}
              />
            ) : (
              <Navigate replace to="/auth/signin" />
            )
          }
        />
      </Routes>
    </>
  );
}
