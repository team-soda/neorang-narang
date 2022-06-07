package com.team.neorangnarang.mainboard.service;

import com.team.neorangnarang.mainboard.dto.MainboardDTO;
import com.team.neorangnarang.mainboard.mapper.MainboardMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Log4j2
@Service
public class MainboardServiceImpl implements MainboardService {

    @Autowired
    private MainboardMapper boardMapper;

    @Override
    public List<Map<String,Object>> getBoardList(Map<String, Object> paramMap) {
        log.info("serviceImpl getBoardList postData result >>> "+paramMap);

        log.info("글 목록 가져왔나요? >>> " +boardMapper.getBoardList(paramMap));

        return boardMapper.getBoardList(paramMap);
    }

    @Override
    public Long register(MainboardDTO mainboardDTO) {

        log.info("register serviceImpl now!!!!! insert Data?? >>> " + mainboardDTO);

        boardMapper.insert(mainboardDTO);

        Long board_idx = mainboardDTO.getBoard_idx();

        log.info("register serviceImpl now!!!!! 성공한 데이터 인덱스? >>> " + board_idx);

        return board_idx;
    }

    @Override
    public MainboardDTO read(long board_idx) {

        MainboardDTO boardDTO = boardMapper.select(board_idx);

        boardMapper.updateViewCount(board_idx);

        return boardDTO.getDTO();
    }

    @Override
    public void delete(long board_idx) {
        boardMapper.delete(board_idx);
    }

    @Override
    public boolean modify(MainboardDTO mainboardDTO) {
        Long board_idx = mainboardDTO.getDTO().getBoard_idx();

        return boardMapper.update(mainboardDTO) > 0;
    }
}
