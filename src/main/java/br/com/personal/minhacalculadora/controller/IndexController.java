package br.com.personal.minhacalculadora.controller;


import br.com.personal.minhacalculadora.component.CacheComponent;
import br.com.personal.minhacalculadora.dto.request.Operation;
import br.com.personal.minhacalculadora.dto.response.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequiredArgsConstructor
public class IndexController {
    private final CacheComponent cacheComponent;

    @GetMapping(value = "/")
    public ModelAndView index(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index");
        return modelAndView;
    }

    @GetMapping(value = "/my/{id}")
    public ModelAndView index(@PathVariable(value = "id", required = false) String id){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index");
        return modelAndView;
    }

    @PostMapping(value="/cache/{id}")
    @ResponseBody
    public String viewHist(@PathVariable("id") String id, @RequestBody String body){
        var resposta =  cacheComponent.setHis(id, body);
        return resposta;
    }

    @PostMapping(value="/remove/{id}")
    @ResponseBody
    public void remove(@PathVariable("id") String id){
            cacheComponent.delete(id);

    }


}
