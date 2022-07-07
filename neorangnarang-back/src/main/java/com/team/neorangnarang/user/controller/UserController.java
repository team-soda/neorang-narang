package com.team.neorangnarang.user.controller;

import com.team.neorangnarang.common.dto.ResponseDTO;
import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.security.auth.domain.UserPrincipal;
import com.team.neorangnarang.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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
    public ResponseEntity<?> getAuthUser(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.info("getAuthUser userPrincipal: {}", userPrincipal.toString());
        UserPrincipal userInfo = UserPrincipal.builder().user(userService.getUserInfo(userPrincipal.getUser())).build();
        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/{uid}")
    public ResponseEntity<?> getUserInfo(@PathVariable("uid") String uid) {
        log.info("getUserInfo uid: {}", uid);
        User user = User.builder().uid(uid).build();
        ResponseDTO<User> response = ResponseDTO.<User>builder().objData(userService.getUserInfo(user)).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getUserByIdx/{idx}")
    public ResponseEntity<?> getUserInfoByIdx(@PathVariable("idx") Long idx) {
        log.info("getUserInfoByIdx idx: {}", idx);
        User user = User.builder().user_idx(idx).build();
        ResponseDTO<User> response = ResponseDTO.<User>builder().objData(userService.getUserInfoByIdx(user)).build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                        @RequestPart(required = false) String nickname,
                                        @RequestPart(required = false) MultipartFile file) throws IOException {
        log.info("updateUser userPrincipal: {}", userPrincipal.toString());
        log.info("updateUser nickname: {}", nickname);
        try {
            User updateResult = userService.updateUser(userPrincipal.getUser(), nickname, file);
            return ResponseEntity.ok(updateResult);
        } catch (Exception e) {
            ResponseDTO response = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
