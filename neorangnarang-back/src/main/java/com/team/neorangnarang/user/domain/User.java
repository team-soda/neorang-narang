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
    private String phone;
    private String nickname;
    private GenderType gender;
    private String profile_img;
    private Role role;
    private ProviderType provider;
    private String provider_id;
    private LocalDateTime created_at;
    private boolean state;

    public String getRoleKey() {
        return this.role.getKey();
    }

    public static User toUser(final UserDTO userDTO) {
        return User.builder()
                .token(userDTO.getToken())
                .user_idx(userDTO.getUser_idx())
                .uid(userDTO.getUid())
                .password(userDTO.getPassword())
                .phone(userDTO.getPhone())
                .nickname(userDTO.getNickname())
                .profile_img(userDTO.getProfile_img())
                .role(userDTO.getRole())
                .provider(userDTO.getProvider())
                .provider_id(userDTO.getProviderId())
                .build();
    }
}
