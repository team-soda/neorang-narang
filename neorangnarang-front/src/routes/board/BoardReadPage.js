import Card from "@mui/material/Card";
import ReadComponent from "../../components/board/ReadComponent";
import { useParams } from "react-router-dom";
import MapComponent from "../../components/board/MapComponent";

const BoardReadPage = () => {
  const { board_idx } = useParams();

  return (
    <Card>
      <ReadComponent board_idx={board_idx} />
    </Card>
  );
};

export default BoardReadPage;
