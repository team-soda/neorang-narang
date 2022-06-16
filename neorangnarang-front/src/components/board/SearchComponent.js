import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  useFormControl,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BoardService, { boardService } from "../../../../2차백업/service/BoardService";

const SearchComponent = ({ boardList, setBoardList }) => {
  //const { getBoardList, boardInfo, setBoardInfo } = BoardService();

  // 이렇게 쓰면 안돼용
  //const [type, setType, keyword, setKeyword] = useState()
  const [type, setType] = useState("");
  const [keyword, setKeyword] = useState("");

  // useEffect((type, keyword) => {
  //     getBoardList(type, keyword)
  // }, [reload])

  const typeChange = (event) => {
    //setBoardInfo(event.target.value);
    setType(event.target.value);
  };

  const keywordChange = (event) => {
    //setBoardInfo(event.target.value);
    setKeyword(event.target.value);
  };

  const onSearchHandler = () => {
    boardService.getSearchBoardList(type, keyword, (res) =>
      setBoardList(res.data)
    );
  };

  return (
    <Box
      sx={{ width: "25%", textAlign: "center", margin: "0 auto" }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <FormControl variant="standard" sx={{ m: 1 }}>
        <InputLabel id="demo-simple-select-standard-label">type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={type}
          onChange={typeChange}
          label="type"
        >
          <MenuItem value="">
            <em>select</em>
          </MenuItem>
          <MenuItem value={"T"}>제목</MenuItem>
          <MenuItem value={"W"}>작성자</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: "25ch" }}>
        <InputLabel id="demo-simple-select-standard-label">keyword</InputLabel>
        <Input
          value={keyword}
          onChange={keywordChange}
          placeholder="검색어를 입력하세요!"
        />
      </FormControl>
      <Button sx={{ width: "fit-content" }} onClick={onSearchHandler}>
        {" "}
        검색
      </Button>
    </Box>
  );
};

export default SearchComponent;
