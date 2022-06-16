import { useEffect, useState } from "react";
import { userService } from "../service/UserService";
import AppRouter from "./AppRouter";

function App() {
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    localStorage.getItem("accessToken")
      ? userService.getUserInfo((res) => {
          setUserObj(res);
        })
      : setUserObj(null);
  }, []);

  console.log(userObj);

  return (
    <div className="App">
      <AppRouter userObj={userObj} isLogin={Boolean(userObj)} />
    </div>
  );
}

export default App;
