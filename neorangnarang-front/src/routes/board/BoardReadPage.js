import ReadComponent from "../../components/board/ReadComponent";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";

const BoardReadPage = ({ boardDTO, setBoardDTO }) => {
  const { board_idx } = useParams();

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
=======
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
>>>>>>> 0242d8fdcd2c1d4261497f90bca975297ee2bf5b
};

export default BoardReadPage;
