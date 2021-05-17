const errorHandler = require('./errorController.js');
const Vendor = require('../models/VendorModel');
const bcrypt = require('bcrypt');
const auth = require("../middleware/auth.js");

/******** Add vendor function ********** */

const addVendor = async (req, res) => {
    try {
        const newVendor = new Vendor(req.body);
        newVendor.save(function(err){
            return(err=auth.validateData(err,data,res,"vendor is added successfully!") )  
        });
    } catch (error) {
        res.status(500).send({ error:error.message });
    }
}


/******** Get vendor function ********** */

const getVendor = async (req, res) => {
    try {
        const data = await Vendor.find({}).select({ createdAt: 0, updatedAt: 0, __v: 0 })
        if (!data) { return res.status(404).send({ message: "data not found" }) };
        res.send(data);
    } catch (error) {
        res.status(500).send({ message:error.message });
    }
}

/***************** delete vendor *****************/
const deleteVendor = (async (req, res) => {
    try {
        const id = req.params.id;
        await Vendor.deleteOne({ _id: id },function(err,data)
        {
            if(data.n == 0) {
                res.status(404).send({ status: 404, message: "Invalid Id" });
              } else {
                res.send({ status: 200, message:"vendor is deleted"});
        }
    });
 } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

/******** Update vendor function ********** */

const updateVendor = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await Vendor.updateOne({ _id: id }, data).exec(function(err,data){
            return(err=auth.validateData(err,data,res,"vendor is updated successfully") )  
        });
    }
       catch (error) {
        res.status(500).send({ error });
    }
}

/****************** get single vendor profile ****************/
const singleVendor = (async (req, res) => {
    try {
        const id = req.params.id;
        await Vendor.findOne({ _id: id })
            .then(data => { res.send(data) })
            .catch(error => { res.status(404).send({ error: error.message }) })
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

module.exports = {
    addVendor,
    getVendor,
    deleteVendor,
    updateVendor,
    singleVendor,
}