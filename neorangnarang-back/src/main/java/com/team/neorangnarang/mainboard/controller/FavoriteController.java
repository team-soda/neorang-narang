package com.team.neorangnarang.mainboard.controller;

import com.team.neorangnarang.common.dto.ResponseDTO;
import com.team.neorangnarang.exception.BadRequestException;
import com.team.neorangnarang.mainboard.dto.FavoriteDTO;
import com.team.neorangnarang.mainboard.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/favorite")
public class FavoriteController {
    private final FavoriteService favoriteService;

//    @PostMapping("/like")
//    public Map<String, Object> getLikeCount(@RequestParam Map<String, Object> boardLikeKeyword){
//        log.info("Like post Controller now!!!");
//
//
//    }

    // 다슬 작성
    @PostMapping("/insertFavorite")
    public ResponseEntity<?> registerFavorite(@RequestBody FavoriteDTO favoriteDTO) {
        ResponseDTO<FavoriteDTO> response = null;
        try {
            boolean isResult = favoriteService.insertFavorite(favoriteDTO);
            if(!isResult) throw new BadRequestException("입력 실패");
            FavoriteDTO dto = favoriteService.getFavoriteByUid(favoriteDTO);
            response = ResponseDTO.<FavoriteDTO>builder().objData(dto).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDTO.<FavoriteDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/getFavoriteList/{uid}")
    public ResponseEntity<?> getFavoriteList(@PathVariable("uid") String uid) {
        ResponseDTO<FavoriteDTO> response = null;
        try {
            List<FavoriteDTO> favorites = favoriteService.getFavoriteListByUid(uid);
            response = ResponseDTO.<FavoriteDTO>builder().listData(favorites).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDTO.<FavoriteDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/getFavorite")
    public ResponseEntity<?> getFavoriteByUid(@RequestParam(value="fk_uid") String uid, @RequestParam(value = "fk_board_idx") Long board_idx) {
        FavoriteDTO favoriteDTO = FavoriteDTO.builder().fk_uid(uid).fk_board_idx(board_idx).build();
        ResponseDTO<FavoriteDTO> response = null;
        try {
            FavoriteDTO dto = favoriteService.getFavoriteByUid(favoriteDTO);

            if(dto == null) {
                throw new NullPointerException("데이터 없음");
            }

            response = ResponseDTO.<FavoriteDTO>builder().objData(dto).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDTO.<FavoriteDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/deleteFavorite")
    public ResponseEntity<?> deleteFavoriteByUid(@RequestBody FavoriteDTO favoriteDTO) {
        ResponseDTO<FavoriteDTO> response = null;
        try {
            boolean isResult = favoriteService.deleteFavoriteByUid(favoriteDTO);
            if(!isResult) throw new BadRequestException("삭제 실패");
            List<FavoriteDTO> favorites = favoriteService.getFavoriteListByUid(favoriteDTO.getFk_uid());
            response = ResponseDTO.<FavoriteDTO>builder().listData(favorites).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDTO.<FavoriteDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
