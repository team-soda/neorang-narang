import ReadComponent from "../../components/board/ReadComponent";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";

const BoardReadPage = ({boardDTO, setBoardDTO}) => {
    const {board_idx} = useParams();

    return (
        <Grid
            component="main"
            style={{
                justifyContent: "center",
                padding: "40px 90px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            }}
        >
            <ReadComponent
                board_idx={board_idx}
                boardDTO={boardDTO}
                setBoardDTO={setBoardDTO}
            />
        </Grid>
    );
};

export default BoardReadPage;
