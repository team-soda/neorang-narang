package com.team.neorangnarang.mainboard.service;

import com.team.neorangnarang.mainboard.dto.FavoriteDTO;

import java.util.List;

public interface FavoriteService {
    boolean insertFavorite(FavoriteDTO favoriteDTO);
    List<FavoriteDTO> getFavoriteListByUid(String uid);
    FavoriteDTO getFavoriteByUid(FavoriteDTO favoriteDTO);
    boolean deleteFavoriteByUid(FavoriteDTO favoriteDTO);
}
