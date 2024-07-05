package book_shop.java_backend.interceptor;

import book_shop.java_backend.util.JwtTokenUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class JwtInterceptor implements HandlerInterceptor {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7); // Extract token excluding "Bearer "

            if (jwtTokenUtil.validateToken(token)) {
                // Token is valid, extract claims
                Claims claims = jwtTokenUtil.extractClaims(token);
                String email = claims.getSubject();
                String userId = claims.get("userId", String.class);

                // Add user information to request attributes
                request.setAttribute("email", email);
                request.setAttribute("userId", userId);

                return true;
            } else {
                // Token validation failed
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return false;
            }
        }

        // No JWT found in Authorization header
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        return false;
    }
}

