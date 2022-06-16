import React, { useEffect, useRef, useState } from "react";
import { boardService } from "../../../../2차백업/service/BoardService";
import Card from "@mui/material/Card";
import {
  Button,
  CardActions,
  CardHeader,
  InputLabel,
  TextField,
} from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";

function ModifyComponent({ board_idx }) {

  const boardDTOState = {
    created_dt:'',
    imageTags: '',
    dto: []
  }

  const editorRef = useRef(null);
  const [boardDTO, setBoardDTO] = useState(boardDTOState);

  useEffect(() => {
    boardService.getBoardRead(board_idx).then((res) => {
      setBoardDTO(res.data);
    });
  }, [board_idx, setBoardDTO]);

  // const onChangeHandler = (e) => {
  //   console.log(e);
  //   setBoardDTO({
  //     [e.target.title]: e.target.value,
  //     [e.target.writer]: e.target.value,
  //     [e.target.pay_division]: e.target.value,
  //     [e.target.square_feet]: e.target.value,
  //     [e.target.price]: e.target.value,
  //     [e.target.location]: e.target.value,
  //   });
  // };

  const submitData = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const newBoard = {
      title: data.get("title"),
      writer: data.get("writer"),
      content: data.get("content"),
      pay_division: data.get("pay_division"),
      square_feet: data.get("square_feet"),
      price: data.get("price"),
      location: data.get("location")
    };

    boardService.modifyBoard(newBoard);
  };

  return (
    <Card
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30ch" },
      }}
    >
      <CardHeader title={"룸메이트 구하기 수정"} />
      <form onSubmit={submitData}>
        <InputLabel className="inputLabel">제목</InputLabel>
        <TextField
          id="standard-basic"
          variant="standard"
          value={boardDTO.dto.title}
          name="title"
          // onChange={onChangeHandler}
        />
        <InputLabel className="inputLabel">전월세</InputLabel>
        <TextField
          id="standard-basic"
          variant="standard"
          value={boardDTO.dto.pay_division}
          // onChange={onChangeHandler}
          name="pay_division"
        />
        <InputLabel className="inputLabel">평수</InputLabel>
        <div className="flexDiv">
          <TextField
            id="standard-basic"
            variant="standard"
            value={boardDTO.dto.square_feet}
            // onChange={onChangeHandler}
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
            // onChange={onChangeHandler}
            name="price"
          />
          원
        </div>
        <Editor
          apiKey="7vg6ljyq1brs6eapvpt76mhps7wgko123tgdlrw40ve47amn"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={boardDTO.dto.content}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "image | bold italic underline backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "table code help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          textareaName="content"
        />
        <InputLabel className="inputLabel">주소</InputLabel>
        <TextField
          id="standard-basic"
          variant="standard"
          value={boardDTO.dto.location}
          // onChange={onChangeHandler}
          name="location"
        />
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
