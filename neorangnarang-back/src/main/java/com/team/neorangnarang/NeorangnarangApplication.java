package com.team.neorangnarang;

import com.team.neorangnarang.user.security.oauth2.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(AppProperties.class)
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class NeorangnarangApplication {

    public static void main(String[] args) {
        SpringApplication.run(NeorangnarangApplication.class, args);
    }

}
