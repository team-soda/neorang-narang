import React, {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {boardService} from "../../service/BoardService";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import {FormControl, Input, InputLabel, MenuItem, Select} from "@material-ui/core";
import Button from "@mui/material/Button";

const ListComponent = () => {

    const boardInfoState = {
        dtoList: [],
    };

    const [boardList, setBoardList] = useState(boardInfoState);

    useEffect(() => {
        boardService.getBoardList().then((res) => {
            setBoardList(res.data.dto);
        });
    }, []);

    const columns = [
        {
            field: "id",
            headerName: "　",
            flex: 0.3,
        },
        {
            field: "pay_division",
            headerName: "전월세",
            flex: 0.3,
        },
        {
            field: "title",
            headerName: "제목",
            flex: 1.4,
            renderCell: (id) => {
                return <Link to={`/mainboard/read/${id.row.id}`}
                             style={{textDecoration: 'none', color: '#ffc44b'}}>{id.row.title}</Link>;
            },
        },
        {
            field: "writer",
            headerName: "글쓴이",
            flex: 0.8,
        },
        {
            field: "created_at",
            headerName: "작성일",
            flex: 1,
        },
        {
            field: "like_count",
            headerName: "♡",
            type: "number",
            flex: 0.3,
        },
    ];

    const rows = boardList.dtoList.map((board) => {
        return {
            id: board.board_idx,
            title: board.title,
            writer: board.writer,
            like_count: board.like_count,
            created_at: board.created_dt,
            pay_division: board.pay_division,
        };
    });

    const [type, setType] = useState("");
    const [keyword, setKeyword] = useState("");

    const typeChange = (event) => {
        setType(event.target.value);
    };

    const keywordChange = (event) => {
        setKeyword(event.target.value);
    };

    const onSearchHandler = () => {
        console.log('결과값>>>' + type, keyword)
        boardService.getSearchBoardList(type, keyword, (res) =>
            setBoardList(res)
        );
    };

    return (
        <>
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
                <FormControl variant="standard" sx={{m: 1}}>
                    <InputLabel id="demo-simple-select-standard-label">type</InputLabel>
                    <Select
                        style={{minWidth: 70}}
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
                <FormControl sx={{width: "25ch"}}>
                    <InputLabel id="demo-simple-select-standard-label">keyword</InputLabel>
                    <Input
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
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={8}
                disableSelectionOnClick
                autoHeight={true}
                disableExtendRowFullWidth={true}
            />
        </>
    );
};

export default ListComponent;
