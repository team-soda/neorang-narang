package com.team.neorangnarang.user.mapper;

import com.team.neorangnarang.user.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    String selectTime();
    void saveUser(UserDTO userDTO);
}
