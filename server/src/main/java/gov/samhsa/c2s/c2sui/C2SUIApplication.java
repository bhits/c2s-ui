package gov.samhsa.c2s.c2sui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@Controller
@EnableDiscoveryClient
@EnableResourceServer
public class C2SUIApplication {

    @RequestMapping(value = "/{path:[^\\\\.]*}")
    public String redirect() {
        return "forward:/";
    }

    public static void main(String[] args) {
        SpringApplication.run(C2SUIApplication.class, args);
    }
}