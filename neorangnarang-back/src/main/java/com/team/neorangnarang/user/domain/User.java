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

    public static User toUser(final UserDTO userDTO) {
        GenderType gender;
        if(userDTO.getGender().equals("female")) {
            gender = GenderType.FEMALE;
        } else {
            gender = GenderType.MALE;
        }

        return User.builder()
                .token(userDTO.getToken())
                .user_idx(userDTO.getUser_idx())
                .uid(userDTO.getUid())
                .password(userDTO.getPassword())
                .email(userDTO.getEmail())
                .gender(gender)
                .nickname(userDTO.getNickname())
                .profile_img(userDTO.getProfile_img())
                .phone(userDTO.getPhone())
                .role(Role.USER)
                .provider(userDTO.getProvider())
                .provider_id(userDTO.getProviderId())
                .build();
    }
}