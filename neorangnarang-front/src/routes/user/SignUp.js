import { useState } from "react";
import { userService } from "../../service/UserService";

function SignUp() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeCode = (event) => {
    setCode(event.target.value);
  };

  const onSendAuthMailHandler = () => {
    console.log(`onSendAuthMailHandler email? : ${email}`);
    const reqEmail = {
      email: email,
    };
    userService.sendAuthEmail(reqEmail);
  };

  const onAuthCodeCheck = () => {
    console.log(`onAuthCodeCheck email? : ${email}`);
    console.log(`onAuthCodeCheck email? : ${code}`);
    const reqObj = {
      email: email,
      code: code,
    };

    userService.checkAuthCode(reqObj, (res) => {
      setIsAuth(true);
    });
  };

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
    console.log(`isAuth? : ${isAuth}`);

    userService
      .signup(userObj)
      .then((res) => {
        console.log(res);
        if (isAuth) {
          setEmail("");
          setCode("");
          setIsAuth(false);
          window.location.replace("/");
        } else {
          alert("이메일 인증을 진행해 주세요.");
          return false;
        }
      })
      .catch((error) => {
        alert("올바르지 않은 요청입니다.");
      });
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
          <input type="text" id="email" name="email" onChange={onChangeEmail} />
          <input
            type="button"
            value="인증메일보내기"
            onClick={onSendAuthMailHandler}
          />
          <input
            type="text"
            id="authCode"
            name="authCode"
            placeholder="인증번호 입력"
            onChange={onChangeCode}
          />
          <input type="button" value="확인" onClick={onAuthCodeCheck} />
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
