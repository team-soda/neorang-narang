import { Route, Routes } from "react-router-dom";
import MyPage from "../routes/user/MyPage";
import UserInfoPage from "../routes/user/UserInfoPage";

function UserRouter() {
  return (
    <Routes>
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/info/:uid" element={<UserInfoPage />} />
    </Routes>
  );
}

export default UserRouter;
