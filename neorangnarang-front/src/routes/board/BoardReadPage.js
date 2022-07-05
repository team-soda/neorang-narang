import Card from "@mui/material/Card";
import ReadComponent from "../../components/board/ReadComponent";
import {useParams} from "react-router-dom";
import MapComponent from "../../components/board/MapComponent";
import {useDispatch} from "react-redux";

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
