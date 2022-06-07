package com.team.neorangnarang.mainboard.controller;

import com.team.neorangnarang.mainboard.dto.MainboardDTO;
import com.team.neorangnarang.mainboard.service.MainboardService;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j2
@Controller
@RequiredArgsConstructor
@RequestMapping("/mainboard")
public class MainboardController {

    private final MainboardService boardService;

/*    @GetMapping("/list")
    public void getMainList(){

    }*/

    @ResponseBody
    @GetMapping("/list")
    public Map<String, Object> getList(@RequestParam Map<String, Object> param) {

        List<Map<String, Object>> getSearchList = boardService.getBoardList(param);
        Map<String, Object> getSearchListMap = new HashMap<>();
        getSearchListMap.put("searchResult", getSearchList);

        return getSearchListMap;
    }

//    @ResponseBody
//    @PostMapping("/list")
//    public Map<String, Object> getSearchList(@RequestBody Map<String, Object> param){
//        log.info("MainboardController getList Now postData is >>>>> "+param);
//        List<Map<String, Object>> getSearchList = boardService.getBoardList(param);
//        Map<String, Object> getSearchListMap = new HashMap<>();
//        getSearchListMap.put("searchResult", getSearchList);
//
//        log.info("Map에 들어간 게시글 목록 결과??? >>> " + getSearchListMap);
//
//        return getSearchListMap;
//
//    }

    @GetMapping("/register")
    public void register() {}

    @PostMapping("/register")
    public String registerPost(MainboardDTO boardDTO, RedirectAttributes redirectAttributes){

        Long board_idx = boardService.register(boardDTO);

        log.info("board_idx : " + board_idx);
        log.info("작성 글 DTO : "+ boardDTO);

        redirectAttributes.addFlashAttribute("board_idx", board_idx);

        return "redirect:/mainboard/read?board_idx="+board_idx;
    }

    @GetMapping(value = {"/read", "/modify"})
    public void read(@RequestParam (value = "board_idx", required=false) Long board_idx, Model model) {

        log.info("read Controller board_idx??? >>>> " + board_idx);

        model.addAttribute("dto", boardService.read(board_idx));
    }

//    @ResponseBody
    @PostMapping("/modify")
    public String modifyPost(MainboardDTO mainboardDTO, RedirectAttributes redirectAttributes){

        log.info("--------------------------------");
        log.info("Mainboard Controller Modify Now!!!");
        log.info("--------------------------------");

        if(boardService.modify(mainboardDTO)){
            redirectAttributes.addFlashAttribute("result","modified");
        }

        return "redirect:/mainboard/read?board_idx="+mainboardDTO.getBoard_idx();
    }

    @ResponseBody
    @PostMapping("/delete/{board_idx}")
    public void delete(@PathVariable("board_idx") Long board_idx){
        boardService.delete(board_idx);
    }
}
