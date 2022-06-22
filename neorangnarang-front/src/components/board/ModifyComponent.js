import React, {useEffect, useRef, useState} from "react";
import Card from "@mui/material/Card";
import {
    Button,
    CardActions,
    CardHeader,
    InputLabel,
    TextField,
} from "@material-ui/core";
import {Editor} from "@tinymce/tinymce-react";
import {boardService} from "../../service/BoardService";
import ZipSearchComponent from "./ZipSearchComponent";
import Typography from "@mui/material/Typography";

function ModifyComponent({board_idx, isLogin}) {

    const boardDTOState = {
        created_dt: '',
        imageTags: '',
        dto: []
    }

    const editorRef = useRef(null);
    const [boardDTO, setBoardDTO] = useState(boardDTOState);
    const [newBoard, setNewBoard] = useState();
    const [editorValue, SetEditorValue] = useState();

    useEffect(() => {
        boardService.getBoardRead(board_idx).then((res) => {
            setBoardDTO(res.data);
        });
    }, [board_idx, setBoardDTO]);


    const submitData = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        setNewBoard({
            board_idx: boardDTO.dto.board_idx,
            title: data.get("title"),
            writer: boardDTO.dto.writer,
            content: editorValue,
            pay_division: data.get("pay_division"),
            square_feet: data.get("square_feet"),
            price: data.get("price"),
            location: data.get("location"),
            short_location: data.get("short_location")
        });

        boardService.modifyBoard(newBoard).then(res =>
            window.location = `/mainboard/read/${boardDTO.dto.board_idx}`);
    };

    return (
        <Card
            sx={{
                "& .MuiTextField-root": {m: 1, width: "30ch"},
            }}
        >
            <CardHeader title={"룸메이트 구하기 수정"}/>
            <form onSubmit={submitData}>
                <InputLabel className="inputLabel">제목</InputLabel>
                <TextField
                    id="standard-basic"
                    variant="standard"
                    value={boardDTO.dto.title}
                    name="title"
                />
                <InputLabel className="inputLabel">전월세</InputLabel>
                <TextField
                    id="standard-basic"
                    variant="standard"
                    value={boardDTO.dto.pay_division}
                    name="pay_division"
                />
                <InputLabel className="inputLabel">평수</InputLabel>
                <div className="flexDiv">
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        value={boardDTO.dto.square_feet}
                        name="square_feet"
                    />
                    평
                </div>
                <InputLabel className="inputLabel">금액</InputLabel>
                <div className="flexDiv">
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        value={boardDTO.dto.price}
                        name="price"
                    />
                    원
                </div>
                <div className="editor">
                    <Editor
                        apiKey="7vg6ljyq1brs6eapvpt76mhps7wgko123tgdlrw40ve47amn"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={boardDTO.dto.content}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace",
                                "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "help", "wordcount",
                            ],
                            toolbar:
                                "undo redo | blocks | " +
                                "image | bold italic underline backcolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "table code help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        textareaName="editorContent"
                        onEditorChange={(editorContent, editor) => SetEditorValue(editorContent)}
                    />
                </div>
                <ZipSearchComponent/>
                <Typography style={{margin: 20}} variant="caption" display="block" gutterBottom>
                    기존 주소: {boardDTO.dto.location}</Typography>
                <CardActions className="menuBar">
                    <Button variant="outlined" color="secondary" href="/mainboard/list">
                        목록으로
                    </Button>
                    <Button variant="outlined" type="submit" color="secondary">
                        수정!
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
}

export default ModifyComponent;
