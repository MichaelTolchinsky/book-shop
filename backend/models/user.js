const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: {
    items: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ]
  }
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
