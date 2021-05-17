const errorHandler = require("./errorController.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const auth = require("../middleware/auth.js");
require("dotenv").config();

/////////// Register Function /////////////////////////////

const register = function (req, res) {
  try {
    const data = new User(req.body);
    data.password = bcrypt.hashSync(req.body.password, 10);
    data.save(function (err) {
      data.password = undefined;
      data.lastSeen = undefined;
      return (err = auth.validateData(err, data, res, "user is added successfully! "));
    });
  } catch {
    res.status(500).send({ status: 500, message: "something went wrong" });
  }
};

/////////////////////Token Generate Function/////////////////

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRETE_KEY);
};

//////////////////// Login Function ///////////////////////////

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    time = Date.now();
    let now = new Date();
    const user = await User.findOneAndUpdate({ email }, { lastSeen: now, offset: now.getTimezoneOffset() }).populate("role", { roleName: 1 });
    if (!user) { return res.status(400).send({ status: 400, message: "User not found" }) };
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) { return res.status(400).send({ status: 400, message: "Invalid password." }); }
    user.password = undefined;
    const role = user.role;
    delete user._doc.role;
    res.send({ user, role, token: generateToken(user.id) });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

/////////////////// Get users Function ///////////////////////////

const getUsers = async (req, res) => {
  try {
    const user = await User.find({}, { password: 0 }).populate("role", ["_id", "roleName", "status"]);
    res.send({ user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

/////////////////// get single user Function ///////////////////////////
const getSingleUser = async (req, res) => {
  try {
    id=req.params.id;
    const user = await User.find({_id:id}, { password: 0 }).populate("role", ["_id", "roleName", "status"]);
    res.send({ user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

/////////////////// Delete users Function ///////////////////////////

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id }, function (err, data) {
      if (data.n == 0) {
        res.status(404).send({ status: 404, message: "Invalid Id" });
      } else {
        res.send({ status: 200, message: "user is deleted" });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

/////////////////// Update users Function ///////////////////////////

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await User.updateOne({ _id: id }, data).exec(function (err, data) {
      return (err = auth.validateData(err, data, res, "user is updated successfully"));
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


///to delete the selected user///
const selectDelete = async (req, res) => {
  try {
    const data = req.body.users;
    let detail = "";
    for (let i = 0; i < data.length; i++) {
      let id = data[i]
      detail = await User.deleteOne({ _id: id });
    }
    if (!(detail.n)) { return res.status(400).send({ message: "Bad request" }) }
    res.send({ message: "deleted successfully", detail })
  }
  catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  selectDelete,
};
