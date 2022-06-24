package com.team.neorangnarang.user.security.oauth2.domain;

import com.team.neorangnarang.user.domain.GenderType;
import com.team.neorangnarang.user.domain.ProviderType;
import lombok.ToString;

import java.util.Map;

@ToString
public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getPhone() {
        return "01000001111";
    }

    @Override
    public GenderType getGender() {
        return GenderType.FEMALE;
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("picture");
    }

    @Override
    public ProviderType getProvider() {
        return ProviderType.GOOGLE;
    }

    @Override
    public String getSocialId() {
        return getProvider() + "_" + getId();
    }
}
