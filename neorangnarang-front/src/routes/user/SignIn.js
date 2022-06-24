import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
} from "../../config/url-config";
import { login } from "../../redux/user/thunk/authThunk";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const loginObj = {
      uid: data.get("uid"),
      password: data.get("password"),
    };

    dispatch(login(loginObj));
  };

  const onSocialLogin = (event) => {
    const { name } = event.target;

    switch (name) {
      case "google":
        return (window.location.href = GOOGLE_AUTH_URL);
      case "kakao":
        return (window.location.href = KAKAO_AUTH_URL);
      case "naver":
        return (window.location.href = NAVER_AUTH_URL);
      default:
        console.log("지원하지 않는 소셜 로그인");
        return;
    }
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
      <button name="google" onClick={onSocialLogin}>
        구글 로그인
      </button>
      <button name="kakao" onClick={onSocialLogin}>
        카카오 로그인
      </button>
      <button name="naver" onClick={onSocialLogin}>
        네이버 로그인
      </button>
    </div>
  );
}

export default SignIn;
