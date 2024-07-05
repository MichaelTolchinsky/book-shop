
const cartController = require('../controllers/cart');
const checkAuth = require('../middleware/check-auth');
const router = require('express').Router();

router.get('/:userId',checkAuth,cartController.getCart);
router.post('/:id',checkAuth,cartController.addToCart);
router.put('/:id',checkAuth,cartController.clearCart);
router.delete('/:id',checkAuth,cartController.removeFromCart);

module.exports = router