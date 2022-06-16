import { Route, Routes } from "react-router-dom";
import Redirect from "../routes/user/OAuth2Redirect";
import SignIn from "../routes/user/SignIn";
import SignUp from "../routes/user/SignUp";
import {useState} from "react";

function GuestRouter() {

    return (
    <Routes>
        <Route path="/oauth2/redirect" element={<Redirect />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default GuestRouter;
