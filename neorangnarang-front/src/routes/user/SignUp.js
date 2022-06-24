import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../service/UserService";

function SignUp() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeCode = (event) => {
    setCode(event.target.value);
  };

  const onSendAuthMailHandler = async () => {
    console.log(`onSendAuthMailHandler email? : ${email}`);
    const reqEmail = {
      email: email,
    };
    const sendCheck = await userService.sendAuthEmail(reqEmail);
    setIsSendEmail(sendCheck);
  };

  const onAuthCodeCheck = async () => {
    if (!isSendEmail) {
      alert("인증 메일 보내기를 클릭해주세요.");
      return;
    }

    const reqObj = {
      email: email,
      code: code,
    };

    const codeCheck = await userService.checkAuthCode(reqObj);

    setIsAuth(codeCheck);
    isAuth && alert("확인되었습니다.");
  };

  const onSignupHandler = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const userObj = {
      uid: data.get("uid"),
      password: data.get("password"),
      gender: data.get("gender"),
      email: data.get("email"),
    };

    if (userObj) {
      if (isAuth) {
        userService.signup(userObj);
        setEmail("");
        setCode("");
        setIsSendEmail(false);
        setIsAuth(false);
        alert("회원가입이 완료되었습니다.");
        navigate("/", { replace: true });
      } else {
        alert("이메일 인증을 진행해 주세요.");
      }
    } else {
      alert("회원 정보를 입력해 주세요.");
      return;
    }
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

        <button>가입하기</button>
      </form>
    </div>
  );
}

export default SignUp;
