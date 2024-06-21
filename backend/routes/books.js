const booksController = require('../controllers/books');
const checkAuth = require('../middleware/check-auth');
const router = require('express').Router();

router.get('',booksController.getBooks);
router.get('/:id',booksController.getBook);
router.post('',checkAuth,booksController.createBook);
router.put('/:id',checkAuth,booksController.updateBook);
router.delete('/:id',checkAuth,booksController.deleteBook);

module.exports = router;