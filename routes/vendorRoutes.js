const router = require("express").Router();
const vendorHandlers = require('../controllers/vendorController.js');
//const authUser = require('../Middleware/auth.js');

router.post("/vendor", vendorHandlers.addVendor);
router.get('/vendor', vendorHandlers.getVendor);
router.delete('/vendor/:id', vendorHandlers.deleteVendor);
router.patch('/vendor/:id', vendorHandlers.updateVendor);
router.get("/vendor/:id",vendorHandlers.singleVendor);

module.exports = router;