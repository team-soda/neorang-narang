import Card from "@mui/material/Card";
import ReadComponent from "../../components/board/ReadComponent";
import { useParams } from "react-router-dom";
import MapComponent from "../../components/board/MapComponent";

const BoardReadPage = ({ boardDTO, setBoardDTO, post, setPost }) => {
  let { board_idx } = useParams();

  return (
    <>
      <Card>
        <ReadComponent
          board_idx={board_idx}
          boardDTO={boardDTO}
          setBoardDTO={setBoardDTO}
          post={post}
          setPost={setPost}
        ></ReadComponent>
        {/*<MapComponent/>*/}
      </Card>
    </>
  );
};

export default BoardReadPage;
