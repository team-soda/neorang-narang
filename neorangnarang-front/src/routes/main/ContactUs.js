import Grid from "@mui/material/Grid";
import MailerComponent from "../../components/main/MailerComponent";
import AlertComponent from "../../components/board/AlertComponent";

const ContactUs = () => {

    return (
        <Grid
            component="main"
            style={{
                justifyContent: "center",
                // padding: 50,
                margin: "0 auto",
                maxWidth: "70%",
            }}
        >
            <AlertComponent text={"이메일에 오탈자가 없는지 반드시 확인해주세요!"}/>
            <MailerComponent/>
        </Grid>
    );
};

export default ContactUs;
