package com.team.neorangnarang.mainboard.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDateTime;

@Data
//@Getter
@Log4j2
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MainboardDTO {

    private Long board_idx;
    // 제목, 글쓴이, 내용, 건물 위치, 평수, 전월세 구분
    private String title, writer, content, location, square_feet, pay_division;
    // 금액, 찜하기 수, 조회수
    private Integer price, view_count;

    @Builder.Default
    private Integer like_count = 0;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime created_dt;

    public MainboardDTO getDTO() {

        MainboardDTO boardDTO = MainboardDTO.builder()
                .board_idx(board_idx)
                .title(title)
                .content(content)
                .writer(writer)
                .location(location)
                .square_feet(square_feet)
                .pay_division(pay_division)
                .price(price)
                .like_count(like_count)
                .view_count(view_count)
                .build();

        return boardDTO;
    }

    public void setBoard_idx(Long board_idx) {
        this.board_idx = board_idx;
    }
}
