import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/board/ModifyComponent";

const BoardModifyPage = () => {
  let { board_idx } = useParams();

  return (
    <Card>
      <ModifyComponent board_idx={board_idx} />
    </Card>
  );
};

export default BoardModifyPage;
