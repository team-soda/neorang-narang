import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Redirect from "../routes/user/OAuth2Redirect";
import SignIn from "../routes/user/SignIn";
import SignUp from "../routes/user/SignUp";
import Home from "../routes/Home";
import MyPage from "../routes/user/MyPage";

function AppRouter({ userObj, isLogin }) {
  return (
    <div>
      <Router>
        <Routes>
          {isLogin ? (
            <Route path="/user/mypage" element={<MyPage userObj={userObj} />} />
          ) : (
            <>
              <Route path="/oauth2/redirect" element={<Redirect />} />
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />
            </>
          )}
          <Route path="/" element={<Home userObj={userObj} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
