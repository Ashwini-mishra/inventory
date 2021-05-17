const router = require("express").Router();
const outletHandlers = require('../controllers/outletController.js');
//const authUser = require('../Middleware/auth.js');

router.post("/outlets", outletHandlers.addOutlet);
router.get('/outlets', outletHandlers.getOutlet);
router.get('/outlets/:id', outletHandlers.getSingleOutlet);
router.delete('/outlets/:id', outletHandlers.deleteOutlet);
router.patch('/outlets/:id', outletHandlers.updateOutlet);


module.exports = router;