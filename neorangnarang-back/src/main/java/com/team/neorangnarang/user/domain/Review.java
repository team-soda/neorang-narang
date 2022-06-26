package com.team.neorangnarang.user.domain;

import com.team.neorangnarang.user.dto.ReviewDTO;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Review {
    private Long review_idx;
    private Long writer_idx;
    private Long target_idx;
    private String writer_nickname;
    private String content;
    private int rating;
    private float ratingAvg;
    private boolean writer_display;
    private LocalDateTime created_at;
    private boolean state;
}
