package com.team.neorangnarang.user.security.oauth2.service;

import com.team.neorangnarang.exception.OAuth2AuthenticationProcessingException;
import com.team.neorangnarang.user.domain.ProviderType;
import com.team.neorangnarang.user.security.oauth2.domain.GoogleOAuth2UserInfo;
import com.team.neorangnarang.user.security.oauth2.domain.KakaoOAuth2UserInfo;
import com.team.neorangnarang.user.security.oauth2.domain.NaverOAuth2UserInfo;
import com.team.neorangnarang.user.security.oauth2.domain.OAuth2UserInfo;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.log4j.Log4j2;

import java.util.Map;

@Log4j2
@Getter
@ToString
@Builder(access = AccessLevel.PRIVATE)
public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(ProviderType providerType, Map<String, Object> attributes) {
        switch (providerType) {
            case GOOGLE:
                log.info("구글 로그인 정보 리턴");
                return new GoogleOAuth2UserInfo(attributes);
            case KAKAO:
                log.info("카카오 로그인 정보 리턴");
                return new KakaoOAuth2UserInfo(attributes);
            case NAVER:
                log.info("네이버 로그인 정보 리턴");
                return new NaverOAuth2UserInfo(attributes);
            default:
                throw new OAuth2AuthenticationProcessingException("지원하지 않는 소셜 로그인 입니다.");
        }
    }
}
