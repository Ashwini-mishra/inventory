const router = require("express").Router();
const storeHandlers = require('../controllers/storeController.js');
//const authUser = require('../Middleware/auth.js');

router.post("/store", storeHandlers.addStoreItem);
router.get('/store', storeHandlers.getStoreItem);
router.delete('/store/:id', storeHandlers.deleteStoreItem);
router.patch('/store/:id', storeHandlers.updateStoreItem);

module.exports = router;