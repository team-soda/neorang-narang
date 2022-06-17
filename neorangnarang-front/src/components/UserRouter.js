import { Route, Routes } from "react-router-dom";
import MyPage from "../routes/user/MyPage";

function UserRouter({ authUser }) {
  return (
    <Routes>
      <Route path="/mypage/:uid" element={<MyPage authUser={authUser} />} />
    </Routes>
  );
}

export default UserRouter;
