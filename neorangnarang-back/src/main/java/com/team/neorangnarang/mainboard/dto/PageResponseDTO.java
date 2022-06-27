package com.team.neorangnarang.mainboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PageResponseDTO<E> {

    //결과 데이터
    private List<E> dtoList;

    public PageResponseDTO(PageRequestDTO pageRequestDTO, List<E> dtoList){
        this(pageRequestDTO);
        this.dtoList = dtoList;
    }

    public PageResponseDTO(PageRequestDTO pageRequestDTO) {
    }
}
