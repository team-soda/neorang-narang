package com.team.neorangnarang.user.domain;

import com.team.neorangnarang.user.dto.UserDTO;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {
    private String token;
    private Long user_idx;
    private String uid;
    private String password;
    private String email;
    private GenderType gender;
    private String nickname;
    private String profile_img;
    private String phone;
    private Role role;
    private ProviderType provider;
    private String provider_id;
    private LocalDateTime created_at;
    private boolean state;

    public String getRoleKey() {
        return this.role.getKey();
    }

    public void updateProfileImg(String profile_img) {
        this.profile_img = profile_img;
    }
}
