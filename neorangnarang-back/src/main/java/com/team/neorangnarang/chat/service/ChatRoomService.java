package com.team.neorangnarang.chat.service;

import com.team.neorangnarang.chat.dto.ChatRoomDTO;

import java.util.List;
import java.util.Map;

public interface ChatRoomService {

    public ChatRoomDTO insertChatRoom(Map<String, Object> param);

    public int deleteChatRoom(Long room_idx);

    public List<ChatRoomDTO> selectChatRoomList(String sender_id);

    public ChatRoomDTO selectChatRoomDetail(Long room_idx);

}
