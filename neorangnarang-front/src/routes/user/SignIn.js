import {useDispatch} from "react-redux";
import {
    GOOGLE_AUTH_URL,
    KAKAO_AUTH_URL,
    NAVER_AUTH_URL,
} from "../../config/url-config";
import {login} from "../../redux/user/thunk/authThunk";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import * as React from "react";

const theme = createTheme();

function SignIn() {
    const dispatch = useDispatch();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const loginIObj = {
            uid: data.get("uid"),
            password: data.get("password"),
        };

        dispatch(login(loginIObj));
    };

    const onSocialLogin = (event) => {
        const {name} = event.target;

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
            <Grid container component="main" style={{margin: '0 auto'}}>
                <CssBaseline/>
                <Grid style={{maxWidth: '45%'}}
                      item
                      xs={false}
                      sm={4}
                      md={7}
                      sx={{
                          backgroundImage: 'url(https://source.unsplash.com/random)',
                          backgroundRepeat: 'no-repeat',
                          backgroundColor: (t) =>
                              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                      }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
                      style={{margin: '0 auto', maxWidth: '30%'}}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
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
                                name="upw"
                                label="Password"
                                type="password"
                                id="upw"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2, background: 'black'}}
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
                            <div style={{marginTop: 30}}>
                                <img
                                    onClick={onSocialLogin}
                                    name="naver"
                                    style={{cursor: 'pointer', borderRadius: 5}}
                                    src="/img/naverLogin.png"
                                />
                                <img
                                    onClick={onSocialLogin}
                                    name="kakao"
                                    style={{cursor: 'pointer', borderRadius: 5}}
                                    src="/img/kakaoLogin.png"
                                />
                                <img
                                    onClick={onSocialLogin}
                                    name="google"
                                    style={{cursor: 'pointer', borderRadius: 5}}
                                    src="/img/googleLogin.png"
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