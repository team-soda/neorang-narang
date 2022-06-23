import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../redux/user/thunk/authThunk";
import {
  getAuthState,
} from "../redux/user/selector/authSelector";
import { Container } from "@material-ui/core";
import AppRouter from "./AppRouter";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

function App() {
    const authUser = useSelector(getAuthState);
    const dispatch = useDispatch();

    useEffect(() => {
        sessionStorage.getItem("accessToken") && dispatch(getAuthUser());
    }, [dispatch]);

    console.log(authUser);

  return (
    <div className="App">
      <Header/>
      <Container>
        <AppRouter />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
