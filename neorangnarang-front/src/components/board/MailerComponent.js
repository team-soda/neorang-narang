import {Button, TextField} from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';
import React from "react";

const MailerComponent = () => {

    return (
        <div className="container border"
             style={{
                 marginTop: "50px",
                 // width: '50%',
                 backgroundImage: `url('https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/p-s75-jir-0417-teddy-01-job570-1.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=9b34badc50c5365e071e0d935d783a8d')`,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 textAlign: 'center'
             }}>
            <form className="row" style={{padding: '80px'}}>
                <h1>Contact Form</h1>
                <p>문의 사항을 보내주세요.</p>
                <TextField id="filled-basic" label="보내는 분 성함" variant="filled" placeholder="ex) 룸메찾는룸메리스"
                           name="name"/>
                <TextField id="filled-basic" label="E-mail" variant="filled"
                           placeholder="ex) neorangnarang@gmail.com" name="email"/>
                <TextField id="filled-basic" label="내용" variant="filled" className="inputMailContent"
                           placeholder="ex) neorangnarang@gmail.com" name="message"/>

                <div className="flexDiv">
                    <Button variant="outlined" type="submit" color="black" endIcon={<SendIcon/>}>Send</Button>
                </div>
            </form>
        </div>
    );
}

export default MailerComponent;