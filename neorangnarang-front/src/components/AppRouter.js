import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import Redirect from "../routes/Redirect";
import Signin from "../routes/Signin";

function AppRouter() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/oauth/redirect" element={<Redirect />} />
          <Route path="/oauth/signin" element={<Signin />} />
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
