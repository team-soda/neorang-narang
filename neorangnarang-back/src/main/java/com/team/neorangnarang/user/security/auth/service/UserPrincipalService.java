package com.team.neorangnarang.user.security.auth.service;

import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.mapper.UserMapper;
import com.team.neorangnarang.user.security.auth.domain.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/*

1. security config에 설정된 url(ex : .loginProcessingUrl("url"))로 요청이 오면
2. loadUserByUsername 메소드가 실행됨

 */

@Log4j2
@Service
@RequiredArgsConstructor
public class UserPrincipalService implements UserDetailsService {
    private final UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("loadUserByUsername username: {}", username);

        User user = userMapper.findByUserId(username);

        if(user != null) {
            return UserPrincipal.create(user);
        }

        return null;
    }
}
