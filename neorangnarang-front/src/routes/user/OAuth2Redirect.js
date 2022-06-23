import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirect() {
  const [accessToken, setAccessToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAccessToken(params.get("token"));
  }, []);

  useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);

      navigate("/", { replace: true });
    }
  }, [accessToken, navigate]);
  return <div>리다이렉트</div>;
}

export default Redirect;
