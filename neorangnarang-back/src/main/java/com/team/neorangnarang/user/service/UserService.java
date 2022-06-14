package com.team.neorangnarang.user.service;

import com.team.neorangnarang.user.domain.ProviderType;
import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.mapper.UserMapper;
import com.team.neorangnarang.user.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;
    private final TokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // mapper 연결 test용
    public String selectTime() {
        return userMapper.selectTime();
    }

    public void createUser(User user) {
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

    public User getUserInfo(final User user) {
        return userMapper.findByUserId(user.getUid());
    }
}