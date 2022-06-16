package com.team.neorangnarang.user.service;

import com.team.neorangnarang.user.domain.ProviderType;
import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.mapper.UserMapper;
import com.team.neorangnarang.user.security.TokenProvider;
import com.team.neorangnarang.user.security.auth.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
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

    public void createUser(final User user) {
        User encodingUser = User.builder()
                .uid(user.getUid())
                .password(passwordEncoder.encode(user.getPassword()))
                .email(user.getEmail())
                .gender(user.getGender())
                .nickname(user.getNickname())
                .profile_img(user.getProfile_img())
                .phone(user.getPhone())
                .role(user.getRole())
                .provider(ProviderType.LOCAL)
                .build();
        userMapper.saveUser(encodingUser);
    }

    public String sendAuthEmail(User user) {
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
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        redisService.setDataExpire(authCode, user.getEmail(), 60*5L);

        return authCode;
    }

    public String getUserEmailByCode(String code) {
        String email = redisService.getData(code);
        if(email != null) {
            return email;
        }

        return null;
    }
}
