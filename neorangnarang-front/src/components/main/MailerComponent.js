import {Button, InputLabel, TextField} from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';
import React, {useState} from "react";
import emailjs from "emailjs-com";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const MailerComponent = () => {

    const theme = createTheme();

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm(
            'neorang-narang-email',
            'template_neorangnarang',
            e.target,
            'RmBG7lYIg75vOlo5P'
        ).then(res => {
            alert('메일이 전송 되었습니다! 확인 후 빠른 답변 드리겠습니다!');
        }).catch(err => console.log(err));
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" style={{margin: '0 auto'}}>
                <CssBaseline/>
                <Grid component={Paper} square
                      style={{margin: '0 auto', maxWidth: '50%'}}>
                    <Box
                        sx={{
                            my: 7,
                            mx: 6,
                            display: 'flex',
                        }}
                    >
                        <Box component="form" noValidate onSubmit={sendEmail}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="회원명"
                                name="name"
                                autoComplete="email"
                                placeholder="ex) 룸메찾는룸메리스"
                                type="text"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="E-mail"
                                type="email"
                                placeholder="ex) neorangnarang@gmail.com"
                                name="user_email"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                label="문의 내용"
                                type="text"
                                minRows={10}
                                placeholder="ex) 메인 화면의 버튼을 개선해주세요!"
                                name="message"
                            />
                            <Button
                                fullWidth
                                style={{mt: 3, mb: 2, background: 'black', color: 'white'}}
                                variant="outlined" type="submit" value="Send"
                                endIcon={<SendIcon/>}
                            >
                                메일 보내기
                            </Button>
                        </Box>
                    </Box>
                </Grid>
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
            </Grid>
        </ThemeProvider>
    );
}

export default MailerComponent;