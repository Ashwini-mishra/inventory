const errorHandler = require('./errorController.js');
const InitialRate = require('../models/InitialRateModel');

/******** Add rate list function ********** */

const addRate = async (req, res) => {
    try {
        const initialRateData = new InitialRate(req.body);
        initialRateData.save(function (err, data) {
            if (err) {
                try {
                    if (err.name === 'ValidationError') return err = errorHandler.handleValidationError(err, res);
                    if (err.code && err.code == 11000) return err = errorHandler.handleDuplicateKeyError(err, res);
                } catch (err) {
                    res.status(404).send({ status: 404, message: "Something went wrong" });
                }
            } else {
                data.status = undefined;
                return res.json(data);
            }
        });
    } catch (error) {
        res.status(500).send({ error });
    }
}


/****** GEt all rate list ************* */

const getRate = async (req, res) => {
    try {
        const allRates = await InitialRate.find({}).select({ status: 0, createdAt: 0, updatedAt: 0 })
            .populate("category", { status: 0, createdAt: 0, updatedAt: 0, __v: 0 })
            .populate("vendorId", { name: 1, phoneNumber: 1 })
            .populate("items.itemId", { itemName: 1 })
        res.send({ allRates });
    } catch (error) {
        res.status(500).send({ error });
    }
}


/******** Delete rate list function ********** */

const deleteRate = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await InitialRate.deleteOne({ _id: id }).select({ status: 0 });
        if (!data) { return res.status(404).send({ message: "data not found" }) };
        res.status(200).send({ status: 200, message: "Rate list Deleted", data });

    } catch (error) {
        res.status(500).send({ error });
    }

}


/******** Update vendor function ********** */

const updateRate = async (req, res) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const data = await InitialRate.findOneAndUpdate({ _id: id }, update, { new: true }).select({ status: 0});
        if (!data) { return res.status(404).send({ message: "data not found" }) };
        res.status(200).send({ status: 200, message: "Rate list Updated", data });

    } catch (error) {
        res.status(500).send({ error });
    }

}

/************** single rate Info *******************/
const singleRate = (async (req, res) => {
    try {
        const id = req.params.id;
        const data = await InitialRate.findOne({ _id: id }).select({ items: 1, vendorId: 1}).populate("vendorId", { name: 1 });
        if (!data) { return res.status(404).send({ message: "data not found" }) };
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

/****************** filter the vendor according to product *****************/
const filterAccordingToProduct = (async (req, res) => {
    try {
        const id = req.params.id;
        const data = await InitialRate.find({ "items.itemId": id }, { "vendorId": 1, "items.itemId": 1, "items.cost": 1 })
            .populate("vendorId", { name: 1, phoneNumber: 1 })
            .populate("items.itemId", { itemName: 1, unit: 1 });
        let arr = [];
        if (!data) { res.status(404).send({ message: "item not found" }) }
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].items.length; j++) {
                let detail = data[i].items[j].itemId._id;
                let cost = data[i].items[j].cost;
                // console.log("detail :", detail, "cost :", cost, "vendor :", data[i].vendorId)
                if (detail == id)
                    arr.push({ "vendorId": data[i].vendorId, "itemCost": cost, "item ": data[i].items[j].itemId })
            }
        }
        res.send(arr);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

/***************** filter according to category and status *********/
const filterStatusAndCategory = (async (req, res) => {
    try {
        const status = req.body.status;
        const category = req.body.category;
        const allRates = await InitialRate.find({ $and: [{ status: status }, { category: category }] }).select({ status: 0, createdAt: 0, updatedAt: 0 })
            .populate("category", { status: 0, createdAt: 0, updatedAt: 0, __v: 0 })
            .populate("vendorId", { name: 1, phoneNumber: 1 })
            .populate("items.itemId", { itemName: 1 })
        res.send({ allRates });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

/******************* status filter *********************/
const statusFilter = (async (req, res) => {
    try {
        const status = req.body.status;
        const allRates = await InitialRate.find({ status: status }).select({ status: 0, createdAt: 0, updatedAt: 0 })
            .populate("category", { status: 0, createdAt: 0, updatedAt: 0, __v: 0 })
            .populate("vendorId", { name: 1, phoneNumber: 1 })
            .populate("items.itemId", { itemName: 1 })
        res.send({ allRates });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

/****************** category filter **************/
const categoryFilter = (async (req, res) => {
    try {
        const category = req.body.category;
        const allRates = await InitialRate.find({ category: category }).select({ status: 0, createdAt: 0, updatedAt: 0 })
            .populate("category", { status: 0, createdAt: 0, updatedAt: 0, __v: 0 })
            .populate("vendorId", { name: 1, phoneNumber: 1 })
            .populate("items.itemId", { itemName: 1 })
        res.send({ allRates });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})


module.exports = {
    addRate,
    getRate,
    deleteRate,
    updateRate,
    singleRate,
    filterAccordingToProduct,
    filterStatusAndCategory,
    statusFilter,
    categoryFilter

}