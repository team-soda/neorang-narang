import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../redux/user/thunk/authThunk";
import { getAuthState } from "../redux/user/selector/authSelector";
import { Container } from "@material-ui/core";
import NavBar from "./NavBar";
import AppRouter from "./AppRouter";

function App() {
  const authUser = useSelector(getAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    sessionStorage.getItem("accessToken") && dispatch(getAuthUser());
  }, [dispatch]);

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
