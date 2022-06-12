package com.team.neorangnarang.user.dto;

import com.team.neorangnarang.user.domain.GenderType;
import com.team.neorangnarang.user.domain.ProviderType;
import com.team.neorangnarang.user.domain.Role;
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
    private String phone;
    private String nickname;
    private GenderType gender;
    private String profile_img;
    private Role role;
    private ProviderType provider;
    private String providerId;
}
