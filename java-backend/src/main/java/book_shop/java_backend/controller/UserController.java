package book_shop.java_backend.controller;

import book_shop.java_backend.model.User;
import book_shop.java_backend.repository.UserRepository;
import book_shop.java_backend.util.JwtTokenUtil;
import book_shop.java_backend.util.PasswordEncoderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private PasswordEncoderUtil passwordEncoderUtil;


    @PostMapping("/signup")
    public ResponseEntity<String> createUser(@Valid @RequestBody User user) {
        String hashedPassword = passwordEncoderUtil.encodePassword(user.getPassword());
        User newUser = new User(user.getEmail(), hashedPassword);

        User createdUser = userRepository.save(newUser);
        System.out.println(createdUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("User Created");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        // Find user by email
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        // Validate password
        if (!passwordEncoderUtil.matchPassword(user.getPassword(), existingUser.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        String jwtToken = jwtTokenUtil.generateToken(existingUser.get().getEmail(), existingUser.get().getId());

        Map<String, Object> response = new HashMap<>();
        response.put("token", jwtToken);
        response.put("expiresIn", 3600);
        response.put("userId", existingUser.get().getId());
        // Return token in response
        return ResponseEntity.ok().body(response);
    }

}
