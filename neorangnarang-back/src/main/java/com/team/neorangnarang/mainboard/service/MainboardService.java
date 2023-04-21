package com.team.neorangnarang.mainboard.service;

import com.team.neorangnarang.mainboard.dto.MainboardDTO;
import com.team.neorangnarang.mainboard.dto.PageRequestDTO;
import com.team.neorangnarang.mainboard.dto.PageResponseDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Transactional
public interface MainboardService {

    PageResponseDTO<MainboardDTO> getBoardList(Map<String, Object> param);
    Long register(MainboardDTO mainboardDTO);
    MainboardDTO read(Long board_idx);
    void delete(long board_idx);
    boolean modify(MainboardDTO newBoard);

    // 다슬 작성
    List<MainboardDTO> getBoardListByUid(String uid);
    boolean updateLikeCount(Long board_idx);
    void updateViewCount(Long board_idx);
}
