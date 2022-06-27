package com.team.neorangnarang.user.dto;

import com.team.neorangnarang.user.domain.Review;
import lombok.*;

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
    private String content;
    private int rating;
    private float ratingAvg;
    private boolean writer_display;

    public ReviewDTO(final Review review) {
        this.review_idx = review.getReview_idx();
        this.writer_idx = review.getWriter_idx();
        this.target_idx = review.getTarget_idx();
        this.writer_nickname = review.getWriter_nickname();
        this.content = review.getContent();
        this.rating = review.getRating();
        this.writer_display = review.isWriter_display();
    }

    public static Review toReview(final ReviewDTO reviewDTO) {
        return Review.builder()
                .review_idx(reviewDTO.getReview_idx())
                .writer_idx(reviewDTO.getWriter_idx())
                .target_idx(reviewDTO.getTarget_idx())
                .writer_nickname(reviewDTO.getWriter_nickname())
                .content(reviewDTO.getContent())
                .rating(reviewDTO.getRating())
                .writer_display(reviewDTO.isWriter_display())
                .build();
    }
}
