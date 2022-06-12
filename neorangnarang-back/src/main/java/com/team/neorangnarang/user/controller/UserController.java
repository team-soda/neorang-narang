package com.team.neorangnarang.user.controller;

import com.team.neorangnarang.common.dto.ResponseDTO;
import com.team.neorangnarang.user.domain.ProviderType;
import com.team.neorangnarang.user.domain.Role;
import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.dto.AuthResponseDTO;
import com.team.neorangnarang.user.dto.UserDTO;
import com.team.neorangnarang.user.security.auth.domain.UserPrincipal;
import com.team.neorangnarang.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
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

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        log.info("userDTO: {}", userDTO);
        try {
            User user = User.builder()
                    .uid(userDTO.getUid())
                    .password(userDTO.getPassword())
                    .phone(userDTO.getPhone())
                    .nickname(userDTO.getUid())
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
        log.info("authenticate userDTO: {}", userDTO.toString());

        User user = User.toUser(userDTO);
        String token = userService.authenticateUser(user);
        return ResponseEntity.ok(new AuthResponseDTO(token));
    }

}
