package com.team.neorangnarang.mainboard.mapper;

import com.team.neorangnarang.mainboard.dto.MainboardDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MainboardMapper {

    List<MainboardDTO> getBoardList(Map<String, Object> param);
    Long insert(MainboardDTO mainboardDTO);
    MainboardDTO select(Long board_idx);
    void updateViewCount(long board_idx);
    void delete(long board_idx);
    Long update(MainboardDTO newBoard);

    // 다슬 작성
    // 작성글 리스트 조회
    List<MainboardDTO> getBoardListByUid(String uid);

    // 찜(좋아요) 클릭시 like_count update
    int updateLikeCount(Long board_idx);
}
