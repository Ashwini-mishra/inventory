const router = require("express").Router();
const purchaseItemHandlers = require('../controllers/purchaseItemController.js');
//const authUser = require('../Middleware/auth.js');

router.post("/purchase-item", purchaseItemHandlers.addPurchaseItem);
router.get("/purchase-item", purchaseItemHandlers.getPurchaseItem);
router.delete("/purchase-item/:id", purchaseItemHandlers.deletePurchaseItem);
router.patch("/purchase-item/:id", purchaseItemHandlers.updatePurchaseItem);



module.exports = router;