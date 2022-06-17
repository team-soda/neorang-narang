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

    @GetMapping
    public ResponseEntity<?> getAuthUser(Authentication authentication) {
        log.info("getUser authentication: {}", authentication.getPrincipal());

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        return ResponseEntity.ok(userPrincipal);
    }

    @GetMapping("/{uid}")
    public ResponseEntity<?> getUserInfo(@PathVariable("uid") String uid) {
        log.info("getUserInfo uid: {}", uid);
        User user = User.builder().uid(uid).build();
        ResponseDTO<User> response = ResponseDTO.<User>builder().objData(userService.getUserInfo(user)).build();
        return ResponseEntity.ok(response);
    }

    @PutMapping
    public ResponseEntity<?> updateUser(Authentication authentication, @RequestBody UserDTO userDTO) {
        log.info("updateUser authentication: {}", authentication);
        log.info("updateUser userDTO: {}", userDTO);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = User.builder()
                .uid(userPrincipal.getUsername())
                .nickname(userDTO.getNickname())
                .profile_img(userDTO.getProfile_img())
                .build();

        User updateUser = userService.updateUser(user);
        ResponseDTO<User> response = ResponseDTO.<User>builder().objData(updateUser).build();
        return ResponseEntity.ok(response);
    }
}
