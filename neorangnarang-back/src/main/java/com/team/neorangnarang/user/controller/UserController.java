package com.team.neorangnarang.user.controller;

import com.team.neorangnarang.common.dto.ResponseDTO;
import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.dto.AuthResponseDTO;
import com.team.neorangnarang.user.dto.ProfileImgDTO;
import com.team.neorangnarang.user.dto.UserDTO;
import com.team.neorangnarang.user.security.auth.domain.UserPrincipal;
import com.team.neorangnarang.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Value("${spring.servlet.multipart.location}")
    private String uploadPath;

    @GetMapping("/test")
    public String selectTime() {
        return userService.selectTime();
    }

    @GetMapping
    public ResponseEntity<?> getAuthUser(Authentication authentication) {
        log.info("getAuthUser authentication: {}", authentication.getPrincipal());

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
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

    @PostMapping("/profile-image-upload")
    public ResponseEntity<?> profileImgUpload(@RequestBody ProfileImgDTO imgDTO) {
        log.info("profileImgUpload imgDTO: {}", imgDTO.toString());
        try {
            if(imgDTO.getPath().isEmpty()) {
                throw new Exception("No Image");
            }

            Path root = Paths.get(uploadPath);
            if(!Files.exists(root)) {
                Files.createDirectories(root);
            }

            File file = new File(String.valueOf(root), imgDTO.getNewName());
            log.info(file);

            byte[] decodeByte = Base64.decodeBase64(imgDTO.getPath().getBytes(StandardCharsets.UTF_8));
            log.info(decodeByte);

            FileOutputStream fos = new FileOutputStream(file);
            fos.write(decodeByte);
            fos.close();
            log.info(fos);

            imgDTO.setPath(String.valueOf(file));

            return ResponseEntity.ok(imgDTO);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseDTO response = ResponseDTO.<ProfileImgDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    /*@GetMapping("/profile-image/{fileName}")
    public ResponseEntity<Resource> getProfileImg(@PathVariable("fileName") String fileName) throws IOException {
        log.info("getProfileImg fileName: {}", fileName);
        Path path = Paths.get(uploadPath + fileName);
        Resource resource = new InputStreamResource(Files.newInputStream(path));
        HttpHeaders header = new HttpHeaders();
        header.add("Content-Type", Files.probeContentType(path));
        return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
    }*/

    @GetMapping("/profile-image/{fileName}")
    public ResponseEntity<?> getProfileImg(@PathVariable("fileName") String fileName) throws IOException {
        log.info("getProfileImg fileName: {}", fileName);
        Path path = Paths.get(uploadPath + fileName);
        Resource resource = new InputStreamResource(Files.newInputStream(path));
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(Files.probeContentType(path))).body(resource);
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
