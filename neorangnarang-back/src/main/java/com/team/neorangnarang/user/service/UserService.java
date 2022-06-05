package com.team.neorangnarang.user.service;

import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;

    // mapper 연결 test용
    public String selectTime() {
        return userMapper.selectTime();
    }

    public void createUser(User user) {
        userMapper.saveUser(user);
    }

    public User getByCredentials(final String userId, final String userPw, PasswordEncoder passwordEncoder) {
        final User originalUser =userMapper.findByUserId(userId);

        if(originalUser != null && passwordEncoder.matches(userPw, originalUser.getPassword())) {
            return originalUser;
        }

        return null;
    }
}
