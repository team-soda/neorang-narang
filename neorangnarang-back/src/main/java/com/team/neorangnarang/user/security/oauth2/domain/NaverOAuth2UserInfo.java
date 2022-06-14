package com.team.neorangnarang.user.security.oauth2.domain;

import com.team.neorangnarang.user.domain.GenderType;
import com.team.neorangnarang.user.domain.ProviderType;
import lombok.ToString;
import lombok.extern.log4j.Log4j2;

import java.util.Map;

@Log4j2
@ToString
public class NaverOAuth2UserInfo extends OAuth2UserInfo {
    private Map<String, Object> naverResponse;

    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
        this.naverResponse = (Map<String, Object>) attributes.get("response");
    }

    @Override
    public String getId() {
        return (String) naverResponse.get("id");
    }

    @Override
    public String getName() {
        return (String) naverResponse.get("nickname");
    }

    @Override
    public String getPhone() {
        String mobile = (String) naverResponse.get("mobile");
        mobile = mobile.replaceAll("[^0-9]", "");

        return mobile;
    }

    @Override
    public GenderType getGender() {
        String gender = (String) naverResponse.get("gender");

        if(gender.equals("F")) {
            return GenderType.FEMALE;
        }

        return GenderType.MALE;
    }

    @Override
    public String getEmail() {
        return (String) naverResponse.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) naverResponse.get("profile_image");
    }

    @Override
    public ProviderType getProvider() {
        return ProviderType.NAVER;
    }

    @Override
    public String getSocialId() {
        return getProvider() + "_" + getId();
    }
}