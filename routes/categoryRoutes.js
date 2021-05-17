const router = require("express").Router();
const categoryHandlers = require('../controllers/categoryController.js');
const authUser = require('../middleware/auth.js');

/********** Main category Routes ******** */
router.post("/category", categoryHandlers.addCategory);
router.get("/category", categoryHandlers.getCategory);
router.delete("/category/:id", categoryHandlers.deleteCategory);
router.patch("/category/:id", categoryHandlers.updateCategory);
router.get("/Category/:id",categoryHandlers.singleCategory);

/********** Sub category Routes ******** */
router.post("/sub-category", categoryHandlers.addSubCategory);
router.get("/sub-category", categoryHandlers.getSubCategory);
router.delete("/sub-category/:id", categoryHandlers.deleteSubCategory);
router.patch("/sub-category/:id", categoryHandlers.updateSubCategory);
router.get("/sub-category/:id",categoryHandlers.singleSubCategory);


module.exports = router;