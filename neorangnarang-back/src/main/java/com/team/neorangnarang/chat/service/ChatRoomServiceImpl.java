package com.team.neorangnarang.chat.service;

import com.team.neorangnarang.chat.dto.ChatRoomDTO;
import com.team.neorangnarang.chat.mapper.ChatRoomMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class ChatRoomServiceImpl implements ChatRoomService {

    @Autowired
    ChatRoomMapper chatRoomMapper;

    @Override
    public ChatRoomDTO insertChatRoom(Map<String, Object> param) {
        log.info("[insertChatRoom] ::: {}", param);
        return chatRoomMapper.insertChatRoom(param);
    }

    @Override
    public int deleteChatRoom(Long room_idx) {
        log.info("[deleteChatRoom] ::: {}", room_idx);
        return chatRoomMapper.deleteChatRoom(room_idx);
    }

    @Override
    public List<ChatRoomDTO> selectChatRoomList(String sender_id) {
        log.info("[selectChatRoomList] ::: {}", sender_id);
        return chatRoomMapper.selectChatRoomList(sender_id);
    }

    @Override
    public ChatRoomDTO selectChatRoomDetail(Long room_idx) {
        log.info("[selectChatRoomDetail] ::: {}", room_idx);
        return chatRoomMapper.selectChatRoomDetail(room_idx);
    }
}
