import {useState} from "react";
import axios from "axios";
import {API_BASE_URL} from "../config/url-config";

// List 출력
const boardInfoState = {
    type: '',
    keyword: '',
    searchResult: []
}

// 상세 글 조회
const boardDTOState = {
    created_dt:'',
    imageTags: '',
    dto: []
}

export default () => {

    const [reload, setReload] = useState(false)

    // board List
    const [boardInfo, setBoardInfo] = useState(boardInfoState)

    const getBoardList = async (type, keyword) => {
        const response = await axios.get(`${API_BASE_URL}/mainboard/list?type=${type}&keyword=${keyword}`)
        setBoardInfo(response.data)
    }

    // board Read
    const [boardDTO, setBoardDTO] = useState(boardDTOState)

    const getBoardRead = async (board_idx) => {
        console.log('getBoardRead at React.js')
        const response = await axios.get(`${API_BASE_URL}/mainboard/read?board_idx=${board_idx}`)
        setBoardDTO(response.data)
        console.log('read 불러왔음!');
    }

    // board Register
    const registerBoard = async (boardDTO) => {
        console.log('registerBoard at React.js')
        const response = await axios.post(`${API_BASE_URL}/mainboard/register`, boardDTO)
        alert('작성이 완료되었습니다!')
        window.location = `/mainboard/read?board_idx=${boardDTO.dto.board_idx}`;
    }

    // board Modify
    const modifyBoard = async (boardDTO) => {
        console.log('modifyBoard at React.js')
        const response = await axios.post(`${API_BASE_URL}/mainboard/modify`, boardDTO)
        alert('수정이 완료되었습니다!')
        window.location = `/mainboard/read?board_idx=${boardDTO.dto.board_idx}`;
    }

    // board Delete
    const removeBoard = async () => {
        alert('정말 삭제할까요?')
        const response = await axios.post(`${API_BASE_URL}/mainboard/delete/${boardDTO.dto.board_idx}`)
        alert('삭제가 완료되었습니다!')
        window.location = `/mainboard/list`
    }

    return {
        reload,
        boardInfo,
        setBoardInfo,
        getBoardList,
        boardDTO,
        setBoardDTO,
        getBoardRead,
        registerBoard,
        modifyBoard,
        removeBoard
    }
}