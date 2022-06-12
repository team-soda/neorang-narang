import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
} from "../../config/url-config";
import { axiosService } from "../../service/user/AxiosUserService";

function Login() {
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const loginInfo = {
      uid: data.get("uid"),
      password: data.get("password"),
    };

    axiosService.login(loginInfo);
  };

  const onGoogleSignin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  const onKakaoSignin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const onNaverSignin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <div className="App">
      로그인페이지
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="uid">아이디</label>
        <input id="uid" name="uid" type="text" />
        <label htmlFor="upw">패스워드</label>
        <input id="upw" name="password" type="password" />
        <button>로그인</button>
      </form>
      <button onClick={onGoogleSignin}>구글 로그인</button>
      <button onClick={onKakaoSignin}>카카오 로그인</button>
      <button onClick={onNaverSignin}>네이버 로그인</button>
    </div>
  );
}

export default Login;
