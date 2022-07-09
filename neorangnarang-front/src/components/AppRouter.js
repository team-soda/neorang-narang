import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { getIsLoginState } from "../redux/user/selector/authSelector";

import GuestRouter from "./GuestRouter";
import UserRouter from "./UserRouter";
import BoardRouter from "../components/BoardRouter";
import ContactUs from "../routes/main/ContactUs";
import Home from "../routes/main/Home";

function AppRouter() {
  const isLogin = useSelector(getIsLoginState);

  console.log(isLogin);

  return (
    <Routes>
      <Route path="/mainboard/*" element={<BoardRouter />} />
      <Route
        path="/user/*"
        element={isLogin ? <UserRouter /> : <Navigate replace to="/" />}
      />
      <Route
        path="/auth/*"
        element={isLogin ? <Navigate replace to="/" /> : <GuestRouter />}
      />
      <Route path="/" element={<Home />} />
      <Route path="/contactUs" element={<ContactUs />} />
    </Routes>
  );
}

export default AppRouter;
