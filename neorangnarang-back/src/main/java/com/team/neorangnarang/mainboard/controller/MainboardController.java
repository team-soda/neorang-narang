package com.team.neorangnarang.mainboard.controller;

import com.team.neorangnarang.common.dto.ResponseDTO;
import com.team.neorangnarang.exception.BadRequestException;
import com.team.neorangnarang.mainboard.dto.MainboardDTO;
import com.team.neorangnarang.mainboard.dto.PageResponseDTO;
import com.team.neorangnarang.mainboard.service.MainboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/mainboard")
public class MainboardController {

    private final MainboardService boardService;

    @ResponseBody
    @GetMapping("/list")
    public Map<String, Object> getList(@RequestParam Map<String, Object> param) {

        PageResponseDTO<MainboardDTO> responseDTO = boardService.getBoardList(param);

        Map<String, Object> dto = new HashMap<>();

        dto.put("dto", responseDTO);

        return dto;
    }

    @GetMapping("/register")
    public void register() {
    }

    @PostMapping("/register")
    public Long registerPost(@RequestBody MainboardDTO boardDTO, RedirectAttributes redirectAttributes) {

        Long board_idx = boardService.register(boardDTO);

        redirectAttributes.addFlashAttribute("board_idx", board_idx);

        return board_idx;
    }

    @GetMapping(value = {"/read", "/modify"})
    public Map<Object, Object> read(@RequestParam(value = "board_idx", required = false) Long board_idx) {

        MainboardDTO dto = boardService.read(board_idx);

        Map<Object, Object> dtoMap = new HashMap<>();

        dtoMap.put("dto", dto);
        dtoMap.put("imageTags", dto.getImageTags());

        return dtoMap;
    }

    @PostMapping("/modify")
    public ResponseEntity<?> modifyPost(@RequestBody MainboardDTO newBoard) {

        boardService.modify(newBoard);

        return ResponseEntity.ok("result");
    }

    @ResponseBody
    @PostMapping("/delete/{board_idx}")
    public void delete(@PathVariable("board_idx") Long board_idx) {
        boardService.delete(board_idx);
    }

    // 다슬 작성
    @GetMapping("/getBoardListByUid/{uid}")
    public ResponseEntity<?> getBoardListByUid(@PathVariable("uid") String uid) {
        ResponseDTO<MainboardDTO> response = null;
        try {
            List<MainboardDTO> boards = boardService.getBoardListByUid(uid);
            response = ResponseDTO.<MainboardDTO>builder().listData(boards).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDTO.<MainboardDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/putLikeCount")
    public ResponseEntity<?> updateLikeCount(@RequestBody Long board_idx) {
        ResponseDTO<MainboardDTO> response = null;
        try{
            boolean isResult = boardService.updateLikeCount(board_idx);
            if(!isResult) {
                throw new BadRequestException("수정 실패");
            }

            MainboardDTO dto = boardService.read(board_idx);
            response = ResponseDTO.<MainboardDTO>builder().objData(dto).build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = ResponseDTO.<MainboardDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
