const express = require('express');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/:id', authMiddleware.required, commentController.addComment);
router.get('/:id', commentController.getComments);

module.exports = router;
