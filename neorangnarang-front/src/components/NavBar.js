import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ButtonAppBar() {
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
<<<<<<< HEAD
            <Link to="/mainboard" style={{textDecoration: 'none', color: 'black'}}>
=======
            <Link to="/mainboard" underline="none" color="initial">
>>>>>>> 00cb516c1c351cfb7add9737620dd6d1bb34f25e
              게시판
            </Link>
          </Button>
          <Button color="inherit">
<<<<<<< HEAD
            <Link to="/user/mypage" style={{textDecoration: 'none', color: 'black'}}>
=======
            <Link to="/user/mypage" underline="none" color="initial">
>>>>>>> 00cb516c1c351cfb7add9737620dd6d1bb34f25e
              마이페이지
            </Link>
          </Button>
          <Button color="inherit">
<<<<<<< HEAD
            <Link to="/auth/signin" style={{textDecoration: 'none', color: 'black'}}>
=======
            <Link to="/auth/signin" underline="none" color="initial">
>>>>>>> 00cb516c1c351cfb7add9737620dd6d1bb34f25e
              로그인
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
