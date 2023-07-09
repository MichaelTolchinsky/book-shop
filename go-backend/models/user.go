package models

import (
	"context"
	"go-backend/database"
	"sort"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	Id       primitive.ObjectID `bson:"_id" json:"id" validate:"unique"`
	Email    string             `json:"email" validate:"required, unique"`
	Password string             `json:"password" validate:"required"`
	Cart     []CartItem         `json:"cart"`
}

func (user *User) addToCart(book *Book) {
	bookId := book.Id

	cartBookIndex := sort.Search(len(user.Cart), func(i int) bool {
		return user.Cart[i].BookId.String() == bookId.String()
	})

	if cartBookIndex >= 0 {
		user.Cart[cartBookIndex].Quantity++
	} else {
		user.Cart = append(user.Cart, CartItem{
			BookId:   bookId,
			Quantity: 1,
			Price:    book.Price,
		})
	}

	_, err := database.UsersCollection.InsertOne(context.Background(), user)
	if err != nil {
		panic(err)
	}
}

func (user *User) removeFromCart(book *Book) error {
	bookId := book.Id

	cartBookIndex := sort.Search(len(user.Cart), func(i int) bool {
		return user.Cart[i].BookId.String() == bookId.String()
	})

	if cartBookIndex >= 0 {
		user.Cart = append(user.Cart[:cartBookIndex], user.Cart[cartBookIndex+1:]...)
	}

	_, err := database.UsersCollection.InsertOne(context.Background(), user)
	return err
}

func (user *User) clearCart() error {
	user.Cart = []CartItem{}

	_, err := database.UsersCollection.UpdateOne(context.Background(), bson.M{"id": user.Id}, user)
	return err
}
