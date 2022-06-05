package com.team.neorangnarang.user.controller;

import com.team.neorangnarang.common.dto.ResponseDTO;
import com.team.neorangnarang.user.domain.ProviderType;
import com.team.neorangnarang.user.domain.Role;
import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.dto.UserDTO;
import com.team.neorangnarang.user.security.TokenProvider;
import com.team.neorangnarang.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class UserController {
    private final UserService userService;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping("/test")
    public String selectTime() {
        return userService.selectTime();
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        log.info("userDTO: {}", userDTO);
        try {
            User user = User.builder()
                    .id(userDTO.getId())
                    .password(passwordEncoder.encode(userDTO.getPassword()))
                    .phone(userDTO.getPhone())
                    .nickname(userDTO.getId())
                    .role(Role.USER)
                    .provider(ProviderType.LOCAL)
                    .build();
            userService.createUser(user);
            return ResponseEntity.ok().body("성공");
        } catch (Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(@RequestBody UserDTO userDTO) {
        User user = userService.getByCredentials(userDTO.getId(), userDTO.getPassword(), passwordEncoder);
        log.info("authenticate user: {}", user);
        if (user != null) {
            final String token = tokenProvider.create(user);
            final UserDTO responseUserDTO = UserDTO.builder()
                    .user_idx(user.getUser_idx())
                    .id(user.getId())
                    .nickname(user.getNickname())
                    .token(token)
                    .build();

            log.info("responseUserDTO: {}", responseUserDTO);

            return ResponseEntity.ok().body(responseUserDTO);
        } else {
            ResponseDTO responseDTO = ResponseDTO.builder()
                    .error("Login failed.")
                    .build();

            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
