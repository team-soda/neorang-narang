package com.team.neorangnarang.user.mapper;

import com.team.neorangnarang.user.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    String selectTime();
    void saveUser(User user);
    User findByUserId(String userId);
    User findByProvider(String provider);
    User findByProviderId(String providerId);
}