import { axiosUserService } from "../service/user/AxiosUserService";

function Home({ userObj }) {
  const onLogoutHandler = () => {
    axiosUserService.logout();
  };

  return (
    <>
      <h1>메인</h1>
      <ul>
        {userObj ? (
          <>
            <li>
              <a href="/user/mypage">마이페이지</a>
            </li>
            <li>
              <button onClick={onLogoutHandler}>로그아웃</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/auth/signin">로그인 페이지로 이동</a>
            </li>
            <li>
              <a href="/auth/signup">회원가입 페이지로 이동</a>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default Home;
