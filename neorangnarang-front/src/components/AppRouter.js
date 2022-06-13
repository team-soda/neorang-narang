import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Redirect from "../routes/user/OAuth2Redirect";
import SignIn from "../routes/user/SignIn";
import SignUp from "../routes/user/SignUp";
import Home from "../routes/Home";

function AppRouter() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/oauth2/redirect" element={<Redirect />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
