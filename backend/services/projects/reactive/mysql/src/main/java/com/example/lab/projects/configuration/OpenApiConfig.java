package com.example.lab.projects.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    // See https://github.com/OpenAPITools/openapi-generator/issues/12913

    @Bean(name = "org.openapitools.configuration.SpringDocConfiguration.apiInfo")
    OpenAPI apiInfo() {
        return new OpenAPI()
                .info(new Info()
                        .title("Projects API")
                        .description("This is the Projects API based on the OpenAPI 3.0 specification.")
                        .license(new License()
                                .name("MIT")
                                .url("http://unlicense.org"))
                        .version("0.0.1"));
    }
}
