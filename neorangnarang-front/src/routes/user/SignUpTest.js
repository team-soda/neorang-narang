import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {userService} from "../../service/UserService";
import {
    createTheme,
    CssBaseline,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from "@material-ui/core";
import {ThemeProvider} from "@emotion/react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function SignUpTest() {
    function Copyright() {
        return (
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                neorang-narang {' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    const theme = createTheme();
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
                navigate("/", {replace: true});
            } else {
                alert("이메일 인증을 진행해 주세요.");
            }
        } else {
            alert("회원 정보를 입력해 주세요.");
            return;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" noValidate onSubmit={onSignupHandler} sx={{mt: 3}}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="uid"
                                    required
                                    fullWidth
                                    id="uid"
                                    label="ID"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="upw"
                                    label="비밀번호"
                                    type="password"
                                    name="upw"
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    required
                                    type="email"
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    onChange={onChangeEmail}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    type="button"
                                    onClick={onSendAuthMailHandler}
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    인증 요청
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    required
                                    label="인증번호"
                                    type="text"
                                    id="authCode"
                                    name="authCode"
                                    placeholder="인증번호 입력"
                                    onChange={onChangeCode}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    type="button"
                                    onClick={onAuthCodeCheck}
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    확인
                                </Button>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
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
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}

export default SignUpTest;