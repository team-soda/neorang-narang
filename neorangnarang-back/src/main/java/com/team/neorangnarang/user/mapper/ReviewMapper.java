package com.team.neorangnarang.user.mapper;

import com.team.neorangnarang.user.domain.Review;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {
    void registerReview(Review review);
    List<Review> getReviewByWriterIdx(Long idx);
    List<Review> getReviewByTargetIdx(Long idx);
    float getRatingAvgByTargetIdx(Long idx);
    void deleteReview(Review review);
}
