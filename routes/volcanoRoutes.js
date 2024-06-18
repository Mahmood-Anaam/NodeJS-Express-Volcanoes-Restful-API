const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const volcanoController = require('../controllers/volcanoController');

const router = express.Router();

router.get('/:id', authMiddleware.optional, volcanoController.getVolcano);

module.exports = router;
