package handlers

import (
	"context"
	"fmt"
	"go-backend/database"
	"go-backend/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetBooks(c *fiber.Ctx) error {
	var bookquery *mongo.Cursor = &mongo.Cursor{}
	books := []models.Book{}
	pageSize := c.QueryInt("pagesize")
	currentPage := c.QueryInt("page")

	if pageSize > 0 && currentPage > 0 {
		paginationResult, err := database.BooksCollection.Find(c.Context(), bson.M{}, options.Find().SetSkip(int64(pageSize*(currentPage-1))).SetLimit(int64(pageSize)))

		if err != nil {
			return err
		}
		bookquery = paginationResult
	} else {
		result, err := database.BooksCollection.Find(c.Context(), bson.M{})
		if err != nil {
			return err
		}
		bookquery = result
	}

	bookquery.All(c.Context(), &books)
	fmt.Println("books cont", books)
	countDocs, err := database.BooksCollection.CountDocuments(c.Context(), bson.M{})
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":  "Books fetched successfully",
		"books":    books,
		"maxBooks": countDocs,
	})
}

func GetBook(c *fiber.Ctx) error {
	bookId := c.Params("id")
	book := database.BooksCollection.FindOne(context.Background(), bson.M{"_id": bookId})

	if book == nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": fmt.Sprintf("book %s not found", bookId)})
	}

	return c.Status(fiber.StatusOK).JSON(book)
}

func GetCart(c *fiber.Ctx) error {
	userId := c.Params("userId")

	cart := []models.CartItem{}
	cursor, err := database.UsersCollection.Find(context.Background(), bson.M{"_id": userId})
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Cart not found",
		})
	}

	defer cursor.Close(context.Background()) // cursor will close afer all the code benith
	for cursor.Next(context.Background()) {
		var cartItem models.CartItem
		err := cursor.Decode(&cartItem)
		if err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"message": "Cart not found",
			})
		}

		cart = append(cart, cartItem)
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"cart":    cart,
		"message": "cart fetched successfully",
	})
}
