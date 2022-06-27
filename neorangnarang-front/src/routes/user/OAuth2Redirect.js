import { useState, useEffect } from "react";

function Redirect() {
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAccessToken(params.get("token"));
  }, []);

  useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
      window.location.replace("/");
    }
  }, [accessToken]);
  return <div>리다이렉트</div>;
}

export default Redirect;
