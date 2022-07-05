import * as React from "react";
import {Link, useNavigate} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {getIsLoginState} from "../../redux/user/selector/authSelector";
import {logout} from "../../redux/user/thunk/authThunk";
import {persistor} from "../../index";

export default function Header() {

    const isLogin = useSelector(getIsLoginState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogoutHandler = async () => {
        dispatch(logout());
        setTimeout(async () => await persistor.purge(), 200);
        navigate("/", {replace: true});
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link to="/" underline="none">
                            <div className="logoDiv">
                                <img
                                    className="logoText"
                                    style={{width: 30}}
                                    src="/img/logo-neona.png"
                                />
                                <img
                                    className="logoText"
                                    style={{width: 100}}
                                    src="/img/text-neona.png"
                                />
                            </div>
                        </Link>
                    </Typography>
                    {isLogin ? (
                        <>
                            <Button color="inherit">
                                <Link to="/mainboard" style={{textDecoration: 'none', color: 'black'}}>
                                    게시판
                                </Link>
                            </Button>
                            <Button color="inherit">
                                <Link to="/user/mypage" style={{textDecoration: 'none', color: 'black'}}>
                                    마이페이지
                                </Link>
                            </Button>
                            <Button onClick={onLogoutHandler} variant="outlined" sx={{my: 1, mx: 1.5}}>
                                로그아웃
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit">
                                <Link to="/mainboard" style={{textDecoration: 'none', color: 'black'}}>
                                    게시판
                                </Link>
                            </Button>
                            <Button variant="outlined" sx={{my: 1, mx: 1.5}}>
                                <Link to="/auth/signin" style={{textDecoration: 'none', color: 'black'}}>
                                    로그인
                                </Link>
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
