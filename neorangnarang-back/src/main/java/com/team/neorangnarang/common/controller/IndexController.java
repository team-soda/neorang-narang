package com.team.neorangnarang.common.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
public class IndexController {

    @GetMapping("/")
    public String getIndex() {
        // 아직 안 만들어둔 main 페이지
        return "메인~~";
    }

}
