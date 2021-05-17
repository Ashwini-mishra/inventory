const router = require("express").Router();

const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const itemRoutes = require('./itemRoutes');
const vendorRoutes = require('./vendorRoutes');
const initialRateRoutes = require('./initialRateRoutes');
const purchaseItemRoutes = require('./purchaseItemRoutes');
const outletRoutes = require('./outletRoutes');
const roleRoutes = require('./roleRoutes');
const searchRoutes = require('./searchRoute.js');

router.use("/", userRoutes);
router.use("/", categoryRoutes);
router.use("/", itemRoutes);
router.use("/", vendorRoutes);
router.use("/", initialRateRoutes);
router.use("/", purchaseItemRoutes);
router.use("/", outletRoutes);
router.use("/", searchRoutes);
router.use("/", roleRoutes);


module.exports = router