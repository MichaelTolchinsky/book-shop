package handlers

import "github.com/gofiber/fiber/v2"

func CreateUser(c *fiber.Ctx) error {
	return c.SendString("nininin")
}

func UserLogin(c *fiber.Ctx) error {
	return c.SendString("nininin")
}
