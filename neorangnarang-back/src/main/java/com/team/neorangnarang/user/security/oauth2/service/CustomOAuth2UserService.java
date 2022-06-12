package com.team.neorangnarang.user.security.oauth2.service;

import com.team.neorangnarang.exception.OAuth2AuthenticationProcessingException;
import com.team.neorangnarang.user.domain.ProviderType;
import com.team.neorangnarang.user.domain.Role;
import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.mapper.UserMapper;
import com.team.neorangnarang.user.security.oauth2.domain.OAuth2UserInfo;
import com.team.neorangnarang.user.security.auth.domain.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Locale;
import java.util.UUID;

@Log4j2
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final UserMapper userMapper;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();
        log.info("loadUser token: {}", userRequest.getAccessToken().getTokenValue());

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        ProviderType provider = ProviderType.valueOf(registrationId.toUpperCase(Locale.ROOT));

        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(provider, oAuth2User.getAttributes());

        if (!StringUtils.hasText(oAuth2UserInfo.getId())) {
            throw new OAuth2AuthenticationProcessingException("ID not found from OAuth2 provider");
        }

        User user = saveOrUpdate(oAuth2UserInfo);

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User saveOrUpdate(OAuth2UserInfo oAuth2UserInfo) {
        log.info("saveOrUpdate oAuth2UserInfo attribute: {}", oAuth2UserInfo.getAttributes());

        User user = userMapper.findByProviderId(oAuth2UserInfo.getId());

        if (user != null) {
            return user;
        } else {
            String uuidPw = UUID.randomUUID().toString();
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            user = User.builder()
                    .uid(oAuth2UserInfo.getSocialId())
                    .password(passwordEncoder.encode(uuidPw))
                    .phone(oAuth2UserInfo.getPhone())
                    .nickname(oAuth2UserInfo.getName())
                    .gender(oAuth2UserInfo.getGender())
                    .profile_img(oAuth2UserInfo.getImageUrl())
                    .role(Role.USER)
                    .provider(oAuth2UserInfo.getProvider())
                    .provider_id(oAuth2UserInfo.getId())
                    .build();

            userMapper.saveUser(user);
            user = userMapper.findByProviderId(user.getProvider_id());

            log.info("saveOrUpdate user if save after user ID: {}", user.getUid());
        }

        return user;
    }
}
