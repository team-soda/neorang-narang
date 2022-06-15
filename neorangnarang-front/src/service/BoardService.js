import Axios from "../config/axios-config";

const MAIN_BOARD = "/mainboard";

const getBoardList = async () => {
  return await Axios.get(`${MAIN_BOARD}/list`) /* .then((response) => {
    console.log(response.data.searchResult);
    setBoardList(response.data.searchResult);
  }) */;
};

const getSearchBoardList = async (type, keyword, setBoardList) => {
  return await Axios.get(
    `${MAIN_BOARD}/list?type=${type}&keyword=${keyword}`
  ).then((response) => {
    console.log(response);
    setBoardList(response.data.searchResult);
  });
};

const getBoardRead = async (board_idx, setBoardDTO) => {
  console.log("getBoardRead at React.js");
  return await Axios.get(`${MAIN_BOARD}/read?board_idx=${board_idx}`).then(
    (response) => {
      setBoardDTO(response.data);
      console.log("read 불러왔음!");
    }
  );
};

// board Register
const registerBoard = async (boardDTO) => {
  console.log("registerBoard at React.js");
  return await Axios.post(`${MAIN_BOARD}/register`, boardDTO).then(
    (response) => {
      response.status === 200
        ? alert("작성이 완료되었습니다!")
        : // boardDTO에서 받아도 상관없지만 response 데이터에 idx 값으로 세팅해줘도 좋을듯..?
          (window.location = `/mainboard/read?board_idx=${boardDTO.dto.board_idx}`);
    }
  );
};

// board Modify
const modifyBoard = async (boardDTO) => {
  console.log("modifyBoard at React.js");
  return await Axios.post(`${MAIN_BOARD}/modify`, boardDTO).then((response) => {
    response.status === 200
      ? alert("수정이 완료되었습니다!")
      : (window.location = `/mainboard/read?board_idx=${boardDTO.dto.board_idx}`);
  });
};

// board Delete
const removeBoard = async (boardDTO) => {
  alert("정말 삭제할까요?");
  return await Axios.post(
    `${MAIN_BOARD}/delete/${boardDTO.dto.board_idx}`
  ).then((response) => {
    response.status === 200
      ? alert("삭제가 완료되었습니다!")
      : (window.location = `/mainboard/list`);
  });

  //getBoardList;
};

export const boardService = {
  getBoardList,
  getSearchBoardList,
  getBoardRead,
  registerBoard,
  modifyBoard,
  removeBoard,
};
