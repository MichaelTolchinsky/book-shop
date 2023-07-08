package router

import (
	"go-backend/handlers"

	"github.com/gofiber/fiber/v2"
)

func SetupUserRoutes(app *fiber.App) {

}

func SetupBooksRoutes(app *fiber.App) {
	api := app.Group("/api/books")
	api.Get("/", handlers.GetBooks)
}
