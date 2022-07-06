import Axios from "../config/axios-config";

const MAIN_BOARD = `/mainboard`;

const getBoardList = async () => {
    return await Axios.get(`${MAIN_BOARD}/list`);
};

const getSearchBoardList = async (type, keyword, setBoardList) => {
    return await Axios.get(
        `${MAIN_BOARD}/list?type=${type}&keyword=${keyword}`
    ).then((response) => {
        console.log(response);
        setBoardList(response.data.dto);
    });
};

const getBoardRead = async (board_idx) => {
    console.log("getBoardRead at React.js");
    return await Axios.get(`${MAIN_BOARD}/read?board_idx=${board_idx}`);
};

// board Register
const registerBoard = async (boardDTO) => {
    console.log("registerBoard at React.js");
    return await Axios.post(`${MAIN_BOARD}/register`, boardDTO).then(
        (response) => {
            response.status === 200
                ? console.log("작성 완료")
                : alert("작성에 실패하였습니다. 다시 시도해주세요.")
        });
};

// board Modify
const modifyBoard = async (newBoard) => {
    console.log("modifyBoard at React.js");
    return await Axios.post(`${MAIN_BOARD}/modify`, newBoard).then((response) => {
        response.status === 200
            ? alert("수정이 완료되었습니다!")
            : alert("수정에 실패하였습니다. 다시 시도해주세요.")
    });
};

// board Delete
const removeBoard = async (boardDTO) => {
    alert("정말 삭제할까요?");
    return await Axios.post(
        `${MAIN_BOARD}/delete/${boardDTO.dto.board_idx}`
    ).then((response) => {
        response.status === 200
            ? console.log("삭제 완료")
            : alert("삭제에 실패하였습니다. 다시 시도해주세요.")
    });
};

export const boardService = {
    getBoardList,
    getSearchBoardList,
    getBoardRead,
    registerBoard,
    modifyBoard,
    removeBoard,
};
