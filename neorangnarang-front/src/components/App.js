import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../redux/user/thunk/authThunk";
import {
  getAuthState,
  getIsLoginState,
} from "../redux/user/selector/authSelector";
import { Container } from "@material-ui/core";
import NavBar from "./NavBar";
import AppRouter from "./AppRouter";

function App() {
  const authUser = useSelector(getAuthState);
  const isLogin = useSelector(getIsLoginState);
  const dispatch = useDispatch();

  useEffect(() => {
    isLogin && dispatch(getAuthUser());
  }, [isLogin, dispatch]);

  console.log(authUser);

  return (
    <div className="App">
      <NavBar />
      <Container maxWidth="md" style={{ backgroundColor: "#fbf7f2" }}>
        <AppRouter />
      </Container>
    </div>
  );
}

export default App;
