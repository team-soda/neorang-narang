import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import * as React from "react";

export default function Footer() {
    return (
        <Box sx={{flexGrow: 1, background: 'black', color: 'white', borderTop: '1px solid rgb(240, 240, 240)'}}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">
                        <Link to="/mainboard" style={{textDecoration: 'none', color: 'lightgrey'}}>
                            게시판
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link to="/user/mypage" style={{textDecoration: 'none', color: 'lightgrey'}}>
                            마이페이지
                        </Link>
                    </Button>
                    <span>
                    © Neorang-narang, 2022
                    </span>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
