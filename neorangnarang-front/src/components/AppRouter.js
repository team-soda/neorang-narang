import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../routes/Home";
import UserRouter from "./UserRouter";
import GuestRouter from "./GuestRouter";
import board from "../routes/board";
import BoardListPage from "../routes/board/BoardListPage";

function AppRouter({ userObj, isLogin }) {
  console.log(isLogin);

  return (
    <Router>
      <Routes>
        {/* <Route path="/mainboard/*" element={<BoardListPage />} /> */}
        <Route
          path="/user/*"
          element={
            isLogin ? (
              <UserRouter userObj={userObj} />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route
          path="/auth/*"
          element={isLogin ? <Navigate replace to="/" /> : <GuestRouter />}
        />
        <Route path="/" element={<Home userObj={userObj} />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
