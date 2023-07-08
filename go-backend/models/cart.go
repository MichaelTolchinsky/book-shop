package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Cart struct {
	BookId   primitive.ObjectID `json:"bookId" validate:"required"`
	Quantity int                `json:"quantity" validate:"required"`
	Price    float64            `json:"price" validate:"required"`
}
