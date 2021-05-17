require("dotenv").config();
var mongoose = require("mongoose");

var jwt = require("jsonwebtoken");
var userType = require("../models/RoleModel.js");
var User = mongoose.model('User');
//var userType=mongoose.model("role");

const verifyUser = async (req, res, next) => {

    try {
        const decode = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRETE_KEY

        );
        let user = await User.findOne({ _id: decode.id });
        let roleId = user.role;
        let roleData = await userType.findOne({ _id: roleId });
        if (roleData.role_name == "admin") {
            next()
        }
        else {
            res.status(401).send({ status: 401, message: "Un-authenticated User" });
        }
    }
    catch
    {
        res.status(401).send({ status: 401, message: "Un-authenticated User" });
    }
}
module.exports = { verifyUser }