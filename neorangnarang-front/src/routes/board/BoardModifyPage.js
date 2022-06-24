import Card from "@mui/material/Card";
import {useParams} from "react-router-dom";
import ModifyComponent from "../../components/board/ModifyComponent";

const BoardModifyPage = ({boardDTO, setBoardDTO, isLogin}) => {
    let {board_idx} = useParams();

    return (
        <Card>
            <ModifyComponent
                isLogin={isLogin}
                board_idx={board_idx}
                boardDTO={boardDTO}
                setBoardDTO={setBoardDTO}
            />
        </Card>
    );
};

export default BoardModifyPage;
