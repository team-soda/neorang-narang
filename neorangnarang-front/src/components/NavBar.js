import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from "@material-ui/core";

export default function ButtonAppBar() {

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link href="/" underline="none">
                            <div className="logoDiv">
                                <img className="logoText" style={{width: 30}} src="/img/logo-neona.png"/>
                                <img className="logoText" style={{width: 100}} src="/img/text-neona.png"/>
                            </div>
                        </Link>
                    </Typography>
                    <Button color="inherit"><Link to="/mainboard" underline="none"
                                                  color="initial">게시판</Link></Button>
                    <Button color="inherit"><Link to="/user/mypage" underline="none"
                                                  color="initial">마이페이지</Link></Button>
                    <Button color="inherit"><Link to="/auth/signin" underline="none"
                                                  color="initial">로그인</Link></Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
