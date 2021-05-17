const errorHandler = require('./errorController.js');
const Outlet = require('../models/outletModel');
const bcrypt = require('bcrypt');

/******** Add outlet function ********** */

const addOutlet = async(req, res) => {
    try {
        const newoutlet = new Outlet(req.body);
        newoutlet.password = bcrypt.hashSync(req.body.password, 10);
        newoutlet.save(function(err, data) {
            if (err) {
                try {
                    if (err.name === 'ValidationError') return err = errorHandler.handleValidationError(err, res);
                    if (err.code && err.code == 11000) return err = errorHandler.handleDuplicateKeyError(err, res);
                } catch (err) {
                    res.status(404).send({ status: 404, message: "Something went wrong" });
                }

            } else {
                data.password = undefined;
                return res.json(data);
            }

        });

    } catch (error) {
        res.status(500).send({ error });
    }
}

/////////////////// Get Outlet Function ///////////////////////////

const getOutlet = async(req, res) => {

    try {

        let outletData = await Outlet.find().select(["-password"]);
        res.send({ outletData });

    } catch (error) {
        res.status(500).send({ error });
    }


}

/////////////////// Delete Outlet Function ///////////////////////////

const deleteOutlet = async(req, res) => {

    try {
        let id = req.params.id;
        // console.log(id);
        await Outlet.deleteOne({ _id: id });
        res.send({ status: 200, message: "Outlet Deleted!" });

    } catch (error) {
        res.status(500).send({ error });
    }

}

/////////////////// Update users Function ///////////////////////////

const updateOutlet = async(req, res) => {

    try {
        let id = req.params.id;
        let updateData = req.body;
        await Outlet.findOneAndUpdate({ _id: id }, updateData, function(err, data) {

            if (err) {
                res.status(404).send({ status: 404, message: "Something went wrong", error: err })

            } else {
                data.password = undefined;
                res.send({ status: 200, message: "Outlet Updated", outletData: data });
            }
        });


    } catch (error) {
        res.status(500).send({ error });
    }


}

/**********************Get single outlet details ********************/

const getSingleOutlet = async(req, res) => {

    try {
        let id = req.params.id;
        let Data = await Outlet.find({ _id: id }).select(["-password"]);
        res.send({ Data });

    } catch (error) {
        res.status(500).send({ error });
    }
}

module.exports = {
    addOutlet,
    getOutlet,
    deleteOutlet,
    updateOutlet,
    getSingleOutlet
}