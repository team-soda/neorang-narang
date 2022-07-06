package com.team.neorangnarang.chat.controller;

import com.team.neorangnarang.chat.dto.ChatRoomDTO;
import com.team.neorangnarang.chat.service.ChatRoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

    @Autowired
    ChatRoomService chatRoomService;

    //채팅 리스트 화면
    @GetMapping("/room")
    public String rooms(Model model) {
        log.info("[ChatRoomController] ::: rooms");
        return "/chat/room";
    }

    //모든 채팅방 목록 반환
    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoomDTO> room(@RequestParam String sender_id) {
        return chatRoomService.selectChatRoomList(sender_id);
    }

    //채팅방 생성
    @PostMapping("/room")
    @ResponseBody
    public ChatRoomDTO createRoom(@RequestParam Map<String, Object> param) {
        return chatRoomService.insertChatRoom(param);
    }

    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId",roomId);
        return "/chat/roomDetail";
    }

    //특정 채팅방 조회
    @GetMapping("/room/{room_idx}")
    @ResponseBody
    public ChatRoomDTO roomInfo(@PathVariable Long room_idx) {
        return chatRoomService.selectChatRoomDetail(room_idx);
    }

}
