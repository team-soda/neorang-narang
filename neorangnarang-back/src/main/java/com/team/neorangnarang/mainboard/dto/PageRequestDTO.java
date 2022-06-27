package com.team.neorangnarang.mainboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PageRequestDTO {

    // 검색 타입, 키워드
    private String type;
    private String keyword;

}
