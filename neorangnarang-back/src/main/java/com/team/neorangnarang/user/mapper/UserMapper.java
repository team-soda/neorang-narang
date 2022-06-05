package com.team.neorangnarang.user.mapper;

import com.team.neorangnarang.user.security.oauth2.domain.SocialUser;
import com.team.neorangnarang.user.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    String selectTime();
    void saveUser(User user);
    //void saveSocialUser(SocialUser socialUser);
    User findByUserId(String userId);
    User findByProvider(String provider);
}
