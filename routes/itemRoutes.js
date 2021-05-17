const router = require("express").Router();
const itemHandlers = require('../controllers/itemController.js');
//const authUser = require('../Middleware/auth.js');

router.post("/item", itemHandlers.addItem);
router.get('/allItem', itemHandlers.getItem);
router.delete('/item/:id', itemHandlers.deleteItem);
router.patch('/item/:id', itemHandlers.updateItem);
router.get("/itemDetail/:id",itemHandlers.singleItem)

module.exports = router;