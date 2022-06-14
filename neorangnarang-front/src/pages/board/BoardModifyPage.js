import Card from "@mui/material/Card";
import {useParams} from "react-router-dom";
import ModifyComponent from "../../components/board/ModifyComponent";

const BoardModifyPage = ({location}) => {

    let {board_idx} = useParams();

    return (
        // sx={{display: 'flex', justifyContent: 'center'}}
        <Card>
            <ModifyComponent board_idx={board_idx} location={location}/>
        </Card>
    );
};

export default BoardModifyPage;