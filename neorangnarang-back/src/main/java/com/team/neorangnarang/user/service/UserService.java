package com.team.neorangnarang.user.service;

import com.team.neorangnarang.user.dto.UserDTO;
import com.team.neorangnarang.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // mapper 연결 test용
    public String selectTime() {
        return userMapper.selectTime();
    }

    public void createUser(UserDTO userDTO) {
        UserDTO BCryptUser = UserDTO.builder()
                .id(userDTO.getId())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .phone(userDTO.getPhone())
                .nickname(userDTO.getId())
                .build();
        userMapper.saveUser(BCryptUser);
    }

    public UserDTO getByCredentials(final String userId, final String userPw) {
        final UserDTO originalUser =userMapper.findByUserId(userId);

        if(originalUser != null && passwordEncoder.matches(userPw, originalUser.getPassword())) {
            return originalUser;
        }

        return null;
    }
}
