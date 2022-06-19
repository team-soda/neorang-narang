import {useEffect, useState} from "react";
import {userService} from "../service/UserService";
import AppRouter from "./AppRouter";
import NavBar from "./NavBar";
import {Container} from "@material-ui/core";

function App() {
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        localStorage.getItem("accessToken")
            ? userService.getUserInfo((res) => {
                setUserObj(res);
            })
            : setUserObj(null);
    }, [setUserObj]);

    console.log(userObj);

    return (
        <div className="App">
            <NavBar/>
            <Container maxWidth="lg" style={{backgroundColor:'#fbf7f2'}}>
            <AppRouter userObj={userObj} isLogin={Boolean(userObj)}/>
            </Container>
        </div>
    );
}

export default App;
