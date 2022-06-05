package com.team.neorangnarang.user.dto;

import com.team.neorangnarang.user.domain.ProviderType;
import com.team.neorangnarang.user.domain.Role;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
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
}
