const Category = require('../models/CategoryModel');
const SubCategory = require('../models/SubCategoryModel');
const auth = require("../middleware/auth.js");


/******* Add main Category Function***** */
const addCategory = (req, res) => {
    try {
        const data = new Category(req.body);
        data.save(function(err){
            return(err=auth.validateData(err,data,res,"category is added successfully!") )  
        });
    } catch (error) {
        res.status(500).send({ message:error.message});
    }
}

/******* get main Category Function***** */

const getCategory = async (req, res) => {

    try {
        const categories = await Category.find({});
        res.status(200).send({ status: 200, message: "All categories", data: categories });
    } catch (error) {
        res.status(500).send({ error });
    }
}

/******* Delete main Category Function***** */

const deleteCategory = async (req, res) => {
    try {
        let id = req.params.id;
        await Category.deleteOne({ _id: id },function(err,data)
        {
            if(data.n == 0) {
                res.status(404).send({ status: 404, message: "Invalid Id" });
              } else {
                res.send({ status: 200, message:"category is deleted"});
        }
    });
    }
    catch (error) {
        res.status(500).send({ message:error.message});
    }
}

/******* update main Category Function***** */

const updateCategory = async (req, res) => {

    try {
        let id = req.params.id;
        let data = req.body;
        await Category.updateOne({ _id: id }, data).exec(function(err,data){
            return(err=auth.validateData(err,data,res,"category is updated successfully!") )  
        });

        
    } catch (error) {
        res.status(500).send({message:error.message} );
    }
}

/************* get single Sub Category **********/
const singleCategory = (async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Category.findOne({ _id: id });
        if (!data) {return res.status(404).send({ message: "data not found" }) };
        res.send(data);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

/******* Add Sub Category Function***** */
const addSubCategory = (req, res) => {

    try {
        const data = new SubCategory(req.body);
        data.save(function(err){
            return(err=auth.validateData(err,data,res,"sub-category is added successfully!") )  
        });

    } catch (error) {
        res.status(500).send({ message:error });
    }

}


/******* Get sub Category Function***** */

const getSubCategory = async (req, res) => {

    try {
        const Subcategories = await SubCategory.find({}).select({ createdAt: 0, updatedAt: 0, status: 0 }).populate("parentId", { catName: 1 });
        res.send({ message: "All Sub-categories", data: Subcategories });
    } catch (error) {
        res.status(500).send({ error });
    }
}

/******* Delete Sub Category Function***** */

const deleteSubCategory = async (req, res) => {
    try {
        let id = req.params.id;
        await SubCategory.deleteOne({ _id: id },function(err,data)
        {
            if(data.n == 0) {
                res.status(404).send({ status: 404, message: "Invalid Id" });
              } else {
                res.send({ status: 200, message:"sub-category is deleted"});
        }
    });
 } catch (error) {
        res.status(500).send({ error });
    }
}

/******* update Sub Category Function***** */

const updateSubCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await SubCategory.updateOne({ _id: id }, data).exec(function(err,data){
            return(err=auth.validateData(err,data,res,"sub-category is updated successfully!") )  
        });
    } catch (error) {
        res.status(500).send({ message:error.message});
    }
}

/************* get single Sub Category **********/
const singleSubCategory = (async (req, res) => {
    try {
        const id = req.params.id;
        const data = await SubCategory.findOne({ _id: id }).select({ status: 0 }).populate("parentId", { catName: 1 })
        if (!data) {return res.status(404).send({ message: "data not found" }) };
        res.send(data);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})


module.exports = {
    addCategory,
    getCategory,
    deleteCategory,
    updateCategory,
    addSubCategory,
    getSubCategory,
    deleteSubCategory,
    updateSubCategory,
    singleCategory,
    singleSubCategory
}