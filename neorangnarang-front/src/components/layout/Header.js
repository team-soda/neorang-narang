import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../../index";
import { logout } from "../../redux/user/thunk/authThunk";
import {
  getAuthState,
  getIsLoginState,
} from "../../redux/user/selector/authSelector";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";

export default function Header() {
  const isLogin = useSelector(getIsLoginState);
  const authUser = useSelector(getAuthState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutHandler = async () => {
    dispatch(logout());
    setTimeout(async () => await persistor.purge(), 200);
    navigate("/", { replace: true });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" component={RouterLink} underline="none">
              <div className="logoDiv">
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
            </Link>
          </Typography>
          <Button to="/mainboard" component={RouterLink} color="inherit">
            {/* <Link
              to="/mainboard"
              component={RouterLink}
              style={{ textDecoration: "none", color: "black" }}
            > */}
            게시판
            {/* </Link> */}
          </Button>
          {isLogin ? (
            <>
              <Button
                to="/user/mypage"
                component={RouterLink}
                style={{ textDecoration: "none", color: "black" }}
              >
                {/*  <Link
                  to="/user/mypage"
                  component={RouterLink}
                  style={{ textDecoration: "none", color: "black" }}
                > */}
                마이페이지
                {/* </Link> */}
              </Button>
              <Button
                onClick={onLogoutHandler}
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
              >
                로그아웃
              </Button>
            </>
          ) : (
            <Button
              to="/auth/signin"
              component={RouterLink}
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
            >
              {/* <Link
                to="/auth/signin"
                component={RouterLink}
                style={{ textDecoration: "none", color: "black" }}
              > */}
              로그인
              {/* </Link> */}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
