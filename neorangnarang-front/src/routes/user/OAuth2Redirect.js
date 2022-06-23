import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLogin } from "../../redux/user/slice/authSlice";
import {getAuthUser} from "../../redux/user/thunk/authThunk";

function Redirect() {
  const [accessToken, setAccessToken] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAccessToken(params.get("token"));
  }, []);

  useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
      dispatch(getAuthUser());
      navigate("/", { replace: true });
    }
  }, [accessToken, navigate]);
  return <div>리다이렉트</div>;
}

export default Redirect;