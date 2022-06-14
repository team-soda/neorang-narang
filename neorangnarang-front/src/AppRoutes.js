import {BrowserRouter, Route, Routes} from "react-router-dom";
import BoardIndex from "./pages/board";
import Home from "./pages/Home";
import Redirect from "./pages/user/OAuth2Redirect";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/*<Route path="/" element={<BoardIndex />} />*/}
                <Route path="/" element={<Home />} />
                <Route path="/mainboard/*" element={<BoardIndex/>}/>

                <Route path="/oauth2/redirect" element={<Redirect />} />
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}