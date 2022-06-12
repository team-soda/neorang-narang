package com.team.neorangnarang.user.security.oauth2.domain;

import com.team.neorangnarang.user.domain.GenderType;
import com.team.neorangnarang.user.domain.ProviderType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.util.Map;

@Getter
@AllArgsConstructor
@ToString
public abstract class OAuth2UserInfo {
    protected Map<String, Object> attributes;

    public abstract String getId();
    public abstract String getName();
    public abstract String getPhone();
    public abstract GenderType getGender();
    public abstract String getEmail();
    public abstract String getImageUrl();
    public abstract ProviderType getProvider();
    public abstract String getSocialId();
}
