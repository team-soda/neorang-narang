import { useEffect, useState } from "react";
import { userService } from "../service/UserService";
import AppRouter from "./AppRouter";
import NavBar from "./NavBar";
import { Container } from "@material-ui/core";

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    localStorage.getItem("accessToken")
      ? userService.getAuthUserInfo().then((response) => {
          console.log(response);
          setAuthUser(response.data.user);
        })
      : setAuthUser(null);
  }, [setAuthUser]);

  console.log(authUser);

  return (
    <div className="App">
      <NavBar />
      <Container maxWidth="md" style={{ backgroundColor: "#fbf7f2" }}>
        <AppRouter authUser={authUser} isLogin={Boolean(authUser)} />
      </Container>
    </div>
  );
}

export default App;
