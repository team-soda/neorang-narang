package com.team.neorangnarang.mainboard.service;

import com.team.neorangnarang.mainboard.dto.FavoriteDTO;
import com.team.neorangnarang.mainboard.mapper.FavoriteMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService{
    private final FavoriteMapper favoriteMapper;

    @Override
    public boolean insertFavorite(final FavoriteDTO favoriteDTO) {
        int result = favoriteMapper.insertFavorite(favoriteDTO);
        if(result > 0) return true;
        return false;
    }

    @Override
    public List<FavoriteDTO> getFavoriteListByUid(final String uid) {
        return favoriteMapper.getFavoriteListByUid(uid);
    }

    @Override
    public FavoriteDTO getFavoriteByUid(final FavoriteDTO favoriteDTO) {
        return favoriteMapper.getFavoriteByUid(favoriteDTO);
    }

    @Override
    public boolean deleteFavoriteByUid(final FavoriteDTO favoriteDTO) {
        int result = favoriteMapper.deleteFavoriteByUid(favoriteDTO);
        if(result > 0 ) return true;
        return false;
    }
}
