package com.team.neorangnarang.mainboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteDTO extends MainboardDTO{
    private Long like_idx;
    private String fk_uid;
    private Long fk_board_idx;
    //private LocalDateTime created_at;
}
