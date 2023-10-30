# Projects API Reactive

## Issues

### No SpringDocConfiguration

The OpenApi generator for Spring with `reactive=true` does not generate a SpringDocConfiguration.
See https://github.com/OpenAPITools/openapi-generator/issues/12913.

#### Example

~~~java
@Configuration
public class SpringDocConfiguration {

    @Bean(name = "org.openapitools.configuration.SpringDocConfiguration.apiInfo")
        OpenAPI apiInfo() {
            return new OpenAPI()
                .info(new Info()
                    .title("Project Service API")
                    .description("This is the Project Service API based on the OpenAPI 3.0 specification.")
                    .license(new License()
                        .name("MIT")
                        .url("http://unlicense.org"))
                    .version("0.0.1"));
    }
}
~~~
