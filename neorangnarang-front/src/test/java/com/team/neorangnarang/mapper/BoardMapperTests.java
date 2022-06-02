package com.team.neorangnarang.mapper;

import com.team.neorangnarang.mainboard.dto.MainboardDTO;
import com.team.neorangnarang.mainboard.mapper.MainboardMapper;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import java.util.stream.IntStream;

@Log4j2
@ExtendWith(SpringExtension.class)
@SpringBootTest
class BoardMapperTests {

    @Autowired
    MainboardMapper boardMapper;

    @Test
    public void insertBoardDummies(){
        IntStream.rangeClosed(1,50).forEach(i -> {
            MainboardDTO board = MainboardDTO.builder()
                    .title("title" + i)
                    .writer("user" + (i%10)) // user0 ~ user5
                    .content("content" + i)
                    .location("경기도 고양시 덕양구 삼송로" + i)
                    .square_feet(Integer.toString(i%10))
                    .pay_division("월세")
                    .price(300000+(i%10))
                    .like_count(11*(i%10))
                    .build();

            boardMapper.insert(board);
        });

    }


}
