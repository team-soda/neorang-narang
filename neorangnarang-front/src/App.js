import NavBar from "./components/NavBar";
import AppRoutes from "./AppRoutes";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import theme from "./assets/theme";
import { useEffect, useState } from "react";
import { userService } from "./service/UserService";
import MailerComponent from "./components/board/MailerComponent";

function App() {
  const [userObj, setUserObj] = useState();

  useEffect(() => {
    localStorage.getItem("accessToken") &&
      userService.getUserInfo((res) => {
        setUserObj(res);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <AppRoutes />
      <MailerComponent />
    </ThemeProvider>
  );
}

export default App;
