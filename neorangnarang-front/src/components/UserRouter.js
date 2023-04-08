import { Route, Routes } from "react-router-dom";
import UserInfoPage from "../routes/user/UserInfoPage";

function UserRouter() {
  return (
    <Routes>
      <Route path="/mypage" element={<UserInfoPage />} />
      <Route path="/:uid" element={<UserInfoPage />} />
    </Routes>
  );
}

export default UserRouter;
