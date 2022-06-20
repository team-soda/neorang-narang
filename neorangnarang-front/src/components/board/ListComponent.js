import React, {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {boardService} from "../../service/BoardService";
import {Link} from "react-router-dom";

const ListComponent = () => {
    const boardInfoState = {
        type: "",
        keyword: "",
        searchResult: [],
    };

    const [boardList, setBoardList] = useState(boardInfoState);

    useEffect(() => {
        boardService.getBoardList().then((res) => {
            setBoardList(res.data);
        });
    }, [setBoardList]);

    console.log(boardList);

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

    const rows = boardList.searchResult.map((board) => {
        return {
            id: board.board_idx,
            title: board.title,
            writer: board.writer,
            like_count: board.like_count,
            created_at: board.created_at,
            pay_division: board.pay_division,
        };
    });

    return (
        <>
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
