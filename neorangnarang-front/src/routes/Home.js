import { Link } from "react-router-dom";
import { userService } from "../service/UserService";
import MailerComponent from "../components/MailerComponent";

function Home({ authUser }) {
  const onLogoutHandler = () => {
    userService.logout();
  };

  return (
    <>
      <ul>
        {authUser ? (
          <>
            <li>
              <Link to={`/user/mypage/${authUser.uid}`}>마이페이지</Link>
            </li>
            <li>
              <button onClick={onLogoutHandler}>로그아웃</button>
            </li>
            <li>
              <Link
                to={`/user/mypage/NAVER_BVBqfnrSe7M7qRPguvt0i7dUSKHnuMxeP7Er3j8Jcew`}
              >
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
