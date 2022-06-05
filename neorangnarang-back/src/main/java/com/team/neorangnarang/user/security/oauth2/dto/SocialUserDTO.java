package com.team.neorangnarang.user.security.oauth2.dto;

import com.team.neorangnarang.user.domain.ProviderType;
import com.team.neorangnarang.user.domain.Role;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocialUserDTO {
    private String token;
    private String email;
    private String name;
    private String picture;
    private Role role;
    private ProviderType provider;
}
