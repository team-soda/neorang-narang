import { useEffect, useState } from "react";
import { axiosService } from "../service/user/AxiosUserService";
import AppRouter from "./AppRouter";

function App() {
  const [userObj, setUserObj] = useState();

  useEffect(() => {
    /* if (localStorage.getItem("accessToken")) {
      axiosService.getUserInfo((res) => {
        setUserObj(res);
      });
    } */

    localStorage.getItem("accessToken") &&
      axiosService.getUserInfo((res) => {
        setUserObj(res);
      });
  }, []);
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
