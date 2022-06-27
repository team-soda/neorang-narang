package com.team.neorangnarang.user.dto;

import com.team.neorangnarang.user.domain.GenderType;
import com.team.neorangnarang.user.domain.ProviderType;
import com.team.neorangnarang.user.domain.Role;
import com.team.neorangnarang.user.domain.User;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {
    private String token;
    private Long user_idx;
    private String uid;
    private String password;
    private String email;
    private String gender;
    private String nickname;
    private String profile_img;
    private String phone;
    private ProviderType provider;
    private String providerId;

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
