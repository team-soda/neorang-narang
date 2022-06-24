import Card from "@mui/material/Card";
import RegisterComponent from "../../components/board/RegisterComponent";

const BoardRegisterPage = ({userObj}) => {
  return (
    <>
      <Card>
        <RegisterComponent userObj={userObj} />
      </Card>
    </>
  );
};

export default BoardRegisterPage;
