import {Navigate, Route, Routes} from "react-router-dom";
import MyPage from "../routes/user/MyPage";

function UserRouter({ userObj, isLogin }) {
  return (
    <Routes>
      <Route path="/mypage" element={<MyPage userObj={userObj} />} />
      {/*<Route path="/mainboard/register" element={isLogin ? <BoardRegisterPage /> : (alert('로그인이 필요한 서비스입니다.')) (<Navigate replace to="/signin"/>)} />*/}
    </Routes>
  );
}

export default UserRouter;
