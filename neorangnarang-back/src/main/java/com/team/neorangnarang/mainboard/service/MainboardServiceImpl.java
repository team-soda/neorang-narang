package com.team.neorangnarang.mainboard.service;

import com.team.neorangnarang.mainboard.dto.MainboardDTO;
import com.team.neorangnarang.mainboard.dto.PageRequestDTO;
import com.team.neorangnarang.mainboard.dto.PageResponseDTO;
import com.team.neorangnarang.mainboard.mapper.MainboardMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Log4j2
@Service
public class MainboardServiceImpl implements MainboardService {

    @Autowired
    private MainboardMapper boardMapper;

    @Override
    public PageResponseDTO<MainboardDTO> getBoardList(Map<String, Object> param) {

        List<MainboardDTO> dtoList = boardMapper.getBoardList((Map<String, Object>) param).stream().map(mainboardDTO -> mainboardDTO.getDTO()).collect(Collectors.toList());

        PageResponseDTO<MainboardDTO> pageResponseDTO = PageResponseDTO.<MainboardDTO>builder()
                .dtoList(dtoList)
                .build();

        return pageResponseDTO;
    }

    @Override
    public Long register(MainboardDTO mainboardDTO) {

        boardMapper.insert(mainboardDTO);

        Long board_idx = mainboardDTO.getBoard_idx();

        return board_idx;
    }

    @Override
    public MainboardDTO read(long board_idx) {

        MainboardDTO boardDTO = boardMapper.select(board_idx);

        boardMapper.updateViewCount(board_idx);

        return boardDTO.getDTO();
    }

    @Override
    public boolean modify(MainboardDTO newBoard) {

        log.info("board Service Impl modify 결과 >>> ");
        log.info(boardMapper.update(newBoard) > 0);

        return boardMapper.update(newBoard) > 0;
    }

    @Override
    public void delete(long board_idx) {
        boardMapper.delete(board_idx);
    }

    // 다슬 작성
    @Override
    public List<MainboardDTO> getBoardListByUid(final String uid) {
        log.info("board Service Impl 작성글 조회 uid: " + uid);
        return boardMapper.getBoardListByUid(uid);
    }
}
