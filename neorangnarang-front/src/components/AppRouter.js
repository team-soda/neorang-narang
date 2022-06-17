import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../routes/Home";
import UserRouter from "./UserRouter";
import GuestRouter from "./GuestRouter";
import BoardRouter from "../components/BoardRouter";

function AppRouter({ authUser, isLogin }) {
  console.log(isLogin);

  return (
    <Router>
      <Routes>
        <Route
          path="/mainboard/*"
          element={<BoardRouter authUser={authUser} isLogin={isLogin} />}
        />
        <Route
          path="/user/*"
          element={
            isLogin ? (
              <UserRouter authUser={authUser} />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route
          path="/auth/*"
          element={isLogin ? <Navigate replace to="/" /> : <GuestRouter />}
        />
        <Route path="/" element={<Home authUser={authUser} />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
