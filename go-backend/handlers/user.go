package handlers

import (
	"context"
	"go-backend/database"
	"go-backend/models"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(c *fiber.Ctx) error {
	return c.SendString("nininin")
}

func UserLogin(c *fiber.Ctx) error {
	var user models.User

	var requestBody map[string]string
	c.BodyParser(&requestBody)

	email := requestBody["email"]
	password := requestBody["password"]
	database.UsersCollection.FindOne(context.Background(), bson.M{"email": email}).Decode(&user)

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Invalid authentication credentials",
		})
	}

	token, _ := GenerateJWTToken(email, user.Id.Hex())

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"token":     token,
		"expiresIn": 3600,
		"userId":    user.Id.Hex(),
	})
}

func GenerateJWTToken(email, userId string) (string, error) {
	// Create a new token with custom claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email":  email,
		"userId": userId,
		"exp":    time.Now().Add(time.Hour * 1),
	})

	// Sign the token with the secret key and get the complete, signed token as a string
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_KEY")))

	return tokenString, err
}
