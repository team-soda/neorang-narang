package com.team.neorangnarang.mainboard.mapper;

import com.team.neorangnarang.mainboard.dto.FavoriteDTO;
import com.team.neorangnarang.mainboard.dto.MainboardDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface FavoriteMapper {

    // 첫 좋아요인지 판별
    Boolean selectLike(Map<String, Object> boardLikeKeyword);
    // 첫 좋아요의 경우 유저, 글, 좋아요 정보 입력
    Long insertLike(MainboardDTO mainboardDTO);
    // 좋아요 기록이 있는 경우 클릭시 좋아요 상태 변경
    Boolean updateLike(MainboardDTO mainboardDTO);

    // 다슬 작성
    int insertFavorite(FavoriteDTO favoriteDTO);
    List<FavoriteDTO> getFavoriteListByUid(String uid);
    FavoriteDTO getFavoriteByUid(FavoriteDTO favoriteDTO);
    int deleteFavoriteByUid(FavoriteDTO favoriteDTO);
}
