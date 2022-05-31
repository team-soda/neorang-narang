package com.team.neorangnarang.common.service;

import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface TimeService {

    String returnTime();

}
