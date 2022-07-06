package com.team.neorangnarang.chat.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.socket.WebSocketSession;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatRoomDTO {

    private Long room_idx;

    private Long board_idx;

    private String sender_id;
    private String receiver_id;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime created_at;

    @Builder.Default
    private boolean isClosed = false;

    public static ChatRoomDTO create(Long board_idx, String sender_id, String receiver_id){
        return ChatRoomDTO.builder()
                .board_idx(board_idx)
                .sender_id(sender_id)
                .receiver_id(receiver_id)
                .build();
    }

}
