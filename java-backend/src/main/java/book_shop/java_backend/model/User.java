package book_shop.java_backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Document(collection = "users")
@Getter
@NoArgsConstructor
public class User {
    @Id
    private String id;

    @Email
    @NotBlank
    @Indexed(unique = true)
    private String email;

    @NotBlank
    private String password;

    public User(String email, String password){
        this.email = email;
        this.password = password;
    }
}
