import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Redirect from "../routes/user/Redirect";
import Login from "../routes/user/Login";
import Home from "../routes/Home";

function AppRouter() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/oauth2/redirect" element={<Redirect />} />
          <Route path="/auth/signin" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
