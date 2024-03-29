import {Button, TextField} from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';
import React from "react";
import emailjs from 'emailjs-com';

const MailerComponent = () => {

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
        <div className="container border"
             style={{
                 marginTop: "50px",
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 textAlign: 'center'
             }}>
            <form className="row" style={{padding: '80px', display:'inline-block !important'}} onSubmit={sendEmail}>
                <h1>Contact Us</h1>
                <p>문의 사항을 보내주세요.</p>
                <TextField id="filled-basic" label="보내는 분 성함" variant="filled" placeholder="ex) 룸메찾는룸메리스"
                           name="name" sx={{ display:'inline-block !important'}}/>
                <TextField id="filled-basic" label="E-mail" variant="filled"
                           placeholder="ex) neorangnarang@gmail.com" name="user_email"/>
                <TextField id="filled-basic" label="내용" variant="filled" multiline rows={4}
                           placeholder="ex) 메인 화면의 버튼을 개선해주세요!" name="message"/>
                <div className="flexDiv">
                    <Button style={{marginTop: 30}} variant="outlined" type="submit" color="black" value="Send"
                            endIcon={<SendIcon/>}>Send</Button>
                </div>
            </form>
        </div>
    );
}

export default MailerComponent;