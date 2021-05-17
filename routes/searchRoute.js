const router = require("express").Router();

const roleController = require('../controllers/searchController.js');
router.get("/search",roleController.search);

module.exports = router;