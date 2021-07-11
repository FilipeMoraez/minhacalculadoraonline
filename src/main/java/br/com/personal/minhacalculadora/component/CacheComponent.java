package br.com.personal.minhacalculadora.component;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class CacheComponent {

    private static HashMap<String, String> hash = new HashMap<>();

    public String setHis(String rota, String historico) {
        if(hash.containsKey(rota)){
            var retorno = hash.get(rota);
            if(!historico.equals("-=")) {
                hash.put(rota, historico);
                return historico;
            }
            return retorno;
        }else{
            hash.put(rota, historico);
            return historico;
        }
    }

    public void delete(String rota) {
        try{
            hash.remove(rota);
        }catch(Exception e){
            System.out.println("removed");
        }
    }


}
