package com.team.neorangnarang.user.security.oauth2.service;

import com.team.neorangnarang.user.security.TokenProvider;
import com.team.neorangnarang.user.security.oauth2.domain.SocialUser;
import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Log4j2
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final UserMapper userMapper;
    private final TokenProvider tokenProvider;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();

        log.info("google token: {}", userRequest.getAccessToken().getTokenValue());

        String accessToken = userRequest.getAccessToken().getTokenValue();

        // 생성된 service 객체로 부터 User 를 받는다.
        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);
        log.info("oAuth2User: {}", oAuth2User);

        // 받아온 user 정보로부터 provider
        String registerId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        log.info("registerId: {}", registerId);
        log.info("userNameAttributeName: {}", userNameAttributeName);

        // SuccessHandler가 사용할 수 있도록 등록
        OAuth2Attribute oAuth2Attribute =
                OAuth2Attribute.of(registerId, userNameAttributeName, oAuth2User.getAttributes());
        User user = saveOrUpdate(oAuth2Attribute);
        tokenProvider.create(user);

        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority(user.getRoleKey())), oAuth2Attribute.getAttributes(), oAuth2Attribute.getAttributeKey());
    }

    private User saveOrUpdate(OAuth2Attribute attribute) {
        log.info("saveOrUpdate attribute: {}", attribute);
        User user = userMapper.findByUserId(attribute.getUser().getId());
        log.info("saveOrUpdate user: {}", user);

        //User socialUser;

        /*if (user != null) {
            user = User.builder()
                    .id(user.getId())
                    .password(user.getPassword())
                    .phone(user.getPhone())
                    .nickname(user.getNickname())
                    .profile_img(user.getProfile_img())
                    .role(user.getRole())
                    .provider(user.getProvider())
                    .build();
            log.info("saveOrUpdate user if null: {}", socialUser);
        } else {
            user = attribute.toEntity();
            log.info("saveOrUpdate socialUser ID: {}", socialUser.getId());
            log.info("saveOrUpdate socialUser PW: {}", socialUser.getPassword());
            log.info("saveOrUpdate socialUser PHONE: {}", socialUser.getPhone());
            log.info("saveOrUpdate socialUser NICK: {}", socialUser.getNickname());
            log.info("saveOrUpdate socialUser ROLE: {}", socialUser.getRole());
            log.info("saveOrUpdate socialUser PROVIDER: {}", socialUser.getProvider());

            userMapper.saveUser(socialUser);
            user = userMapper.findByUserId(attribute.getUser().getId());

            log.info("saveOrUpdate user if else socialUser ID: {}", socialUser.getId());
            log.info("saveOrUpdate user if else socialUser ROLE: {}", socialUser.getRole());

        }*/

        if(user == null) {
            user = attribute.toEntity();

            log.info("saveOrUpdate user if ID: {}", user.getId());
            log.info("saveOrUpdate user if ID: {}", user.getRole());
            log.info("saveOrUpdate user if PROVIDER: {}", user.getProvider());

            userMapper.saveUser(user);
            user = userMapper.findByUserId(attribute.getUser().getId());

            log.info("saveOrUpdate user if save after user ID: {}", user.getId());
            log.info("saveOrUpdate user if save after user ROLE: {}", user.getRole());
            log.info("saveOrUpdate user if save after user ROLE: {}", user.getProvider());
        }

        return user;
    }
}
