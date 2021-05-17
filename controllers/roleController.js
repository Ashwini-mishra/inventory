const errorHandler = require('./errorController.js');
const Role = require('../models/RoleModel');
const auth = require("../middleware/auth.js");

/******* Add main Role Function***** */
const addRole = async(req, res) => {

    try {
        const data = new Role(req.body);
        await data.save(function(err){
            return(err=auth.validateData(err,data,res,"role is added successfully!") )  
        });
    } catch (error) {
        res.status(500).send({ message:error});
    }

}

/*******Get Role Function***** */

const getRole = async(req, res) => {
    try {
        const rolesData = await Role.find({});
        res.status(200).send({ status: 200, message: "All Roles", data: rolesData });
    } catch (error) {
        res.status(500).send({ message:error});
    }
}

/******* Delete main Role Function***** */

const deleteRole = async(req, res) => {
    try {
        let id = req.params.id;
        await Role.deleteOne({ _id: id },function(err,data)
        {
            if(data.n == 0) {
                res.status(404).send({ status: 404, message: "Invalid Id" });
              } else {
                res.send({ status: 200, message:"role is deleted"});
        }
    });
    } catch (error) {
        res.status(500).send({ error });
    }
}

/******* Update main Role Function***** */

const updateRole = async(req, res) => {

    try {
        let id = req.params.id;
        let data = req.body;
        await Role.updateOne({ _id: id }, data).exec(function(err,data){
            return(err=auth.validateData(err,data,res,"role is updated successfully") )  
        });
    } catch (error) {

        res.status(500).send({ error });
    }
}



module.exports = {
    addRole,
    getRole,
    deleteRole,
    updateRole
}