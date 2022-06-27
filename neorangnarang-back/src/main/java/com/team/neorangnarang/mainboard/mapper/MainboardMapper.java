package com.team.neorangnarang.mainboard.mapper;

import com.team.neorangnarang.mainboard.dto.MainboardDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MainboardMapper {

    List<MainboardDTO> getBoardList(Map<String, Object> param);
    Long insert(MainboardDTO mainboardDTO);
    MainboardDTO select(long board_idx);
    void updateViewCount(long board_idx);
    void delete(long board_idx);
    Long update(MainboardDTO newBoard);
}
