package com.team.neorangnarang.user.service;

import com.team.neorangnarang.user.domain.Review;
import com.team.neorangnarang.user.domain.User;
import com.team.neorangnarang.user.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewMapper reviewMapper;

    public List<Review> registerReview(final Review review) {
        if (review == null) {
            throw new RuntimeException("입력된 리뷰 정보가 없습니다.");
        }
        reviewMapper.registerReview(review);
        return getReviewListByTargetIdx(review);
    }

    public List<Review> getUserReviewList(final User user) {
        Review review = Review.builder().target_idx(user.getUser_idx()).build();
        return getReviewListByTargetIdx(review);
    }

    public List<Review> getReviewListByTargetIdx(final Review review) {
        return reviewMapper.getReviewByTargetIdx(review.getTarget_idx());
    }

    public List<Review> getReviewListByWriterIdx(final User user) {
        log.info("getReviewListByWriterIdx user: {}", user.toString());
        if (user.getUser_idx() == null) {
            throw new RuntimeException("유저를 찾을 수 없습니다.");
        }

        Review review = Review.builder().writer_idx(user.getUser_idx()).build();
        log.info("getReviewListByWriterIdx review: {}", review);
        return reviewMapper.getReviewByWriterIdx(review.getWriter_idx());
    }

    public List<Review> deleteReview(final Review review, final User user) {
        if (review == null) {
            throw new RuntimeException("작성된 리뷰가 없습니다.");
        }
        reviewMapper.deleteReview(review);
        return getReviewListByWriterIdx(user);
    }
}
