package com.team.neorangnarang.mainboard.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.SuperBuilder;
import lombok.extern.log4j.Log4j2;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Data
@Log4j2
@SuperBuilder
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MainboardDTO {

    private Long board_idx;
    // 제목, 글쓴이, 내용, 건물 위치, 평수, 전월세 구분
    private String title, writer, uid, content, location, short_location, square_feet, pay_division;
    // 금액, 찜하기 수, 조회수
    private Integer price, view_count;

    @Builder.Default
    private Integer like_count = 0;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime created_at;

    private String created_dt;

    private List<String> imageTags;

    public void setBoard_idx(Long board_idx) {
        this.board_idx = board_idx;
    }

    public List<String> getImageTags() { // 이미지 태그 추출

        Pattern pattern = Pattern.compile("<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>"); //img src 추출 정규표현식
        Matcher matcher = pattern.matcher(content);

        List<String> list = new Vector<>();

        while(matcher.find()){
            list.add(matcher.group(1));
        }

        return list;
    }

    public MainboardDTO getDTO() {

        MainboardDTO boardDTO = MainboardDTO.builder()
                .board_idx(board_idx)
                .title(title)
                .content(content)
                .writer(writer)
                .uid(uid)
                .short_location(short_location)
                .location(location)
                .square_feet(square_feet)
                .pay_division(pay_division)
                .price(price)
                .like_count(like_count)
                .view_count(view_count)
                .created_dt(created_at.format(DateTimeFormatter.ofPattern("yy-MM-dd HH:mm")))
                .imageTags(getImageTags())
                .build();

        return boardDTO;
    }
}