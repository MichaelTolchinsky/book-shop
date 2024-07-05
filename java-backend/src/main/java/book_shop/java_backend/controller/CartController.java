package book_shop.java_backend.controller;

import book_shop.java_backend.model.Book;
import book_shop.java_backend.model.Cart;
import book_shop.java_backend.repository.BookRepository;
import book_shop.java_backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private BookRepository bookRepository;


    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable String userId) {
        try {
            Cart cart = cartRepository.findByUserId(userId);
            return ResponseEntity.ok().body(cart);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/add/{bookId}")
    public ResponseEntity<Cart> addToCart(@RequestBody String userId, @PathVariable String bookId) {
        try {
            Optional<Book> optionalBook = bookRepository.findById(bookId);
            Book book = optionalBook.orElseThrow(() -> new Exception("Book not found"));

            Cart cart = cartRepository.findByUserId(userId);
            if (cart == null) {
                cart = new Cart(userId, new ArrayList<>());
            }

            cart.addItem(bookId, book.getPrice());
            cartRepository.save(cart);
            return ResponseEntity.status(HttpStatus.CREATED).body(cart);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/clear/{userId}")
    public ResponseEntity<Cart> clearCart(@PathVariable String userId) {
        try {
            Cart cart = cartRepository.findByUserId(userId);
            if (cart == null) {
                throw new Exception("Cart not found");
            }

            cart.clearItems();
            cartRepository.save(cart);

            return ResponseEntity.status(HttpStatus.OK).body(cart);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/remove/{userId}/{bookId}")
    public ResponseEntity<Cart> removeFromCart(@PathVariable String userId, @PathVariable String bookId) {
        try {
            Cart cart = cartRepository.findByUserId(userId);
            if (cart == null) {
                throw new Exception("Cart not found");
            }

            cart.removeItem(bookId);
            cartRepository.save(cart);

            return ResponseEntity.status(HttpStatus.CREATED).body(cart);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
