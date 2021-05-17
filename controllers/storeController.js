//const mongoose = require('mongoose');
const errorHandler = require('./errorController.js');
const Store = require('../models/StoreModel');

/******** Add vendor function ********** */

const addStoreItem = async(req, res) => {
    try {
        const newStore = new Store(req.body);
        newStore.save(function(err, data) {
            if (err) {
                try {
                    if (err.name === 'ValidationError') return err = errorHandler.handleValidationError(err, res);
                    if (err.code && err.code == 11000) return err = errorHandler.handleDuplicateKeyError(err, res);
                } catch (err) {
                    res.status(404).send({ status: 404, message: "Something went wrong" });
                }

            } else {
                return res.json(data);
            }

        });

    } catch (error) {
        res.status(500).send({ error });
    }
}


/******** Get vendor function ********** */

const getStoreItem = async(req, res) => {
    try {
        await Store.find(function(err, data) {
            res.send({ message: "All store Items", data: data });
        });

    } catch (error) {
        res.status(500).send({ error });
    }
}

/******** Delete vendor function ********** */

const deleteStoreItem = async(req, res) => {
    try {
        let id = req.params.id;
        await Store.deleteOne({ _id: id });
        res.status(200).send({ status: 200, message: "Store item Deleted" });

    } catch (error) {
        res.status(500).send({ error });
    }

}


/******** Update vendor function ********** */

const updateStoreItem = async(req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        await Store.updateOne({ _id: id }, data);
        res.status(200).send({ status: 200, message: "Store item Updated" });

    } catch (error) {
        res.status(500).send({ error });
    }

}


module.exports = {
    addStoreItem,
    getStoreItem,
    deleteStoreItem,
    updateStoreItem

}