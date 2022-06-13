import { axiosUserService } from "../../service/user/AxiosUserService";

function SignUp() {
  const onSignupHandler = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const userObj = {
      uid: data.get("uid"),
      password: data.get("password"),
      email: data.get("email"),
      gender: data.get("gender"),
    };

    console.log(userObj);
    axiosUserService.signup(userObj);
  };
  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={onSignupHandler}>
        <div>
          <label htmlFor="uid">아이디</label>
          <input type="text" id="uid" name="uid" />
        </div>
        <div>
          <label htmlFor="upw">비밀번호</label>
          <input type="password" id="upw" name="password" />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input type="text" id="email" name="email" />
        </div>
        <div>
          <label>성별</label>
          <div>
            <input
              type="radio"
              id="genderIsFemale"
              name="gender"
              value="female"
            />
            <label htmlFor="genderIsFemale">여성</label>
            <input type="radio" id="genderIsMale" name="gender" value="male" />
            <label htmlFor="genderIsMale">남성</label>
          </div>
        </div>
        <button>가입하기</button>
      </form>
    </div>
  );
}

export default SignUp;
