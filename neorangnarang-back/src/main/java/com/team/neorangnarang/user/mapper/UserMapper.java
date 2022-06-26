package com.team.neorangnarang.user.mapper;

import com.team.neorangnarang.user.domain.Review;
import com.team.neorangnarang.user.domain.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    String selectTime();
    void saveUser(User user);
    User findByUserId(String userId);
    User findByUserIdx(Long idx);
    User findByProvider(String provider);
    User findByProviderId(String providerId);
    void updateUser(User user);
    void registerReview(Review review);
    List<Review> findReviewByTargetIdx(Long idx);
    float getRatingAvgByTargetIdx(Long idx);
}
