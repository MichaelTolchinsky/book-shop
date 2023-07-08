package main

import (
	"go-backend/database"
	"go-backend/router"

	"github.com/gofiber/fiber/v2"
)

func main() {
	database.ConnectDB()
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	router.SetupUserRoutes(app)
	router.SetupBooksRoutes(app)

	app.Listen(":3000")
}
