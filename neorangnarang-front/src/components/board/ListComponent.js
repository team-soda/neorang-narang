import React, { useEffect, useState } from "react";
import BoardService, { boardService } from "../../service/BoardService";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "@material-ui/core";
import EditorComponent from "./EditorComponent";

const ListComponent = ({ boardList, setBoardList }) => {
  //const {getBoardList, boardInfo, setBoardInfo, reload} = BoardService()
  useEffect(() => {
    boardService
      .getBoardList()
      .then((res) => setBoardList(res.data.searchResult));
  }, [setBoardList]);
  const columns = [
    {
      field: "id",
      headerName: "No.",
      flex: 0.3,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1.4,
      renderCell: (id, title) => {
        return <Link to={`/mainboard/read/${id.row.id}`}>{id.row.title}</Link>;
      },
    },
    {
      field: "writer",
      headerName: "Author",
      flex: 0.8,
    },
    {
      field: "like_count",
      headerName: "♡",
      type: "number",
      flex: 0.3,
    },
    {
      field: "created_at",
      headerName: "Date",
      flex: 1,
    },
  ];
  const rows = boardList.map((board) => {
    return {
      id: board.board_idx,
      title: board.title,
      writer: board.writer,
      like_count: board.like_count,
      created_at: board.created_at,
    };
  });

  return (
    <>
      리스트
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
