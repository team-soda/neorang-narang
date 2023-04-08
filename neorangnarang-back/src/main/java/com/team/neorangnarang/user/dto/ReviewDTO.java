package com.team.neorangnarang.user.dto;

import com.team.neorangnarang.user.domain.Review;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReviewDTO {
    private Long review_idx;
    private Long writer_idx;
    private Long target_idx;
    private String writer_nickname;
    private String target_nickname;
    private String writer_profileImg;
    private String content;
    private int rating;
    private float ratingAvg;
    private boolean writer_display;
    private LocalDateTime created_at;

    public ReviewDTO(final Review review) {
        this.review_idx = review.getReview_idx();
        this.writer_idx = review.getWriter_idx();
        this.target_idx = review.getTarget_idx();
        this.writer_nickname = review.getWriter_nickname();
        this.target_nickname = review.getTarget_nickname();
        this.writer_profileImg = review.getWriter_profileImg();
        this.content = review.getContent();
        this.rating = review.getRating();
        this.writer_display = review.isWriter_display();
        this.created_at = review.getCreated_at();
    }

    public static Review toReview(final ReviewDTO reviewDTO) {
        return Review.builder()
                .review_idx(reviewDTO.getReview_idx())
                .writer_idx(reviewDTO.getWriter_idx())
                .target_idx(reviewDTO.getTarget_idx())
                .writer_nickname(reviewDTO.getWriter_nickname())
                .target_nickname(reviewDTO.getTarget_nickname())
                .writer_profileImg(reviewDTO.getWriter_profileImg())
                .content(reviewDTO.getContent())
                .rating(reviewDTO.getRating())
                .writer_display(reviewDTO.isWriter_display())
                .created_at(reviewDTO.getCreated_at())
                .build();
    }
}
