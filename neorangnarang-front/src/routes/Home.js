import { persistor } from "..";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/thunk/authThunk";
import { getIsLoginState } from "../redux/user/selector/authSelector";
import { Link, useNavigate } from "react-router-dom";
import MailerComponent from "../components/main/MailerComponent";

function Home() {
  const isLogin = useSelector(getIsLoginState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutHandler = async () => {
    dispatch(logout());
    setTimeout(async () => await persistor.purge(), 200);
    navigate("/", { replace: true });
  };

  return (
    <>
      <ul>
        {isLogin ? (
          <>
            <li>
              <Link to="/user/mypage">마이페이지</Link>
            </li>
            <li>
              <button onClick={onLogoutHandler}>로그아웃</button>
            </li>
            <li>
              <Link to="/user/info/NAVER_BVBqfnrSe7M7qRPguvt0i7dUSKHnuMxeP7Er3j8Jcew">
                테스트
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/auth/signin">로그인 페이지로 이동</Link>
            </li>
            <li>
              <Link to="/auth/signup">회원가입 페이지로 이동</Link>
            </li>
          </>
        )}
      </ul>
      <MailerComponent />
    </>
  );
}

export default Home;
