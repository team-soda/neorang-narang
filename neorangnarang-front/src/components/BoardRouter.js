import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getIsLoginState } from "../redux/user/selector/authSelector";
import BoardListPage from "../routes/board/BoardListPage";
import BoardReadPage from "../routes/board/BoardReadPage";
import BoardModifyPage from "../routes/board/BoardModifyPage";
import BoardRegisterPage from "../routes/board/BoardRegisterPage";

export default function BoardRouter() {
  const isLogin = useSelector(getIsLoginState);
  console.log(`BoardRouter isLogin : ${isLogin}`);

  return (
    <Routes>
      <Route path="/" element={<BoardListPage />} />
      <Route path="/list" element={<BoardListPage />} />
      <Route
        path="/register"
        element={
          isLogin ? (
            <BoardRegisterPage />
          ) : (
            <Navigate replace to="/auth/signin" />
          )
        }
      />
      <Route path="/read/:board_idx" element={<BoardReadPage />} />
      <Route path="/modify/:board_idx" element={<BoardModifyPage />} />
    </Routes>
  );
}
