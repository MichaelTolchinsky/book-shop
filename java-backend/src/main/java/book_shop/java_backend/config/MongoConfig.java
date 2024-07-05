package book_shop.java_backend.config;

import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {
    @Value("${MONGO_ATLAS_USER}")
    private String mongoAtlasUser;

    @Value("${MONGO_ATLAS_PW}")
    private String mongoAtlasPassword;

    @Value("${MONGO_ATLAS_CLUSTER}")
    private String mongoAtlasCluster;

    @Value("${MONGO_DB_NAME}")
    private String mongoDbName;

    @Override
    protected String getDatabaseName() {
        return mongoDbName;
    }

    @Override
    public com.mongodb.client.MongoClient mongoClient() {
        String connectionString = String.format("mongodb+srv://%s:%s@%s/%s", mongoAtlasUser, mongoAtlasPassword, mongoAtlasCluster, mongoDbName);
        return MongoClients.create(connectionString);
    }
}
