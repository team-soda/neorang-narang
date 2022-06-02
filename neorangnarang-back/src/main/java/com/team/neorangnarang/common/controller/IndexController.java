package com.team.neorangnarang.common.controller;

import com.team.neorangnarang.mainboard.service.MainboardService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Log4j2
@Controller
public class IndexController {

    @Autowired
    private MainboardService boardService;

    @GetMapping("/")
    public String getIndex() {
        // 아직 안 만들어둔 main 페이지
        return "redirect:/main";
    }

    @RequestMapping("/test")
    public String firstMain(Model model){

        String time = boardService.returnTime();
        model.addAttribute("time", time);

        log.info("컨트롤러 time 값??>>>"+time);

        return "test";
    }
}
