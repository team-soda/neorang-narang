package com.team.neorangnarang.mainboard.service;

import com.team.neorangnarang.mainboard.dto.MainboardDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Transactional
public interface MainboardService {

    List<Map<String, Object>> getBoardList(Map<String, Object> paramMap);
    Long register(MainboardDTO mainboardDTO);
    MainboardDTO read(long board_idx);
    void delete(long board_idx);
    boolean modify(MainboardDTO mainboardDTO);
}
