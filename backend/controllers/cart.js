const Cart = require('../models/cart');
const Book = require('../models/book');

exports.getCart = async (req, res) => {
  const userId = req.params.userId;

  try {
    const cart = await Cart.findOne({userId: userId});
    
    res.status(200).json({
      message: "cart fetched successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to fetch cart",
    });
  }
};

exports.addToCart = async (req,res) => {
  const bookId = req.params.id;
  const userId = req.body.userId;

  try {
    const book = await Book.findById(bookId);

    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      cart = new Cart({ userId: userId, items: [] });
    }

    const cartBookIndex = cart.items.findIndex(cp => cp.bookId.toString() === book._id.toString());
    let newQuantity = 1;

    if (cartBookIndex >= 0) {
      newQuantity = cart.items[cartBookIndex].quantity + 1;
      cart.items[cartBookIndex].quantity = newQuantity;
    } else {
      cart.items.push({
        bookId: book._id,
        quantity: newQuantity,
        price: book.price
      });
    }

    await cart.save();
    res.status(201).json({
      message: "Item added to cart",
      cart: cart
    });
  } catch (error) {
    res.status(500).json({
      message: "adding item to cart Failed",
    });
  }
}

exports.removeFromCart = async (req, res) => {
  const bookId = req.query.bookId;
  const userId = req.params.id;

  try {
    const cart = await Cart.findOne({ userId: userId });
    cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);

    await cart.save();
    res.status(201).json({
      message: "item removed successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "remove failed",
    });
  }
};

exports.clearCart = async (req, res) => {
  const userId = req.params.id;
  
  try {
    const cart = await Cart.findOne({ userId: userId });
    cart.items = [];
    await cart.save();

    res.status(200).json({
      message: "cart cleared successfully",
      cart: cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed clearing cart",
    });
  }
};