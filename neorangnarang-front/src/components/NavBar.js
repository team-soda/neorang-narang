import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" underline="none">
              <div className="logoDiv">
                <img
                  className="logoText"
                  style={{ width: 30 }}
                  src="/img/logo-neona.png"
                />
                <img
                  className="logoText"
                  style={{ width: 100 }}
                  src="/img/text-neona.png"
                />
              </div>
            </Link>
          </Typography>
          <Button color="inherit">
            <Link to="/mainboard" style={{textDecoration: 'none', color: 'grey'}}>
              게시판
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/user/mypage" style={{textDecoration: 'none'}}>
              마이페이지
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/auth/signin" style={{textDecoration: 'none'}}>
              로그인
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
