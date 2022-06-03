package com.team.neorangnarang.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
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
    private LocalDateTime created_at;
    private boolean state;
}
