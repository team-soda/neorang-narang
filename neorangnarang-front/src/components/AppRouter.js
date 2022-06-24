import {useSelector} from "react-redux";
import {Routes, Route, Navigate} from "react-router-dom";
import {getIsLoginState} from "../redux/user/selector/authSelector";
import Home from "../routes/Home";
import GuestRouter from "./GuestRouter";
import UserRouter from "./UserRouter";
import BoardRouter from "../components/BoardRouter";
import MailerComponent from "./main/MailerComponent";

function AppRouter() {
    const isLogin = useSelector(getIsLoginState);

    console.log(isLogin);

    return (
        <Routes>
            <Route path="/mainboard/*" element={<BoardRouter/>}/>
            <Route
                path="/user/*"
                element={isLogin ? <UserRouter/> : <Navigate replace to="/"/>}
            />
            <Route
                path="/auth/*"
                element={isLogin ? <Navigate replace to="/"/> : <GuestRouter/>}
            />
            <Route path="/" element={<Home/>}/>
            <Route path="/contactUs" element={<MailerComponent/>}/>
        </Routes>
    );
}

export default AppRouter;
