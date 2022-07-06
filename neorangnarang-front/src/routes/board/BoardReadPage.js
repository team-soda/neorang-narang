import Card from "@mui/material/Card";
import ReadComponent from "../../components/board/ReadComponent";
import {useParams} from "react-router-dom";

const BoardReadPage = ({boardDTO, setBoardDTO}) => {
    const {board_idx} = useParams();

    return (
            <Card>
                <ReadComponent
                    board_idx={board_idx}
                    boardDTO={boardDTO}
                    setBoardDTO={setBoardDTO}
                />
            </Card>
    );
};

export default BoardReadPage;
