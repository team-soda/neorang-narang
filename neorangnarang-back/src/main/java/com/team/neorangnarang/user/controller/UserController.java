package com.team.neorangnarang.user.controller;

import com.team.neorangnarang.common.dto.ResponseDTO;
import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.dto.AuthResponseDTO;
import com.team.neorangnarang.user.dto.UserDTO;
import com.team.neorangnarang.user.security.auth.domain.UserPrincipal;
import com.team.neorangnarang.user.security.auth.dto.EmailCheckDTO;
import com.team.neorangnarang.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/test")
    public String selectTime() {
        return userService.selectTime();
    }

    @GetMapping("/getUser")
    public ResponseEntity<?> getUser(Authentication authentication) {
        log.info("getUser authentication: {}", authentication.getPrincipal());

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        return ResponseEntity.ok(new ResponseDTO(userPrincipal));
    }
}
