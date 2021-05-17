const errorHandler = require('./errorController.js');
const Item = require('../models/ItemModel');

/******* Add items Function***** */
const addItem = async (req, res) => {
    try {
        const newItem = await new Item(req.body);
        newItem.save((err, data) => {
            if (err) {
                try {
                    if (err.name === 'ValidationError') return err = errorHandler.handleValidationError(err, res);
                    if (err.code && err.code == 11000) return err = errorHandler.handleDuplicateKeyError(err, res);
                } catch (err) {
                    res.status(400).send({ status: 400, message: "Something went wrong" });
                }
            } else {
                delete data._doc.status;
                res.json(data);
            }
        });
    } catch (error) {
        res.status(500).send({ error });
    }
}


/////////////////// Get items Function ///////////////////////////

const getItem = async (req, res) => {
    try {
        const items = await Item.find({ }).select({ status: 0, createdAt: 0, updatedAt: 0 }).populate("category", { catName: 1 }).populate("subCategory", { subCatName: 1 });
        res.send({ items });
    } catch (error) {
        res.status(500).send({ error });
    }
}

/////////////////// Delete items Function ///////////////////////////

const deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Item.deleteOne({ _id: id });
        res.send({ message: "item Deleted", data });
    } catch (error) {
        res.status(500).send({ error });
    }
}

/////////////////// UPDATE items Function ///////////////////////////

const updateItem = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        await Item.findOneAndUpdate({ _id: id }, updateData, { new: true }).select({ status: 0 })
            .then(data => { res.send({ message: "Item Updated", data }) })
            .catch(error => { res.status(400).send({ error: error.message }) })
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

/****************** single item *****************/
const singleItem = (async (req, res) => {
    try {
        const id = req.params.id;
        await Item.findOne({ _id: id }).select({ status: 0 }).populate("subCategory", { subCatName: 1 }).populate("category", { catName: 1 })
            .then( data => { if(!data){ return res.status(404).send({message:"not found"})}res.send(data) })
            .catch(error => { res.status(404).send({ error: error.message }) })
    } catch (error) {
        res.status(500).send({ error: error.message });

    }
})



module.exports = {
    addItem,
    getItem,
    deleteItem,
    updateItem,
    singleItem,
}