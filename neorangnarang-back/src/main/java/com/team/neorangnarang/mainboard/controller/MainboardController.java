package com.team.neorangnarang.mainboard.controller;

import com.team.neorangnarang.mainboard.dto.MainboardDTO;
import com.team.neorangnarang.mainboard.service.MainboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/mainboard")
public class MainboardController {

    private final MainboardService boardService;

    @GetMapping("/list")
    public Map<String, Object> getList(@RequestParam Map<String, Object> param) {

        log.info("boardController getList!!!");

        List<Map<String, Object>> getSearchList = boardService.getBoardList(param);

        Map<String, Object> getSearchListMap = new HashMap<>();

        getSearchListMap.put("searchResult", getSearchList);

        return getSearchListMap;
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/register")
    public void register() {
    }

    @PostMapping("/register")
    public String registerPost(@RequestBody MainboardDTO boardDTO, RedirectAttributes redirectAttributes) {

        Long board_idx = boardService.register(boardDTO);

        redirectAttributes.addFlashAttribute("board_idx", board_idx);

        return "redirect:/mainboard/read?board_idx=" + board_idx;
    }

    @GetMapping(value = {"/read", "/modify"})
    public Map<Object, Object> read(@RequestParam(value = "board_idx", required = false) Long board_idx) {

        log.info("boardController read or modify!!!");

        MainboardDTO dto = boardService.read(board_idx);

        LocalDateTime created_at = dto.getCreated_at();

        String created_dt = created_at.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        Map<Object, Object> dtoMap = new HashMap<>();

        dtoMap.put("dto", dto);
        dtoMap.put("created_dt", created_dt);
        dtoMap.put("imageTags", dto.getImageTags());

        return dtoMap;
    }

    @PostMapping("/modify")
    public String modifyPost(MainboardDTO mainboardDTO, RedirectAttributes redirectAttributes) {

        if (boardService.modify(mainboardDTO)) {
            redirectAttributes.addFlashAttribute("result", "modified");
        }

        return "redirect:/mainboard/read?board_idx=" + mainboardDTO.getBoard_idx();
    }

    @ResponseBody
    @PostMapping("/delete/{board_idx}")
    public void delete(@PathVariable("board_idx") Long board_idx) {
        boardService.delete(board_idx);
    }
}
