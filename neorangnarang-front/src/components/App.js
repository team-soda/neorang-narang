import { useEffect, useState } from "react";
import { axiosUserService } from "../service/user/AxiosUserService";
import AppRouter from "./AppRouter";

function App() {
  const [userObj, setUserObj] = useState();

  useEffect(() => {
    localStorage.getItem("accessToken") &&
      axiosUserService.getUserInfo((res) => {
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
