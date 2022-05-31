package com.team.neorangnarang.common.service;

import com.team.neorangnarang.common.mapper.TimeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class TimeServiceImpl implements TimeService {

    private final TimeMapper timeMapper;

    @Override
    public String returnTime() {
        log.info("timeTest Now!!! ServiceImpl!");

        String time = timeMapper.selectTime();

        log.info("timeTest Now!!! ServiceImpl! time 값 >>>"+time);

        return time;
    }
}
