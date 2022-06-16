import Axios from "../../../2차백업/config/axios-config";

const MAIN_BOARD = "/mainboard";

const getBoardList = async () => {
    return await Axios.get(`${MAIN_BOARD}/list`);
};

const getSearchBoardList = async (type, keyword, setBoardList) => {
    return await Axios.get(
        `${MAIN_BOARD}/list?type=${type}&keyword=${keyword}`
    ).then((response) => {
        console.log(response);
        setBoardList(response.data.searchResult);
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
                ? alert("작성이 완료되었습니다!")(window.location = `/mainboard/read?board_idx=${boardDTO.dto.board_idx}`)
                : alert("작성에 실패하였습니다. 다시 시도해주세요.")
        });
};

// board Modify
const modifyBoard = async (boardDTO) => {
    console.log("modifyBoard at React.js");
    return await Axios.post(`${MAIN_BOARD}/modify`, boardDTO).then((response) => {
        response.status === 200
            ? alert("수정이 완료되었습니다!")(window.location = `/mainboard/read?board_idx=${boardDTO.dto.board_idx}`)
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
            ? alert("삭제가 완료되었습니다!")(window.location = `/mainboard/list`)
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
