import { useState, useEffect } from "react";

function Redirect() {
    const [accessToken, setAccessToken] = useState();

    useEffect(() => {
        const url = window.location.search;
        const urlParams = new URLSearchParams(url);
        console.log(urlParams);

        setAccessToken(urlParams.get("token"));
    }, []);

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
        }

        window.location.href = "/";
    }, [accessToken]);
    return <div>리다이렉트</div>;
}

export default Redirect;