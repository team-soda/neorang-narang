import React from "react";
import { useSelector } from "react-redux";
import { getAuthState } from "../../redux/user/selector/authSelector";
import { TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import emailjs from "emailjs-com";

const MailerComponent = () => {
  const authUser = useSelector(getAuthState);

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "neorang-narang-email",
        "template_neorangnarang",
        e.target,
        "RmBG7lYIg75vOlo5P"
      )
      .then((res) => {
        alert("메일이 전송 되었습니다! 확인 후 빠른 답변 드리겠습니다!");
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Grid component={Paper} square item sm={6} style={{ margin: "0 auto" }}>
        <Box sx={{ my: 7, mx: 6, display: "inline" }}>
          <Box component="form" noValidate onSubmit={sendEmail}>
            {authUser ? (
              <TextField
                margin="normal"
                required
                fullWidth
                label="회원명"
                name="name"
                autoComplete="email"
                autoFocus
                type="text"
                value={authUser.nickname}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                label="회원명"
                name="name"
                autoComplete="email"
                autoFocus
                type="text"
                placeholder="ex) 룸메찾는룸메리스"
              />
            )}
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
              style={{ mt: 10, mb: 2, background: "black", color: "white" }}
              fullWidth
              variant="outlined"
              type="submit"
              value="Send"
              endIcon={<SendIcon />}
            >
              메일 보내기
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default MailerComponent;
