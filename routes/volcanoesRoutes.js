const express = require("express");
const router = express.Router();
const volcanoesController = require("../controllers/volcanoesController");

router.get("/", volcanoesController.getVolcanoes);

module.exports = router;
