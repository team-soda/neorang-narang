import { userService } from "../service/UserService";

function Home() {
  const onLogoutHandler = () => {
    userService.logout();
  };

  return (
    <>
      <h1>메인</h1>
      <ul>
        <li>
          <a href="/auth/signin">로그인 페이지로 이동</a>
        </li>
        <li>
          <a href="/auth/signup">회원가입 페이지로 이동</a>
        </li>
        <li>
          <button onClick={onLogoutHandler}>로그아웃</button>
        </li>
      </ul>
    </>
  );
}

export default Home;
