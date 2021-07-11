package br.com.personal.minhacalculadora;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class MinhaCalculadoraApplication {

	public static void main(String[] args) {
		SpringApplication.run(MinhaCalculadoraApplication.class, args);
	}

}
