package com.team.neorangnarang.user.service;

import com.team.neorangnarang.exception.BadRequestException;
import com.team.neorangnarang.exception.UserNotFoundException;
import com.team.neorangnarang.user.domain.ProviderType;
import com.team.neorangnarang.user.domain.Role;
import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.mapper.UserMapper;
import com.team.neorangnarang.user.security.TokenProvider;
import com.team.neorangnarang.user.security.auth.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.Random;

@Log4j2
@Component
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;
    private final TokenProvider tokenProvider;
    private final JavaMailSender javaMailSender;
    private final RedisUtil redisService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Value("${spring.servlet.multipart.location}")
    private String uploadPath;

    // mapper 연결 test용
    public String selectTime() {
        return userMapper.selectTime();
    }

    public User getUserInfo(final User user) {
        return userMapper.findByUserId(user.getUid());
    }

    public String authenticateUser(final User user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUid(),
                        user.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return tokenProvider.create(authentication);
    }

    public User updateUser(final User user) {
        log.info("updateUser user: {}", user);
        User originUser = getUserInfo(user);
        log.info("updateUser originUser: {}", originUser);

        User updateReq = null;
        if (originUser != null) {
            updateReq = User.builder()
                    .user_idx(originUser.getUser_idx())
                    .uid(originUser.getUid())
                    .nickname(user.getNickname())
                    .profile_img(user.getProfile_img())
                    .build();
            userMapper.updateUser(updateReq);
        }

        User resultUser = getUserInfo(updateReq);
        log.info("updateUser resultUser: {}", resultUser);
        return resultUser;
    }

    public void profileImgUpload(MultipartFile file) throws IOException {

    }

    public void createUser(final User user) {
        log.info("createUser user : {}", user.toString());
        User encodingUser = User.builder()
                .uid(user.getUid())
                .password(passwordEncoder.encode(user.getPassword()))
                .email(user.getEmail())
                .gender(user.getGender())
                .nickname(user.getNickname())
                .profile_img(user.getProfile_img())
                .phone(user.getPhone())
                .role(Role.USER)
                .provider(ProviderType.LOCAL)
                .build();
        log.info("createUser encodingUser : {}", encodingUser.toString());
        userMapper.saveUser(encodingUser);
    }

    public String sendAuthEmail(User user) {
        if (user.getEmail() == null) {
            throw new UserNotFoundException("입력된 이메일이 존재하지 않습니다.");
        }

        Random random = new Random();
        String authCode = String.valueOf(random.nextInt(899999) + 100000);

        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
            helper.setTo(user.getEmail());
            helper.setSubject("너랑나랑");
            helper.setText("너랑 나랑 회원가입 폼에 인증 코드를 입력해 주세요.", true);
            helper.setText("코드 : " + authCode, true);
            javaMailSender.send(mimeMessage);
            redisService.setDataExpire(authCode, user.getEmail(), 60 * 5L);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new UserNotFoundException("입력된 이메일이 존재하지 않습니다.");
        }
        return authCode;
    }

    public String getUserEmailByCode(String code) {
        String email = redisService.getData(code);
        if (email != null) {
            return email;
        }

        return null;
    }

    private void validate(final User user) {
        if (user == null) {
            log.warn("user null");
            throw new RuntimeException("user null");
        }

        if (user.getUid() == null) {
            log.warn("user id null");
            throw new RuntimeException("user id null");
        }
    }
}
