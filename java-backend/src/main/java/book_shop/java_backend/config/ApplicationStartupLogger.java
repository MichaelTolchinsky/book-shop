package book_shop.java_backend.config;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ApplicationStartupLogger {

    @EventListener(ApplicationReadyEvent.class)
    public void logOnStartup() {
        System.out.println("Connected to MongoDB successfully");
    }
}