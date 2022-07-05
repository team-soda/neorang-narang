import React, {useState, useRef} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {boardService} from "../../service/BoardService";
import {FormControl, Input, InputLabel, MenuItem, Select} from "@mui/material";

const SearchComponent = ({setBoardList}) => {

    const nodeRef = useRef(null);

    const [type, setType] = useState("");
    const [keyword, setKeyword] = useState("");

    const typeChange = (e) => {
        setType(e.target.value);
    };

    const keywordChange = (e) => {
        setKeyword(e.target.value);
    };

    const onSearchHandler = () => {
        boardService.getSearchBoardList(type, keyword, (res) =>
            setBoardList(res.data)
        );
    };

    return (
        <Box
            sx={{
                width: "fit-content",
                textAlign: "center",
                alignItems: "end",
                margin: "0 auto",
                marginBottom: 5,
                display: 'flex'
            }}
            component="form"
            noValidate
            autoComplete="off"
        >
            <>
                <FormControl variant="standard" sx={{m: 1}}>
                    <InputLabel id="demo-simple-select-standard-label">type</InputLabel>

                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="type"
                        value=""
                        name="type"
                        onChange={typeChange}
                    >
                        <MenuItem value="">
                            <em>Select</em>
                        </MenuItem>
                        <MenuItem value={"T"}>제목</MenuItem>
                        <MenuItem value={"W"}>작성자</MenuItem>
                    </Select>
                </FormControl>
            </>
            <FormControl sx={{width: "25ch"}}>
                <InputLabel id="demo-simple-select-standard-label">keyword</InputLabel>
                <Input
                    name="keyword"
                    value={keyword}
                    onChange={keywordChange}
                    placeholder="검색어를 입력하세요!"
                />
            </FormControl>
            <Button sx={{width: "fit-content"}} onClick={onSearchHandler}>
                {" "}
                검색
            </Button>
        </Box>
    );
};

export default SearchComponent;
