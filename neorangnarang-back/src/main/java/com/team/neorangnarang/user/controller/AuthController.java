package com.team.neorangnarang.user.controller;

import com.team.neorangnarang.common.dto.ResponseDTO;
import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.dto.AuthResponseDTO;
import com.team.neorangnarang.user.dto.UserDTO;
import com.team.neorangnarang.user.security.auth.dto.EmailCheckDTO;
import com.team.neorangnarang.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(@RequestBody UserDTO userDTO) {
        log.info("authenticate userDTO: {}", userDTO.toString());

        User user = User.builder()
                .uid(userDTO.getUid())
                .password(userDTO.getPassword())
                .build();
        String token = userService.authenticateUser(user);
        return ResponseEntity.ok(new AuthResponseDTO(token));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        log.info("userDTO: {}", userDTO);

        try {
            userDTO.setNickname(userDTO.getUid());
            User user = User.toUser(userDTO);

            userService.createUser(user);
            return ResponseEntity.ok().body("성공");
        } catch (Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @PostMapping("/signup/authEmailSend")
    public ResponseEntity<?> authEmailSend(@RequestBody UserDTO userDTO) {
        log.info("authEmailSend userDTO: {}", userDTO.toString());
        User user = User.builder().email(userDTO.getEmail()).build();
        return ResponseEntity.ok(userService.sendAuthEmail(user));
    }

    @PostMapping("/signup/authCodeCheck")
    public ResponseEntity<?> authCodeCheck(@RequestBody EmailCheckDTO emailCheckDTO) {
        log.info("authCodeCheck emailCheckDTO: {}", emailCheckDTO.toString());
        String getEmail = userService.getUserEmailByCode(emailCheckDTO.getCode());
        if(getEmail.equals(emailCheckDTO.getEmail())) {
            return ResponseEntity.ok("인증 성공");
        }

        return ResponseEntity.badRequest().body("에러");
    }
}
