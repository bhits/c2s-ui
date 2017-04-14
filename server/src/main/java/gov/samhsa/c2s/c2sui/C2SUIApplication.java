package gov.samhsa.c2s.c2sui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@SpringBootApplication
@EnableDiscoveryClient
@EnableResourceServer
public class C2SUIApplication {

    public static void main(String[] args) {
        SpringApplication.run(C2SUIApplication.class, args);
    }
}