const router = require("express").Router();
const rateHandlers = require('../controllers/initialRateController.js');
//const authUser = require('../Middleware/auth.js');

router.post("/rate-list", rateHandlers.addRate);
router.get("/rate-list", rateHandlers.getRate);
router.delete("/rate-list/:id", rateHandlers.deleteRate);
router.patch("/rate-list/:id", rateHandlers.updateRate);
router.get("/rate-list/:id", rateHandlers.singleRate);
router.get("/filter/:id", rateHandlers.filterAccordingToProduct);
router.get("/bothFilter", rateHandlers.filterStatusAndCategory);
router.get("/statusFilter",rateHandlers.statusFilter);
router.get("/catFilter",rateHandlers.categoryFilter);

module.exports = router;
