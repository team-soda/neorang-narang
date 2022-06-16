import { Link } from "react-router-dom";
import { userService } from "../service/UserService";

function Home({ userObj }) {
  const onLogoutHandler = () => {
    userService.logout();
  };

  return (
    <>
      <h1>메인</h1>
      <ul>
        {userObj ? (
          <>
            <li>
              <Link to="/user/mypage">마이페이지</Link>
            </li>
            <li>
              <button onClick={onLogoutHandler}>로그아웃</button>
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
    </>
  );
}

export default Home;
