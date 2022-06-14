import './App.css';
import NavBar from "./components/NavBar";
import AppRoutes from "./AppRoutes";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@emotion/react";
import theme from "./assets/theme"
import {useEffect, useState} from "react";
import {axiosUserService} from "./service/AxiosUserService";
import MailerComponent from "./components/board/MailerComponent";

function App() {
    const [userObj, setUserObj] = useState();

    useEffect(() => {
        localStorage.getItem("accessToken") &&
        axiosUserService.getUserInfo((res) => {
            setUserObj(res);
        });
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <NavBar/>
                <AppRoutes/>
                <MailerComponent/>
            </ThemeProvider>
        </>
    );
}

export default App;
