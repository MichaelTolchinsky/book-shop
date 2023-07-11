package router

import (
	"go-backend/handlers"

	"github.com/gofiber/fiber/v2"
)

func SetupUserRoutes(app *fiber.App) {
	api := app.Group("/api/user")
	api.Post("/signup", )
	api.Post("/login", )
}

func SetupBooksRoutes(app *fiber.App) {
	api := app.Group("/api/books")
	api.Get("/", handlers.GetBooks)
	api.Get("/:id", handlers.GetBook)
	api.Get("/cart/:userId", handlers.GetCart)
}
