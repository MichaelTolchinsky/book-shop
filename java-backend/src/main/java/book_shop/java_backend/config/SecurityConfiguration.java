package book_shop.java_backend.config;

import book_shop.java_backend.interceptor.JwtInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends AbstractHttpConfigurer implements WebMvcConfigurer {
    @Autowired
    private JwtInterceptor jwtInterceptor;

    private final List<String> publicEndpoints = Arrays.asList("/api/user/signup", "/api/user/login",  "/api/book",
            "/api/book/{id}");

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor)
                .addPathPatterns("/api/**") // Apply interceptor to specific endpoints
                .excludePathPatterns(publicEndpoints); // Exclude public endpoints
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/api/user/signup", "/api/user/login").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }
}

