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

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.*;
import java.util.Arrays;
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
    public Map<Object, Object> read(@RequestParam(value = "board_idx", required = false) Long board_idx,
                                    HttpServletRequest request, HttpServletResponse response) {
        Map<Object, Object> dtoMap = new HashMap<>();

        try {
            updateViewCount(board_idx, request, response);
            MainboardDTO dto = boardService.read(board_idx);

            dtoMap.put("dto", dto);
            dtoMap.put("imageTags", dto.getImageTags());

        } catch (Exception e) {
            dtoMap.put("error", e.getMessage());
        }
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
        try {
            boolean isResult = boardService.updateLikeCount(board_idx);
            if (!isResult) {
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

    // 조회수 중복 방지
    private void updateViewCount(Long board_idx, HttpServletRequest request, HttpServletResponse response) {
        log.info("updateViewCount");

        Cookie[] cookies = request.getCookies();
        Cookie oldCookie = null;

        // 쿠키 값이 있을 경우
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                // 전체 쿠키 중에서 쿠키 이름이 postView인 것을 찾아 oldCookie 변수에 저장.
                if (cookie.getName().equals("postView")) {
                    oldCookie = cookie;
                }
            }
        }

        // oldCookie 가 존재하면 (postView 쿠키가 있을 경우)
        if (oldCookie != null) {
            // 해당 게시글이 postView 쿠키 값에 없을 경우
            if (!oldCookie.getValue().contains("[" + board_idx + "]")) {
                // 조회수 증가
                boardService.updateViewCount(board_idx);
                // 현재 게시글을 postView 쿠키에 추가
                oldCookie.setValue(oldCookie.getValue() + "[" + board_idx + "]");
            }
        } else { // postView 쿠키가 존재하지 않을 경우
            boardService.updateViewCount(board_idx);
            // 새로운 쿠키 생성
            oldCookie = new Cookie("postView", "[" + board_idx + "]");
        }

        // 오늘의 최대 시간(ex. 23시 59분 59초 ... )과 현재 시간을 초단위로 저장
        long toDayEndSecond = LocalDate.now().atTime(LocalTime.MAX).toEpochSecond(ZoneOffset.of("+09:00"));
        long currentSecond = LocalDateTime.now().toEpochSecond(ZoneOffset.of("+09:00"));

        // 쿠키 만료 시간을 오늘 자정까지 남은 시간으로 지정
        oldCookie.setMaxAge((int) (toDayEndSecond - currentSecond));
        oldCookie.setHttpOnly(true);
        oldCookie.setSecure(true);
        oldCookie.setDomain("localhost");
        oldCookie.setPath("/");

        response.addCookie(oldCookie);
    }
}
