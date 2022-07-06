package com.team.neorangnarang.chat.mapper;

import com.team.neorangnarang.chat.dto.ChatRoomDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChatRoomMapper {

    ChatRoomDTO insertChatRoom(Map<String, Object> param);

    int deleteChatRoom(Long room_idx);

    List<ChatRoomDTO> selectChatRoomList(String sender_id);

    ChatRoomDTO selectChatRoomDetail(Long room_idx);

    /*
    public List<ChatRoomDTO> findAllRoom();

    public ChatRoomDTO findRoomById(String id);

    public ChatRoomDTO createChatRoom(String name);
    */

}
