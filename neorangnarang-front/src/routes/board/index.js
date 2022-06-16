import BoardListPage from "./BoardListPage";
import BoardReadPage from "./BoardReadPage";
import { Route, Routes } from "react-router-dom";
import BoardModifyPage from "./BoardModifyPage";
import BoardRegisterPage from "./BoardRegisterPage";
import { useState } from "react";

export default function BoardIndex({ boardList, setBoardList }) {
  const [boardDTO, setBoardDTO] = useState({});
  const [post, setPost] = useState({});
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <BoardListPage boardList={boardList} setBoardList={setBoardList} />
          }
        />
        <Route
          path="/list"
          element={
            <BoardListPage boardList={boardList} setBoardList={setBoardList} />
          }
        />
        <Route path="/register" element={<BoardRegisterPage />} />
        <Route
          path="/read/:board_idx"
          element={
            <BoardReadPage
              boardDTO={boardDTO}
              setBoardDTO={setBoardDTO}
              post={post}
              setPost={setPost}
            />
          }
        />
        <Route
          path="/modify/:board_idx"
          element={
            <BoardModifyPage
              boardDTO={boardDTO}
              setBoardDTO={setBoardDTO}
              post={post}
              setPost={setPost}
            />
          }
        />
      </Routes>
    </>
  );
}
