package router

import (
	"go-backend/handlers"

	"github.com/gofiber/fiber/v2"
)

func SetupUserRoutes(app *fiber.App) {
	api := app.Group("/api/user")
	api.Post("/signup", handlers.CreateUser)
	api.Post("/login", handlers.UserLogin)
}

func SetupBooksRoutes(app *fiber.App) {
	api := app.Group("/api/books")

	api.Post("/", handlers.CreateBook)        // need to add auth middleware
	api.Post("/cart/:id", handlers.AddToCart) // need to add auth middleware

	api.Put("/cart/:id", handlers.ClearCart) // need to add auth middleware
	api.Put("/:id", handlers.UpdateBook) // need to add auth middleware

	api.Delete("/cart/:id", handlers.RemoveFromCart) // need to add auth middleware
	api.Delete("/:id", handlers.DeleteBook) // need to add auth middleware

	api.Get("/", handlers.GetBooks)
	api.Get("/:id", handlers.GetBook)
	api.Get("/cart/:userId", handlers.GetCart)
}
