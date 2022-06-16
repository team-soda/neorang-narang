import {useEffect, useState} from "react";
import {userService} from "../service/UserService";
import AppRouter from "./AppRouter";
import NavBar from "./NavBar";

function App() {
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        localStorage.getItem("accessToken")
            ? userService.getUserInfo((res) => {
                setUserObj(res);
            })
            : setUserObj(null);
    }, []);

    console.log(userObj);

    return (
        <div className="App">
            <NavBar/>
            <AppRouter userObj={userObj} isLogin={Boolean(userObj)}/>
        </div>
    );
}

export default App;
