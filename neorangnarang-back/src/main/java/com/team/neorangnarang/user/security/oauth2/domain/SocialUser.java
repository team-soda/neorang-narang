package com.team.neorangnarang.user.security.oauth2.domain;

import com.team.neorangnarang.user.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocialUser {
    private String email;
    private String name;
    private String picture;
    private Role role;

    public SocialUser update(String name, String picture) {
        this.name = name;
        this.picture = picture;

        return this;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}
