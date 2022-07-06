import ListComponent from "../../components/board/ListComponent";
import React from "react";
import AlertComponent from "../../components/board/AlertComponent";
import MainMapComponent from "../../components/board/MainMapComponent";

const BoardListPage = () => {
    return (
        <div>
            <AlertComponent/>
            <MainMapComponent/>
            <ListComponent/>
        </div>
    );
};

export default BoardListPage;
