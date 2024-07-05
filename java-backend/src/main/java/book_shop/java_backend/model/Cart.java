package book_shop.java_backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "carts")
@Getter
@NoArgsConstructor
public class Cart {
    @Id
    private String id;

    @Indexed
    @NotNull
    private String userId;

    @Valid
    @NotNull
    private List<CartItem> items;

    public Cart(String userId, List<CartItem> items) {
        this.userId = userId;
        this.items = items;
    }

    public void addItem(String bookId, double price) {
        if (items == null) {
            items = new ArrayList<>();
        }

        // Check if the item already exists
        for (CartItem item : items) {
            if (item.getBookId().equals(bookId)) {
                item.setQuantity(item.getQuantity() + 1);
                return;
            }
        }

        // If item does not exist, add it to the cart
        items.add(new CartItem(bookId, 1, price));
    }

    public void removeItem(String bookId) {
        items.removeIf(item -> item.getBookId().equals(bookId));
    }

    public void clearItems() {
        items.clear();
    }
}
