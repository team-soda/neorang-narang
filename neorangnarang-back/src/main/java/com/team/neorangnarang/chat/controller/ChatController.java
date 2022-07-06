package com.team.neorangnarang.chat.controller;

import com.team.neorangnarang.chat.dto.ChatMessageDTO;
import com.team.neorangnarang.chat.dto.MessageType;
import com.team.neorangnarang.user.security.auth.domain.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/chat/message")
    public void message(ChatMessageDTO message, @Header("token") String token, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        String userName = "user1"; // TODO user 연결

        //로그인 회원 정보로 대화명 설정
        message.setUser_id(userName);

        if(MessageType.ENTER.equals(message.getType())){
            message.setMessage(userName + "님이 입장하셨습니다.");
        }

        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getUser_id(), message);
    }
}
