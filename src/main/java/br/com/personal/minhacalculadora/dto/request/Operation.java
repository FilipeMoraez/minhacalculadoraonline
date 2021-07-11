package br.com.personal.minhacalculadora.dto.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class Operation {
    private BigDecimal first;
    private BigDecimal second;
}
