const router = require("express").Router();
const userHandlers = require('../controllers/userController.js');
const authUser = require('../middleware/auth.js');
const authUser1 = require('../middleware/authWebPage.js');

router.post("/register", userHandlers.register);
router.post('/login', userHandlers.login);
router.get('/users',userHandlers.getUsers);
router.get('/users/:id',userHandlers.getSingleUser);
router.delete('/users/:id', userHandlers.deleteUser);
router.delete('/users', userHandlers.selectDelete);
router.patch('/users/:id', userHandlers.updateUser);

module.exports = router;