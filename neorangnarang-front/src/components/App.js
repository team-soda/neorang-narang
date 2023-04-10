import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAuthUser} from "../redux/user/thunk/authThunk";
import {getAuthState} from "../redux/user/selector/authSelector";
import {Container, StylesProvider} from "@material-ui/core";
import AppRouter from "./AppRouter";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import "../assets/css/slick.css";
import "../assets/css/slick-theme.css";

function App() {
    const dispatch = useDispatch();
    const authUser = useSelector(getAuthState);

    useEffect(() => {
        sessionStorage.getItem("accessToken") && dispatch(getAuthUser());
    }, [dispatch]);

<<<<<<< HEAD
  console.log("App");
  console.log(authUser);
=======
    console.log(authUser);
>>>>>>> 0242d8fdcd2c1d4261497f90bca975297ee2bf5b

    return (
        <div className="App">
            <StylesProvider injectFirst>
                <Header/>
                <Container>
                    <AppRouter/>
                </Container>
                <Footer/>
            </StylesProvider>
        </div>
    );
}

export default App;
