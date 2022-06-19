import {Navigate, Route, Routes} from "react-router-dom";
import MyPage from "../routes/user/MyPage";

function UserRouter({ userObj, isLogin }) {
  return (
    <Routes>
      <Route path="/mypage" element={<MyPage userObj={userObj} />} />
    </Routes>
  );
}

export default UserRouter;
