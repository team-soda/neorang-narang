package com.team.neorangnarang.user.dto;

import com.team.neorangnarang.user.domain.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer";
    private User user;

    public AuthResponseDTO(String accessToken) {
        this.accessToken = accessToken;
    }

    public AuthResponseDTO(String accessToken, User user) {
        this.accessToken = accessToken;
        this.user = user;
    }
}
