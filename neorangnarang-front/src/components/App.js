import { useEffect, useState } from "react";
import { axiosUserService } from "../service/user/AxiosUserService";
import AppRouter from "./AppRouter";

function App() {
  const [userObj, setUserObj] = useState();

  useEffect(() => {
    localStorage.getItem("accessToken")
      ? axiosUserService.getUserInfo((res) => {
          setUserObj(res);
        })
      : setUserObj(null);
  }, []);
  return (
    <div className="App">
      <AppRouter userObj={userObj} isLogin={Boolean(userObj)} />
    </div>
  );
}

export default App;
