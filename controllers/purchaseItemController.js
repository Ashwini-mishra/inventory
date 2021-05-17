const errorHandler = require('./errorController.js');
const PurchaseItem = require('../models/PurchaseItemModel');
/******** Add rate list function ********** */

const addPurchaseItem = async (req, res) => {
    try {
        const purchaseItemData = new PurchaseItem(req.body);
        purchaseItemData.save(function (err, data) {
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


/****** GEt all rate list ************* */

const getPurchaseItem = async (req, res) => {
    try {
        let allPurchaseItem = await PurchaseItem.find({});
        res.send({ allPurchaseItem });
    } catch (error) {
        res.status(500).send({ error });
    }
}


/******** Delete rate list function ********** */

const deletePurchaseItem = async (req, res) => {
    try {
        let id = req.params.id;
        await PurchaseItem.deleteOne({ _id: id });
        res.status(200).send({ status: 200, message: "item Deleted" });

    } catch (error) {
        res.status(500).send({ error });
    }

}


/******** Update vendor function ********** */

const updatePurchaseItem = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        await PurchaseItem.updateOne({ _id: id }, data);
        res.status(200).send({ status: 200, message: "Item Updated" });

    } catch (error) {
        res.status(500).send({ error });
    }

}


module.exports = {
    addPurchaseItem,
    getPurchaseItem,
    deletePurchaseItem,
    updatePurchaseItem,

}