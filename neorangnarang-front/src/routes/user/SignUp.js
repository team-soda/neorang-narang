import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
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
    <Box
      sx={{
        maxWidth: "50%",
        margin: "0 auto",
        marginTop: 8,
        marginBottom: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" component="div">
        <div className="logoDiv" style={{ display: "inline-block" }}>
          <img
            className="logoText"
            style={{ width: 30 }}
            src="/img/logo-neona.png"
            alt="로고"
          />
          <img
            className="logoText"
            style={{ width: 100 }}
            src="/img/text-neona.png"
            alt="로고"
          />
        </div>
        회원가입
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={onSignupHandler}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="uid"
              required
              fullWidth
              id="uid"
              label="아이디"
              autoFocus
            />
          </Grid>
          <Grid sx={{ mt: 3 }} item xs={12}>
            <TextField
              required
              fullWidth
              id="upw"
              label="비밀번호"
              type="password"
              name="password"
            />
          </Grid>
          <Grid sx={{ mt: 3 }} item xs={"auto"} sm={12}>
            <input
              type="radio"
              id="genderIsFemale"
              name="gender"
              value="female"
            />
            <label htmlFor="genderIsFemale"> 여성 </label>
            <input type="radio" id="genderIsMale" name="gender" value="male" />
            <label htmlFor="genderIsMale"> 남성</label>
          </Grid>
          <Grid sx={{ alignSelf: "center" }} item xs={12} sm={10}>
            <TextField
              required
              type="email"
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              onChange={onChangeEmail}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2} sx={{ textAlign: "right" }}>
            <Button
              type="button"
              onClick={onSendAuthMailHandler}
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "black" }}
            >
              전송
            </Button>
          </Grid>
          <Grid sx={{ alignSelf: "center" }} item xs={12} sm={10}>
            <TextField
              required
              label="인증번호"
              type="text"
              id="authCode"
              name="authCode"
              placeholder="인증번호 입력"
              onChange={onChangeCode}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2} sx={{ textAlign: "right" }}>
            <Button
              type="button"
              onClick={onAuthCodeCheck}
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "black" }}
            >
              확인
            </Button>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 8, mb: 2, background: "black" }}
        >
          회원가입
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/auth/signin" variant="body2">
              이미 계정이 있다면? 로그인!
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SignUp;
