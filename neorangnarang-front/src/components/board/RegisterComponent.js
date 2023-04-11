import { useRef, useState } from "react";
import { boardService } from "../../service/BoardService";
import Card from "@mui/material/Card";
import { Button, CardActions, CardHeader, TextField } from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";
import ZipSearchComponent from "./ZipSearchComponent";
import { useSelector } from "react-redux";
import { getAuthState } from "../../redux/user/selector/authSelector";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const nav = useNavigate();
  const editorRef = useRef(null);
  const authUser = useSelector(getAuthState);
  const [address, setAddress] = useState();
  const [shortAddress, setShortAddress] = useState();

  const handleComplete = (data) => {
    console.log(data);
    let fullAddress = data.address;
    let halfAddress = data.sido + " " + data.sigungu + " " + data.roadname;
    let extraAddress = "";

    console.log(data);
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
    setShortAddress(halfAddress);
  };

  const submitData = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    console.log(data.get("location"));
    console.log(data.get("short_location"));

    const boardDTO = {
      title: data.get("title"),
      writer: data.get("writer"),
      uid: authUser.uid,
      content: data.get("content"),
      pay_division: data.get("pay_division"),
      square_feet: data.get("square_feet"),
      price: data.get("price"),
      location: data.get("location"),
      short_location: data.get("short_location"),
    };

    await boardService.registerBoard(boardDTO);
    await alert("작성이 완료되었습니다!");
    await nav("/mainboard/list");
    //window.location = `/mainboard/list`;
  };

  return (
    <Card
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30ch" },
      }}
    >
      <CardHeader title="룸메이트 구하기" />
      <form onSubmit={submitData}>
        <TextField
          sx={{ alignSelf: "center" }}
          id="standard-basic"
          label="제목"
          variant="standard"
          placeholder="ex) 룸메이트 구합니다!"
          name="title"
        />
        <TextField
          InputProps={{
            readOnly: true,
          }}
          value={authUser.nickname}
          id="standard-basic"
          label=" "
          variant="standard"
          name="writer"
        />
        <TextField
          id="standard-basic"
          label="전월세"
          variant="standard"
          placeholder="ex) 전세"
          name="pay_division"
        />
        <div className="flexDiv">
          <TextField
            id="standard-basic"
            label="평수"
            variant="standard"
            placeholder="ex) 21"
            name="square_feet"
          />
          평
        </div>
        <div className="flexDiv">
          <TextField
            id="standard-basic"
            label="금액"
            variant="standard"
            placeholder="ex) 30, 숫자만 입력해주세요!"
            name="price"
          />
          만원
        </div>
        <div className="editor">
          <Editor
            apiKey="7vg6ljyq1brs6eapvpt76mhps7wgko123tgdlrw40ve47amn"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>** 이미지를 드래그 앤 드랍해보세요! **</p>"
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
        </div>
        <ZipSearchComponent
          address={address}
          shortAddress={shortAddress}
          handleComplete={handleComplete}
        />
        <CardActions className="menuBar">
          <Button variant="outlined" color="secondary" href="/mainboard/list">
            목록으로
          </Button>
          <Button variant="outlined" type="submit" color="secondary">
            작성!
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default RegisterComponent;
