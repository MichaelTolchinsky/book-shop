package book_shop.java_backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Document(collection = "books")
@Getter
@Setter
@NoArgsConstructor
public class Book {
    @Id
    private String id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Author is required")
    private String author;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Double price;

    @NotBlank(message = "Image URL is required")
    private String imageURL;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Creator ID is required")
    private ObjectId creator;

    public Book(String title, String author, Double price, String imageURL, String description, ObjectId creator) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.imageURL = imageURL;
        this.description = description;
        this.creator = creator;
    }
}
