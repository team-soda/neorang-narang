import * as React from "react";
import { useDispatch } from "react-redux";
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
} from "../../config/url-config";
import { login } from "../../redux/user/thunk/authThunk";
import {
  Grid,
  CssBaseline,
  Paper,
  Box,
  TextField,
  Button,
  Link,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme();

function SignIn() {
  const dispatch = useDispatch();

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
    <ThemeProvider theme={theme}>
      <Grid container component="main" style={{ margin: "0 auto" }}>
        <CssBaseline />
        <Grid
          style={{ maxWidth: "45%" }}
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          style={{ margin: "0 auto", maxWidth: "30%" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" noValidate onSubmit={onSubmitHandler}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="uid"
                label="Email Address"
                name="uid"
                autoComplete="email"
                type="text"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="upw"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, background: "black" }}
              >
                로그인
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"계정이 없다면? 지금 가입하세요!"}
                  </Link>
                </Grid>
              </Grid>
              <div style={{ marginTop: 30 }}>
                <img
                  onClick={onSocialLogin}
                  name="naver"
                  style={{ cursor: "pointer", borderRadius: 5 }}
                  src="/img/naverLogin.png"
                  alt="네이버 로그인"
                />
                <img
                  onClick={onSocialLogin}
                  name="kakao"
                  style={{ cursor: "pointer", borderRadius: 5 }}
                  src="/img/kakaoLogin.png"
                  alt="카카오 로그인"
                />
                <img
                  onClick={onSocialLogin}
                  name="google"
                  style={{ cursor: "pointer", borderRadius: 5 }}
                  src="/img/googleLogin.png"
                  alt="구글 로그인"
                />
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;
