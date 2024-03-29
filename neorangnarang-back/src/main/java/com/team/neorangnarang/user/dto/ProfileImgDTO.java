package com.team.neorangnarang.user.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProfileImgDTO {
    private String originName;
    private String newName;
    private Long size;
    private String path;
}
