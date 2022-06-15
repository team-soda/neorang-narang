import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoardIndex from "./routes/board";
import Home from "./routes/Home";
import Redirect from "./routes/user/OAuth2Redirect";
import SignIn from "./routes/user/SignIn";
import SignUp from "./routes/user/SignUp";
import { useState } from "react";

export default function AppRoutes() {
  const [boardList, setBoardList] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<BoardIndex />} />*/}
        <Route path="/" element={<Home />} />
        <Route
          path="/mainboard/*"
          element={
            <BoardIndex boardList={boardList} setBoardList={setBoardList} />
          }
        />

        <Route path="/oauth2/redirect" element={<Redirect />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
