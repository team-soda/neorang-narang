package com.team.neorangnarang.user.security.oauth2.domain;

import com.team.neorangnarang.user.domain.GenderType;
import com.team.neorangnarang.user.domain.ProviderType;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {
    private Map<String, Object> attributesAccount;
    private Map<String, Object> attributesProfile;

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
        this.attributesAccount = (Map<String,Object>) attributes.get("kakao_account");
        this.attributesProfile = (Map<String,Object>) attributesAccount.get("profile");
    }

    @Override
    public String getId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getName() {
        return (String) attributesProfile.get("nickname");
    }

    @Override
    public String getPhone() {
        return "01000001111";
    }

    @Override
    public GenderType getGender() {
        String gender = (String) attributesAccount.get("gender");

        if(gender.equals("female")) {
            return GenderType.FEMALE;
        }

        return GenderType.MALE;
    }

    @Override
    public String getEmail() {
        return (String) attributesAccount.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) attributesProfile.get("profile_image_url");
    }

    @Override
    public ProviderType getProvider() {
        return ProviderType.KAKAO;
    }

    @Override
    public String getSocialId() {
        return getProvider() + "_" + getId();
    }
}