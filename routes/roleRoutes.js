const router = require("express").Router();
const roleHandlers = require('../controllers/roleController.js');

router.post("/role", roleHandlers.addRole);
router.get("/role", roleHandlers.getRole);
router.delete('/role/:id', roleHandlers.deleteRole);
router.patch('/role/:id', roleHandlers.updateRole);

module.exports = router;