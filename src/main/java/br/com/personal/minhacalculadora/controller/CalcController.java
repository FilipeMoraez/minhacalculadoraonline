package br.com.personal.minhacalculadora.controller;

import br.com.personal.minhacalculadora.dto.request.Operation;
import br.com.personal.minhacalculadora.dto.response.Result;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;

@RestController
@RequestMapping("/calc")
public class CalcController {
    @PostMapping(value="/subtract")
    @ResponseBody
    public Result subtract(@RequestBody Operation operation){
        return new Result(operation.getFirst().subtract(operation.getSecond()));
    }

    @PostMapping(value="/sum")
    @ResponseBody
    public Result sum(@RequestBody Operation operation){
        return new Result(operation.getFirst().add(operation.getSecond()));
    }

    @PostMapping(value="/multiply")
    @ResponseBody
    public Result multiple(@RequestBody Operation operation){
        return new Result(operation.getFirst().multiply(operation.getSecond()));
    }

    @PostMapping(value="/divide")
    @ResponseBody
    public Result divide(@RequestBody Operation operation){
        return new Result(operation.getFirst().divide(operation.getSecond(), 2, RoundingMode.HALF_UP));
    }

}
