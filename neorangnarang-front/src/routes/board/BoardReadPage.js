import Card from "@mui/material/Card";
import ReadComponent from "../../components/board/ReadComponent";
import { useParams } from "react-router-dom";

const BoardReadPage = ({ boardDTO, setBoardDTO, isLogin }) => {
  let { board_idx } = useParams();

  alert("read page isLogin?? " + isLogin);

  return (
    <>
      <Card>
        <ReadComponent
          // isLogin={isLogin}
          board_idx={board_idx}
          boardDTO={boardDTO}
          setBoardDTO={setBoardDTO}
          isLogin={isLogin}
        ></ReadComponent>
        {/*<MapComponent/>*/}
      </Card>
    </>
  );
};

export default BoardReadPage;
