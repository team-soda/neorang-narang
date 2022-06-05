package com.team.neorangnarang.user.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String token;
    private int user_idx;
    private String id;
    private String password;
    private String phone;
    private String nickname;
    private boolean gender;
    private String profile_img;
    private Role role;
    private ProviderType provider;
    private LocalDateTime created_at;
    private boolean state;

    public String getRoleKey() {
        return this.role.getKey();
    }

}
