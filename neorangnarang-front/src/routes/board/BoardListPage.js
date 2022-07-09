import ListComponent from "../../components/board/ListComponent";
import React from "react";
import AlertComponent from "../../components/board/AlertComponent";
import MainMapComponent from "../../components/board/MainMapComponent";

const BoardListPage = () => {
  return (
    <div>
      <AlertComponent
        text={"검색 외에도 원하는 조건으로 필터를 적용할 수 있어요!"}
      />
      <MainMapComponent />
      <ListComponent />
    </div>
  );
};

export default BoardListPage;
