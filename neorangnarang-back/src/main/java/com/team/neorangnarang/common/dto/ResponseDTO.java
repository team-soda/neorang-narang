package com.team.neorangnarang.common.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDTO<T> {
    private String error;
    private List<T> listData;
    private T objData;

    public ResponseDTO(T obj) {
        this.objData = obj;
    }
}