package com.team.neorangnarang.user.controller;

import com.team.neorangnarang.common.dto.ResponseDTO;
import com.team.neorangnarang.exception.BadRequestException;
import com.team.neorangnarang.exception.UserNotFoundException;
import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.dto.AuthResponseDTO;
import com.team.neorangnarang.user.dto.UserDTO;
import com.team.neorangnarang.user.security.auth.dto.EmailCheckDTO;
import com.team.neorangnarang.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
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
        try {
            String token = userService.authenticateUser(user);
            User resultUser = userService.getUserInfo(user);
            return ResponseEntity.ok(new AuthResponseDTO(token, resultUser));
        } catch (AuthenticationException e) {
            log.info("토큰없음");
            String errorMsg = null;
            if (e instanceof InternalAuthenticationServiceException ||
                    e instanceof BadCredentialsException) {
                errorMsg = "아이디 또는 비밀번호를 다시 한번 확인해 주세요.";
            } else {
                errorMsg = "알 수 없는 오류입니다.";
            }
            log.error(errorMsg);
            ResponseDTO response = ResponseDTO.builder().error(errorMsg).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        log.info("userDTO: {}", userDTO);
        try {
            userDTO.setNickname(userDTO.getUid());
            User user = UserDTO.toUser(userDTO);
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
        try {
            User user = User.builder().email(userDTO.getEmail()).build();
            String code = userService.sendAuthEmail(user);
            return ResponseEntity.ok(code);
        } catch (Exception e) {
            ResponseDTO response = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/signup/authCodeCheck")
    public ResponseEntity<?> authCodeCheck(@RequestBody EmailCheckDTO emailCheckDTO) {
        log.info("authCodeCheck emailCheckDTO: {}", emailCheckDTO.toString());
        String getEmail = userService.getUserEmailByCode(emailCheckDTO.getCode());

        if (getEmail == null) {
            throw new UserNotFoundException("요청된 코드로 검색된 이메일이 존재하지 않습니다.");
        }

        if (getEmail.equals(emailCheckDTO.getEmail())) {
            return ResponseEntity.ok("인증 성공");
        }

        return ResponseEntity.badRequest().body(new BadRequestException("인증코드가 일치하지 않습니다."));
    }

    /*@PostMapping("/signup/authCodeCheck")
    public ResponseEntity<Boolean> authCodeCheck(@RequestBody EmailCheckDTO emailCheckDTO) {
        log.info("authCodeCheck emailCheckDTO: {}", emailCheckDTO.toString());
        try {
            String getEmail = userService.getUserEmailByCode(emailCheckDTO.getCode());
            //User user = User.builder().email(getEmail).build();
            if (getEmail.equals(emailCheckDTO.getEmail())) {
                return ResponseEntity.ok(true);
            }
            return ResponseEntity.ok(false);
        } catch (Exception e) {
            //ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            //e.printStackTrace();
            return ResponseEntity.badRequest().body(false);
        }

    }*/
}
