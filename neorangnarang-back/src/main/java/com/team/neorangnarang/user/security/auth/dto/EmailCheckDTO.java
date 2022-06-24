package com.team.neorangnarang.user.security.auth.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmailCheckDTO {
    private String email;
    private String code;
}
